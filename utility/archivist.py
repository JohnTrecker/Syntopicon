#!/usr/bin/env python

from bs4 import BeautifulSoup
from urllib.request import urlopen

import time
import os
import re
import json
import csv
import shutil
import dataset

from summary_intern import Summarizer
from librarian import get_ref_meta, parse_scripture, retrieve_many
from editor import parse_ref_note

data = '../data/output'
cumm = 0


def extract_passage(old_path: str, new_path: str) -> None:
  """creates new json file for each book containing lists of verses"""
  current_book = []
  current_chapter = {
    'chapter': 0,
    'verses': []
  }

  with open(old_path, 'r') as readFile:
    reader = readFile.readlines()

    for line in reader:
      # new chapter
      if line.startswith('['):
        chapter = line.split(' ')[-1].split(']')[0]
        chapter = int(chapter) if chapter.isdigit() else chapter
        if current_chapter.get('chapter', None):
          current_book.append(current_chapter)
        current_chapter = {
          'chapter': chapter,
          'verses': []
        }

      # new verse
      if line.startswith('{'):
        verse = line.replace('{', '[', 1).replace('}', ']', 1)
        current_chapter.get('verses', []).append(verse)

    # last verse
    if current_chapter.get('chapter', None):
      current_book.append(current_chapter)

    with open(new_path, 'w') as writeFile:
      json.dump(current_book, writeFile)

      return

def subdivide_scripture_texts() -> None:
  """creates new dir for each book of bible and executes callback"""
  for i in range(1, 3):
    text_path = os.path.join('..', 'data', 'output', str(i))
    dirs = os.listdir(text_path)

    for file in dirs:
      book, extension = file.split('.')
      if extension != 'txt':
        continue
      old_book_path = os.path.join(text_path, f'{book}.txt')
      new_book_path = os.path.join(text_path, f'{book}.json')

      extract_passage(old_book_path, new_book_path)

  return

def insert_full_texts(user, password, host, database):
  db = dataset.connect(f'postgresql://{user}:{password}@{host}/{database}')
  text_table = db['text']

  log_path = os.path.join('..', 'data', 'logs', 'errors_2019_10_24.csv')
  log_file = open(log_path, 'w')
  logwriter = csv.writer(log_file, delimiter=',')
  logwriter.writerow(['ref_id', 'text_id', 'error'])
  start = time.time()

  with open('../data/csv/reference.csv') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader)

    cache = set()
    text_list = []
    count = 0

    for row in reader:
      try:
        vol, start, end = row[6:9]
        end = end if end else 'nan'
        alt_id = f'{vol}-{start}-{end}'
        if alt_id in cache:
          pass
        else:
          count += 1
          cache.add(alt_id)
          text_list.append(dict(id=count,
                                text=retrieve_many(row[6], row[7], row[8])))
      except Exception as exc:
        error = f'Error retrieving / appending ref {row[0]}: {exc}'
        logwriter.writerow([row[0], count, error])

      if len(text_list) >= 500:
        try:
          text_table.insert_many(text_list)
          text_list.clear()
        except Exception as exc:
          error = f'Error inserting ref {row[0]} to text table: {exc}'
          logwriter.writerow([row[0], count, error])

    if len(text_list):
      try: # for the remaining values
        text_table.insert_many(text_list)
      except Exception as exc:
        error = f'Error inserting final refs/texts to tables: {exc}'
        logwriter.writerow([None, f'last {len(text_list)} unique texts', error])

  end = time.time()
  try:
    print(f'insert_full_texts() took {(end - start)} seconds to run')
    logwriter.writerow(
        [f'insert_full_texts() took {(end - start)} seconds to run', None, None])
  except Exception:
    pass

  return

def add_subs_to_tops(json_input='subtopics_nested.json', csv_input='topic.csv', csv_output='topic2.csv'):
  inputJSONPath = os.path.join('..', 'data', 'json', json_input)
  inputCSVPath = os.path.join('..', 'data', 'csv', csv_input)
  outputPath = os.path.join('..', 'data', 'csv', csv_output)
  outputFile = open(outputPath, 'w')
  topicwriter = csv.writer(outputFile, delimiter=',')


  with open(inputJSONPath, 'r') as jsonFile:
    reader = json.load(jsonFile)

  with open(inputCSVPath, 'r') as inputFile:
    for line in csv.reader(inputFile):
      topic_id = line[0]
      if topic_id == 'id':
        topicwriter.writerow(line + ['subtopics'])
        continue
      topic = reader[str(topic_id)]
      all_subs_under_topic = json.dumps(topic['subtopics'])
      topicwriter.writerow(line + [all_subs_under_topic])

  outputFile.close()

def focus_refs_csv(csv_input='refs.csv', csv_output='refs2.csv'):
	"""swaps long page range references for narrower ranges in notes where applicable"""
	inputPath = os.path.join('..', 'data', 'csv', csv_input)
	outputPath = os.path.join('..', 'data', 'csv', csv_output)
	output_file = open(outputPath, 'w')

	with open(inputPath, 'r') as input_file:
		refwriter = csv.writer(output_file, delimiter=',')

		for i, row in enumerate(csv.reader(input_file)):
			ref_id = i
			notes = row[9]

			if notes and notes.find('esp') != -1:
				v = row[6]
				book = None
				new_notes = 'passim {}-{}'.format(row[7], row[8])  # page_start, page_end
				if int(v) < 3:
					parsed = parse_scripture(row[7])
					if len(parsed):
						book = parsed[0]
						new_notes = 'passim {}'.format(row[7])  # <book> <chapter(s)>

				for new_ref in parse_ref_note(notes, book):
					s = new_ref.get('start', '')
					e = new_ref.get('end', '')
					new_row = [ref_id, *row[1:7], s, e, new_notes]
					print(new_row)
					refwriter.writerow(new_row)
			else:
				refwriter.writerow([ref_id, *row[1:]])

	output_file.close()
	return

def import_cath_bible_summaries(input_txt="apocrypha.txt", log_csv='errors.csv'):
  input_dir = os.path.join('..', 'data', 'summary')
  input_path = os.path.join(input_dir, input_txt)
  log_path = os.path.join(input_dir, log_csv)
  log_file = open(log_path, 'w')
  logwriter = csv.writer(log_file, delimiter=',')
  logwriter.writerow(['book', 'error'])

  with open(input_path, 'r') as input_file:
    book = ''
    for line in input_file:
      try:
        if line.strip():
          if line[0] == '*':
            book = line.split('*')[1]
            dir_path = os.path.join(input_dir, book)
            os.mkdir(dir_path)
          else:
            chapter, summary = line.split(' ', maxsplit=1)
            output_path = os.path.join(input_dir, book, chapter)
            with open(output_path, 'w') as output_file:
              output_file.write(summary)
      except Exception as e:
        print('Error writing {}: {}'.format(book, e))
        logwriter.writerow([book, e])

  log_file.close()
  return

def import_prot_bible_summaries(log_csv='error_log.csv'):
  log_path = os.path.join('..', 'data', 'summary', log_csv)
  with open(log_path, 'w') as log_file:
    for book_of_bible in format_summary_urls():
      book, url = book_of_bible.values()
      dir_path = os.path.join('..', 'data', 'summary', book)
      os.mkdir(dir_path)
      try:
        html = urlopen(url.lower())
        soup = BeautifulSoup(html, 'html.parser')
        elements = soup.findAll('p', {'class': 'tweet_content'})

        for i, el in enumerate(elements):
          chapter = i + 1
          summary = el.text.split(':')[1]
          output_path = os.path.join(
            '..', 'data', 'summary', book, '{}'.format(chapter))
          with open(output_path, 'w') as output_file:
            output_file.write(summary)

        time.sleep(1)
      except Exception as e:
        print(e)
        log_file.write('Error creating directory for {}: {}\n'.format(book, e))

def format_summary_urls() -> list:
  domain = 'https://biblesummary.info/'
  urls = []
  bible = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
  prot_apocrypha = ['Tobit', 'Judith', 'Wisdom', 'Sirach', 'Baruch', '1 Maccabees', '2 Maccabees']

  for book in bible:
    uri = book.replace(' ', '-')
    urls.append({'book': book, 'url': domain + uri})
  return urls

def format_urls() -> dict:
  domain = 'http://www.sacredbible.org/catholic/'
  urls = {}
  bible = {
      'OT': ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Tobit', 'Judith', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song', 'Wisdom', 'Sirach', 'Isaiah', 'Jeremiah', 'Lamentations', 'Baruch', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', '1 Maccabees', '2 Maccabees'],
      'NT': ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
  }
  for i, corpus in enumerate(bible.items()):
    volume = i + 1
    part, books = corpus
    for j, book in enumerate(books):
      uri_number = j + 1
      uri_number = uri_number if uri_number > 9 else '0{}'.format(uri_number)
      uri_book = book.replace(' ', '-')
      uri = '{}-{}_{}.htm'.format(part, uri_number, uri_book)
      if book == 'Song2':
        book = 'Song of Songs'
      urls[book] = {'volume': volume, 'url': domain + uri}
  return urls

def import_bible():
  urls = format_urls()
  log_path = os.path.join('..', 'data', 'output', 'error_log.txt')
  with open(log_path, 'w+') as log_file:
    for book, meta in urls.items():
      output_path = os.path.join(
          '..', 'data', 'output', str(meta['volume']), '{}.txt'.format(book))
      try:
        with open(output_path, 'w+') as output_file:
          html = urlopen(meta['url'])
          soup = BeautifulSoup(html, 'html.parser')
          text = soup.find('font', size='4').text
          output_file.write(text.strip())
          time.sleep(1)
      except Exception as e:
        print(e)
        log_file.write('Error creating file {}.html: {}\n'.format(book, e))

def complete_summary_csv(csv_input='summary.csv',  csv_output='texts2.csv', log_output='error_log_2019_10_06.txt'):
  input_file = os.path.join('..', 'data', 'csv', csv_input)
  output_file = os.path.join('..', 'data', 'csv', csv_output)
  log_path = os.path.join('..', 'data', 'csv', 'logs', log_output)
  log_file = open(log_path, 'w')

  corpus = Summarizer()
  reader = ''

  with open(input_file, 'r') as file:
    reader = csv.reader(file.readlines())


  with open(output_file, 'w') as file:
    textwriter = csv.writer(file, delimiter=',')
    logwriter = csv.writer(log_file, delimiter=',')
    logwriter.writerow(['ref_id', 'error'])

    for line in reader:
      if not line[1]:
        try:
          ref_id = line[0]
          summary = corpus.summarize_text(ref_id)
          textwriter.writerow([ref_id, summary])
        except Exception as e:
          print('error on ref id {}: {}'.format(ref_id, e))
          logwriter.writerow([ref_id, e])
      else:
          textwriter.writerow(line)


  log_file.close()
  print("texts table %s updated." % (output_file))

def make_summary_csv(csv_input='missing_refs.csv', csv_output='missing_refs_texts.csv'):
  inputPath = os.path.join('..','data', 'csv', 'test', csv_input)
  outputPath = os.path.join('..','data', 'csv', 'test', csv_output)
  log_path = os.path.join('..', 'data', 'csv', 'test', 'error_log_2019_10_04.txt')
  output_file = open(outputPath, 'w')
  log_file = open(log_path, 'w')
  corpus = Summarizer()

  with open(inputPath, 'r') as input_file:
    textwriter = csv.writer(output_file, delimiter=',')
    textwriter.writerow(['id', 'summary'])
    logwriter = csv.writer(log_file, delimiter=',')
    logwriter.writerow(['ref_id', 'error'])

    for row in csv.reader(input_file):
      if row[0] == 'id':
        continue
      ref_id = row[0]
      volume = row[6]
      start = row[7]
      end = row[8]

      not_yet_written = True
      try:
        summary = corpus.summarize_text(ref_id, volume=volume, page_start=start, page_end=end)
        textwriter.writerow([ref_id, summary])
        not_yet_written = False
      except Exception as e:
        print('Error summarizing ref {}: {}'.format(ref_id, e))
        if not_yet_written:
          textwriter.writerow([ref_id, ''])
        logwriter.writerow([ref_id, e])

  output_file.close()
  log_file.close()
  print(".csv written to %s" % (outputPath))

def make_trans_csv(csv_input='works.csv', csv_output='trans.csv'):
  inputPath = os.path.join('..','data', 'csv', csv_input)
  outputPath = os.path.join('..','data', 'csv', csv_output)
  output_file = open(outputPath, 'w')
  translators = {}
  with open(inputPath, 'r') as input_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['primary', 'secondary'])

    for row in csv.reader(input_file):
      trans = row[3]
      if not trans in translators:
        translators[trans] = 1

    translators_list = list(translators.keys())

    for trans in translators_list:
      all_translators = trans.split(' and ')
      primary = all_translators[0]
      secondary = ''
      if len(all_translators) > 1:
        secondary = all_translators[1]
      row = [primary, secondary]
      topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (outputPath))

def make_auths_csv(csv_input='works.csv', csv_output='auths.csv'):
  inputPath = os.path.join('..','data', 'csv', csv_input)
  outputPath = os.path.join('..','data', 'csv', csv_output)
  output_file = open(outputPath, 'w')
  authors = {}
  with open(inputPath, 'r') as input_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['last_name', 'first_name'])

    for row in csv.reader(input_file):
      author = row[1]
      if not author in authors:
        authors[author] = 1

    auths = list(authors.keys())

    for author in auths:
      name = author.split(' ')
      first_name = ' '.join(name[0:-1])
      last_name = name[-1]
      row = [last_name, first_name]
      topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (outputPath))

def make_vols_csv(csv_output='vols.csv'):
  csvPath = os.path.join('..','data', 'csv', csv_output)
  with open(csvPath, 'w') as output_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['number','path'])
    for i in range(3,61):
      row = [i, 'data/output/{}'.format(i)]
      topicwriter.writerow(row)

  print(".csv written to %s" % (csvPath))

def make_refs_csv(json_input='refs.json', csv_output='refs.csv'):
  jsonPath = os.path.join('..','data', 'json', json_input)
  csvPath = os.path.join('..','data', 'csv', csv_output)
  output_file = open(csvPath, 'w')

  with open(jsonPath, 'r') as input_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['topic_id','subtopic_id','author','volume','alpha','omega','passage','notes'])

    for topic_id, subtopics in json.load(input_file).items():
      for subtopic_id, refs in subtopics.items():
        for ref in refs:
          row = [topic_id, subtopic_id, *ref]
          topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (csvPath))

def make_subs_csv(json_input='subtopics.json', csv_output='subs.csv'):
  jsonPath = os.path.join('..','data', 'json', json_input)
  csvPath = os.path.join('..','data', 'csv', csv_output)
  output_file = open(csvPath, 'w')

  with open(jsonPath, 'r') as input_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['topic_id', 'subtopic_id', 'description'])

    subs_json = input_file.read()
    subs_dict = json.loads(subs_json)
    for topic in subs_dict['subtopics']:
      for subtopic in topic['subtopics']:
        row = [topic['number'], subtopic['number'], subtopic['subtopic']]
        topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (csvPath))

def make_tops_csv(json_input='subtopics.json', csv_output='tops.csv'):
  jsonPath = os.path.join('..','data', 'json', json_input)
  csvPath = os.path.join('..','data', 'csv', csv_output)
  output_file = open(csvPath, 'w')

  with open(jsonPath, 'r') as input_file:
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['topic_id', 'description', 'subtopics_num'])

    subs_json = input_file.read()
    subs_dict = json.loads(subs_json)
    for topic in subs_dict['subtopics']:
      row = [topic['number'], topic['topic'], len(topic['subtopics'])]
      topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (csvPath))

def iterate_csv(csv_path, cb):
  csvpath = os.path.join(csv_path)

  with open(csvpath, 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    for row in csvreader:
      cb(row)

def write_refs_file(filename1, filename2, filename3):

  output_file = open(filename3, "wb")
  writer = csv.writer(output_file, delimiter=',')


  topics = []
  rid = 0
  topic = ''
  subtopic = ''
  notes = ''

  writer.writerow(['id','topic','subtopic','author','vol','alpha','omega','passage','notes'])

  def writeline():
    writer.writerow([rid, topic, subtopic, author, vol, alpha, omega, passage, notes])

  with open(filename1, 'r') as text:
    topics.append(text.strip())

  with open(filename2, 'r') as text:
    lines = text.split('\r')
    for line in lines:
      if line:
        if line[0]:
          if line[0].isdigit():
            num, description = line.split('\t')
            subtopic = num.rstrip('.')

            if subtopic == '1':
              topic = topics.pop(0)

          elif line[0] == '\t':
            vol, refs = line.split('\t')[1:3]

            if vol == '0' or vol == '1' or vol == '2':
              vol = vol.rstrip(':')
              refs = refs.split('/')
              author = 'Bible'

              for ref in refs:
                alpha = ''
                omega = ''
                notes = ''

                ref = ref.strip()
                if ';' in ref:
                  passages = ref.split(';')
                  book = passages[0].split(',', 1)[0]
                  for passage in passages:

                    if passage[0].isalpha() or passage[1] == " ":
                      passage = passage.split(',', 1)[1]
                    rid += 1

                    if 'passim' in passage or 'esp' in passage:
                      e = passage.find('esp')
                      e = e if e > -1 else 50

                      p = passage.find('passim')
                      p = p if p > -1 else 50

                      index = p if p < e else e

                      verses = passage[0:index]
                      notes = passage[index:]
                      passage = verses.strip()
                    passage = book + passage

                    writeline()

                else:
                  passage = ref.replace(',', '', 1)
                  rid += 1

                  writeline()

            else:
              passage = ''
              refs = refs.split(',')
              author = refs.pop(0).strip()
              if author == 'James' or author == 'Eliot':
                surname = refs.pop(0)
                author = author + surname.replace(' ', ', ')
              for ref in refs:
                rid += 1
                ref = ref.lstrip()
                alpha = ref
                omega = ''
                notes = ''
                if '-' in ref:
                  alpha, omega = ref.split("-", 1)
                  if "passim" in omega or "esp" in omega:
                    omega, notes = omega.split(" ", 1)
                else:
                  alpha = ref
                  if " " in ref:
                    alpha, notes = ref.split(" ", 1)

                writeline()

  output_file.close()

def topics_dict(filename, filename2):
  topics = []
  syntopicon = {}

  input_file = open(filename, 'r')
  for string in input_file:
    topics.append(string.strip())

  input_file2 = open(filename2, 'r')
  for string in input_file2:

    topic = ''
    subtopic = ''
    refs = ''
    author = ''

    count = 0

    lines = string.split('\r')
    for line in lines:

      if line == '':

        topic = topics.pop(0)
        count = 0

      else:

        if line[0] == '\t':

          contents = line.split('\t')

          if len(contents) < 3:
            vol, refs = contents[1].split(': ')
            refs = refs.split('/')

          else:
            vol, refs = contents[1:3]
            refs = refs.split(',')
            author = refs.pop(0)

          syntopicon[topic][subtopic]['refs'] = {vol: refs}

        elif line[0].isdigit():

          subtopic = line

          syntopicon[topic][subtopic] = line

  input_file.close()
  input_file2.close()
  return syntopicon

def print_topics(filename, filename2):
  topic_list = topics_dict(filename, filename2)
  topics = topic_list.keys()
  for topic in topics:
    print(topic)
    # subtopics = topic_list[topic].keys()
    # for subtopic in subtopics:
      # print '\t'
      # print topic_list[topic][subtopic].description

def make_json():
  file = open('../data/subtopics.txt', 'r')
  output = open('../data/subtopics.json', 'w')

  alltopics = {}
  alltopics['topics'] = []
  count = 1
  currTopic = ''
  currSubtopic = '0'

  for string in file:
    lines = string.split('\r')
    for line in lines:
      line = line.rstrip()
      if line[0].isalpha():
        topic = line
        currTopic = topic
        objj = {'topic': topic, 'subtopics': [], 'number': count}
        alltopics['topics'].append(objj)
        count += 1
      elif line[0] == '\t':
        num, desc = line.split('\t')[1:3]
        desc = desc.rstrip()
        subObj = {'number': num, 'subtopic': desc}

        if num[-1] == '.':
          num = num[:-1]
          currSubtopic = num
          subObj['number'] = num
        elif num[0] == '(':
          num = currSubtopic + num
          subObj['number'] = num

        alltopics['topics'][-1]['subtopics'].append(subObj)


  json.dump(alltopics, output)
  output.close()
  file.close()

def make_topics_csv(json_file, csv_file):
  jsonPath = os.path.join('..','data', json_file)
  csvPath = os.path.join('..','data',csv_file)
  output_file = open(csvPath, 'w')

  with open(jsonPath, 'r') as input_file:
    topics = json.load(input_file)['topics']
    topicwriter = csv.writer(output_file, delimiter=',')
    topicwriter.writerow(['topic','subtopic','topnum','subtopnum'])

    for topic in topics:
      for sub in topic["subtopics"]:
        row = [topic["topic"], sub["subtopic"], topic["number"], sub["number"]]
        topicwriter.writerow(row)
  output_file.close()
  print(".csv written to %s" % (csvPath))

def convert_bytes(num):
  for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
    if num < 1024.0:
      return "%3.1f %s" % (num, x)
    num /= 1024.0

def file_size(file_path):
  if os.path.isfile(file_path):
    file_info = os.stat(file_path)
    return file_info.st_size

def listFileSize(directory=data):
  o = path.Path(directory)
  for d in o.dirs():
    for f in d.files():
      with open(f, 'r') as z:
        length = str(z)
        print (length)
      s = file_size(f)
      if (s > 7000):
        cumm += s
  print(convert_bytes(cumm))

def main():
  return

if __name__ == '__main__':
  main()

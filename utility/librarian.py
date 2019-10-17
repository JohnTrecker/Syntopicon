import os
from os import listdir, path
from os.path import isfile, join
import pandas as pd
import json

import scriptures
from scriptures.texts.deuterocanon import Deuterocanon
d = Deuterocanon()

refs = pd.read_csv('../data/csv/reference.csv', encoding='utf8', index_col=False)
subs = pd.read_csv('../data/csv/subtopic.csv', encoding='utf8', index_col=False)
# works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)
# vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
# auths = pd.read_csv('../data/csv/auths.csv', encoding='utf8', index_col=False)

def roman_to_int(roman):
	"""Convert from Roman numerals to an integer."""
	if not roman:
		return 0
	if roman.isdigit():
		return 0
	values = {'x': 10, 'v': 5, 'i': 1, 'l': 50, 'c': 100, 'd': 500, 'm': 1000}
	n = len(roman)
	total = values[roman[n-1]]
	for i in range(n-1,0,-1):
		current = values[roman[i]]
		prev = values[roman[i-1]]
		total += prev if prev >= current else -prev
	return total

def int_to_roman(num):
	"""Convert from an integer to Roman numerals."""
	val = [
		1000, 900, 500, 400,
		100, 90, 50, 40,
		10, 9, 5, 4,
		1
	]
	syb = [
		'm', 'cm', 'd', 'cd',
		'c', 'xc', 'l', 'xl',
		'x', 'ix', 'v', 'iv',
		'i'
	]
	roman_num = ''
	i = 0
	while num > 0:
		for _ in range(num // val[i]):
			roman_num += syb[i]
			num -= val[i]
		i += 1
	return roman_num

def isNaN(num):
	return num != num

def get_ref_meta(ref_id):
	a = refs.loc[refs.id == int(ref_id), [
		'volume', 'page_start', 'page_end', 'subtopic_id']]
	b = a.values.T.tolist()
	# volume, page_start, page_end = [item for sublist in b for item in sublist]
	# return (volume, page_start, page_end)
	volume, page_start, page_end, subtopic_id = [item for sublist in b for item in sublist]
	description = subs.loc[subs.id == subtopic_id, 'description'].values[0]
	return (volume, page_start, page_end, description)

def get_page_range(start, end, vol=3):
	"""Return list of all pages (roman num and/or int) from start to end"""
	if start.isdigit():
		start = int(start)
		if type(end) is float:
			end = start
		if type(end) is str:
			end = int(end)
		return list(range(start, end + 1))
	else:
		if end and end.isdigit():
			return get_page_range_with_front_matter(start, end, vol)
		start = roman_to_int(start)
		end = roman_to_int(end) if end else start
		return [int_to_roman(i) for i in range(start, end + 1)]

def get_page_range_with_front_matter(start, end, vol):
	path_name = join('..', 'data', 'output', str(vol))
	only_front_matter = [f for f in listdir(path_name) if isfile(
		join(path_name, f)) and not f.isdigit()]
	all_front_matter = [roman_to_int(p) for p in only_front_matter]
	all_front_matter.sort()
	pages = []
	if len(all_front_matter):
		sorted_front_matter = [int_to_roman(p) for p in all_front_matter]
		try:
			start_index = sorted_front_matter.index(start)
			pages = sorted_front_matter[start_index:]
		except Exception as e:
			print('Error arranging front matter pages: {}'.format(e))
	pages.extend(get_page_range('1', end))
	return pages

def parse_scripture(passage: str) -> {str, int, int, int, int}:
	"""returns dict of book name, chapter start, verse start, chapter end, and verse end"""
	a = scriptures.extract(passage)
	if len(a) == 0:
		a = d.extract(passage)

	if len(a):
		(book, ch_st, vs_st, ch_end, vs_end) = a[0]
		return dict(book=book, ch_st=ch_st, vs_st=vs_st, ch_end=ch_end, vs_end=vs_end)
	else:
		return dict({})

def retrieve_passage(volume: int, passage: str) -> str:
	p = parse_scripture(passage)
	book = p.get('book', None)
	ch_st = p.get('ch_st', None)
	vs_st = p.get('vs_st', None)
	ch_end = p.get('ch_end', None)
	vs_end = p.get('vs_end', None)

	ch_st_index = ch_st - 1
	vs_st_index = vs_st - 1
	ch_end_index = ch_end
	vs_end_index = vs_end

	print(p)
	print(ch_st_index, vs_st_index, ch_end_index, vs_end_index)
	jsonFile = f'{book}.json'
	readpath = os.path.join('..', 'data', 'output', str(volume), jsonFile)

	with open(readpath, 'r') as readFile:
		chapters = json.load(readFile)
		relevant_chapters = chapters[ch_st_index: ch_end_index]
		result = ''

		for chapter in relevant_chapters:
			ch = chapter.get('chapter', 0)
			verses = chapter.get('verses', [])

			if ch == ch_st and ch != ch_end:
				verses = verses[vs_st_index:]

			if ch == ch_end and ch != ch_st:
				verses = verses[: vs_end_index]

			if ch == ch_end and ch == ch_st:
				verses = verses[vs_st_index: vs_end_index]

			for verse in verses:
				result += verse

		return result.strip()

def retrieve_passage_summary(passage: str) -> str:
	parsed_passage = parse_scripture(passage)
	summary_dir = os.path.join('..', 'data', 'summary')
	summary = ''
	if parsed_passage.get('book', None) and parsed_passage.get('ch_st', None):
		summary += retrieve_many(
			parsed_passage.get('book', None),
			parsed_passage.get('ch_st', None),
			parsed_passage.get('ch_end', None),
			data_path=summary_dir
		)
	summary = summary.splitlines()
	return ' '.join(summary)

def retrieve(vol, page, data_path='../data/output', first_para=False):
	"""Retrieve one page from dir"""
	filepath = os.path.join(data_path, str(vol), str(page))
	text = ''
	try:
		with open(filepath, 'r') as output:
			for line in output:
				if first_para and line[0].isspace():
					break
				text += line
	except OSError as e:
		if e.errno == 2:  # [Errno 2] No such file or directory
			pass
		else:
			raise e
	return text

def retrieve_many(vol, start, end, data_path='../data/output') -> str:
	"""Retrieve many pages from dir"""
	vol = int(vol) if type(vol) == str else vol
	if vol < 3:
		return retrieve_passage(vol, start)
	if not end:
		return retrieve(vol, start)

	text = ''
	for i in get_page_range(start, end, vol):
		page = retrieve(vol, i, data_path)
		text += page
	return text


def main():
	return

if __name__ == '__main__':
	main()

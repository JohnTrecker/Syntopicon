import sys
import csv

def write_file(filename1, filename2, filename3):

  topics_file = open(filename1, 'r')
  input_file = open(filename2, 'r')
  output_file = open(filename3, "wb")
  writer = csv.writer(output_file, delimiter=',')

  def writeline():
    writer.writerow([rid, topic, subtopic, author, vol, alpha, omega, passage, notes])

  topics = []
  rid = 0
  topic = ''
  subtopic = ''
  notes = ''
  count = 0


  for string in topics_file:
    topics.append(string.strip())

  topics_file.close()

  for blob in input_file:
    lines = blob.split('\r')
    for line in lines:
      if line:
        if line[0]:
          if line[0].isdigit():
            num, description = line.split('\t')
            subtopic = num.rstrip('.')
            if num == '1.':
              topic = topics.pop(0)

          elif line[0] == '\t':
            vol, refs = line.split('\t')[1:3]

            if vol == '0' or vol == '1' or vol == '2':
              vol = vol.rstrip(':')
              refs = refs.split('/')
              author = 'Bible'
              alpha = ''
              omega = ''

              for ref in refs:
                ref = ref.strip()
                if ';' in ref:
                  passages = ref.split(';')
                  book = passages[0].split(',', 1)[0]
                  for passage in passages:

                    # TODO: handle e.g. "passim", "esp"

                    if passage[0].isalpha() or passage[1] == " ":
                      passage = passage.split(',', 1)[1]
                    rid += 1
                    passage = book + passage

                    writeline()

                else:
                  passage = ref.replace(',', '', 1)
                  rid += 1

                  writeline()

            else:
              passage = ''
              refs = refs.split(',')
              author = refs.pop(0)
              if author == 'James' or author == 'Eliot':
                surname = refs.pop(0)
                author = author + ',' + surname
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

  input_file.close()
  output_file.close()

def main():
  if len(sys.argv) != 4:
    print 'usage: ./makeFile.py <topics_file> <references_file> <output_file>'
    sys.exit(1)

  filename = sys.argv[1]
  filename2 = sys.argv[2]
  filename3 = sys.argv[3]
  write_file(filename, filename2, filename3)

if __name__ == '__main__':
  main()

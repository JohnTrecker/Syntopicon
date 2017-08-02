import pprint
pp = pprint.PrettyPrinter(indent=2)

topics = []
rid = 0
topic = ''
subtopic = ''
notes = 'NA'
count = 0

def printline():
  print rid, topic, subtopic, vol, author, alpha, omega, passage, notes

topics_file = open('../data/topics.txt', 'r')
for string in topics_file:
  topics.append(string.strip())

input_file = open('../data/refs.txt', 'r')
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

          if vol[0].isdigit():
            passage = 'NA'
            refs = refs.split(',')
            author = refs.pop(0)
            if author == 'James' or author == 'Eliot':
              surname = refs.pop(0)
              author = author + ',' + surname
            for ref in refs:
              rid += 1
              ref = ref.lstrip()
              alpha = ref
              omega = 'NA'
              notes = 'NA'
              if '-' in ref:
                alpha, omega = ref.split("-", 1)
                if "passim" in omega or "esp" in omega:
                  omega, notes = omega.split(" ", 1)
              else:
                alpha = ref
                if " " in ref:
                  alpha, notes = ref.split(" ", 1)

              printline()

          if vol[0].isalpha():
            vol = vol.rstrip(':')
            refs = refs.split('/')
            author = 'NA'
            alpha = 'NA'
            omega = 'NA'
            for ref in refs:
              ref = ref.strip()
              if ';' in ref:
                passages = ref.split(';')
                book = passages[0].split(',', 1)[0]
                for passage in passages:

                  # TODO: test for typoes in .doc
                  # TODO: handle e.g. "passim", "esp"

                  if passage[0].isalpha() or passage[1] == " ":
                    passage = passage.split(',', 1)[1]
                  rid += 1
                  passage = book + passage
                  printline()
              else:
                passage = ref.replace(",", "", 1)
                rid += 1
                printline()
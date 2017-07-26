import sys

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

        # '\t11\tPlotinus, 379-380, 435-443, 518-519, 524-526, 535-537, 554-562'
        if line[0] == '\t':
          # define vol, refs

          contents = line.split('\t')

          # '\tOld Testament: Genesis, 1 / Psalms, 19:1-6; 104; 136:1-9'
          if len(contents) < 3:
            vol, refs = contents[1].split(': ')
            refs = refs.split('/')

          # '\t7\tAristotle, 362-367, 378-379'
          else:
            vol, refs = contents[1:3]
            refs = refs.split(',')
            author = refs.pop(0)

          syntopicon[topic][subtopic]['refs'] = {vol: refs}

        elif line[0].isdigit():
          # define subtopic and determine relation to subtopic

          subtopic = line
          # '1.', 'Conceptions of democracy: the comparison of democracy with other forms of government'
          # '6d.', 'The goodness and beauty of the universe: its evil and imperfections'
          # '1g(2)',  'The sovereign office: the partition of sovereignty among the offices created by a constitution'

          syntopicon[topic][subtopic] = line

  input_file.close()
  input_file2.close()
  print syntopicon

# {
#   Angel: {
#     1: {
#       description: 'Inferior deities or demigods in polytheistic religion',
#       refs: {
#         Homer: ['167-171', '174-179', '228-230', '244', '258-261', '350-353', '388-389'],
#         Aeschylus: ['40-53', '90-103'],
#         ...
#       }
#       subtopics: null
#     }
#   },
#   ...
# }

# for each line of refs
#   if the line begins with a number(1 or 2), and THEN a period, its a child topic
#     if 1. it's a new topic
#       create new child object on result object and recurse
#   if the line begins with a number(1 or 2), a letter (1) and THEN a period, its a grandchild topic
#   if the line begins with a number(1 or 2), a letter (1) and THEN (number), its a great-grandchild topic
#   if the line begins with a tab character its a reference
#   else it's an empty line

def print_topics(filename, filename2):
  topic_list = topics_dict(filename, filename2)
  topics = topic_list.keys()
  for topic in topics:
    print topic
    # subtopics = topic_list[topic].keys()
    # for subtopic in subtopics:
      # print '\t'
      # print topic_list[topic][subtopic].description

def main():
  if len(sys.argv) != 3:
    print 'usage: ./makeFile.py file file2'
    sys.exit(1)

  filename = sys.argv[1]
  filename2 = sys.argv[2]
  # print_topics(filename, filename2)
  topics_dict(filename, filename2)

if __name__ == '__main__':
  main()
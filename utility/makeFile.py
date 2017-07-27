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
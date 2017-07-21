import sys

def topics_dict(filename):
  refs = {}
  input_file = open(filename, 'r')
  for line in input_file:
    words = line.split()
    for word in words:
      word = word.lower()
      if not word in refs:
        refs[word] = 1
      else:
        refs[word] = refs[word] + 1
  input_file.close()
  return refs

# for each line of refs
#   if the line begins with a number(1 or 2), and THEN a period, its a child topic
#     if 1. it's a new topic
#       create new child object on result object and recurse
#   if the line begins with a number(1 or 2), a letter (1) and THEN a period, its a grandchild topic
#   if the line begins with a number(1 or 2), a letter (1) and THEN (number), its a great-grandchild topic
#   if the line begins with a tab character its a reference
#   else it's an empty line

# Data Structure
# - 1.
#   - 1a.
#   - 1b.
#     - 1b(1)
#     - 1b(2)
#       - Old Testament: Genesis, 3 / 1 Samuel, 16:14-23 / 1 Kings, 22:20-23
#       - Apocrypha: Judith, 7:8-31 / I Maccabees / II Maccabees
#       - New Testament: Matthew, 20:29-34 / Mark, 1:29-34, 40-44; 2:3-12; 4:34-41 / Luke, 1:5-66; 4:31-5:26
#       - 18 Aquinas, 7-9, 114-115, 169, 196, 235-239, 282
#       - 19 Dante, 369-370, 372, 384-390 passim, 403-404
#       ...
# - 2.
# ...
# - 8.
# - 1.

def print_topics(filename):
  """Prints one per line '<topic> <count>' sorted by topic for the given file."""
  topic_list = topics_dict(filename)
  topics = sorted(topic_count.keys())
  for topic in topics:
    print topic, topic_list[topic]

def main():
  if len(sys.argv) != 2:
    print 'usage: ./makeFile.py file'
    sys.exit(1)

  filename = sys.argv[1]
  print_topics(filename)

if __name__ == '__main__':
  main()
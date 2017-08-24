import json
file = open('../data/subtopics.txt', 'r')
output = open('../data/subtopics.json', 'w')

# v1
# {
#   'topics': [
#     { 'topic': 'Angel', 'subtopics': [ {...}, {...} ], 'number': null},
#     { 'topic': 'Animal', 'subtopics': [ {...}, {...} ], 'number': null},
#     ...
# v2
#     ...,
#     { 'topic': 'Aristocracy', 'number': null, 'subtopics': [
#       {'subtopic': 'The general theory and evaluation of aristocracy', 'number': '1'},
#       {'subtopic': 'Aristocracy as a good form of government', 'number': '1a'}
#     ]}
#   ]
# }

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

# import pprint
# pp = pprint.PrettyPrinter(indent=2)
# pp.pprint(alltopics)

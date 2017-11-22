import os
import sys
import json
import csv

def makecsv(json_file, csv_file):
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


def main():
  if len(sys.argv) != 3:
    print('usage: ./makeTopicsCSV.py <input json> <output csv>')
    sys.exit(1)

  filename = sys.argv[1]
  filename2 = sys.argv[2]
  # print_topics(filename, filename2)
  makecsv(filename, filename2)

if __name__ == '__main__':
  main()
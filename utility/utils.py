import sys
import os
from path import Path
data = '../data/output'

def listFiles(directory=data):
	o = Path(directory)
	for d in o.dirs():
		for f in d.files('*.txt'):
			print (f)

def retrieve(vol, page):
  filepath = os.path.join(data, str(vol), str(page))
  with open(filepath, 'r') as output:
    for text in output:
      return text

def retrieveMany(vol, start, end):
  data = ''
  start = int(start)
  end = int(end)+1
  for i in range(start, end):
    page = retrieve(vol, i)
    data += page
  print(data)
  return data

def main():
  if len(sys.argv) < 3:
    print ('usage: ./retrieve.py vol first page [last page]')
    sys.exit(1)

  vol = sys.argv[1]
  start = sys.argv[2]
  if len(sys.argv) != 4:
    end = sys.argv[2]
  else:
    end = sys.argv[3]

  retrieveMany(vol, start, end)

if __name__ == '__main__':
  main()
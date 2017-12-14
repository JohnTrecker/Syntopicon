import sys
import os

def retrieve(vol, page):
  path = '../data/output/' + str(vol) +'/' + str(page)
  with open(path, 'r') as output:
    for text in output:
      return text;

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
import sys

def retrieve(vol, page):
  path = '../data/output/' + vol +'/' + page
  text = open(path, 'r')
  for blob in text:
    lines = blob.split('\r')
    for line in lines:
      print line
  text.close()

def main():
  if len(sys.argv) != 3:
    print 'usage: ./retrieve.py vol page'
    sys.exit(1)

  vol = sys.argv[1]
  page = sys.argv[2]
  retrieve(vol, page)

if __name__ == '__main__':
  main()
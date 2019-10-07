import os
from os import listdir, path
from os.path import isfile, join
import pandas as pd
import scriptures

refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
subs = pd.read_csv('../data/csv/subs.csv', encoding='utf8', index_col=False)
# works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)
# vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
# auths = pd.read_csv('../data/csv/auths.csv', encoding='utf8', index_col=False)

def roman_to_int(roman):
	"""Convert from Roman numerals to an integer."""
	if not roman:
		return 0
	if roman.isdigit():
		return 0
	values = {'x': 10, 'v': 5, 'i': 1, 'l': 50, 'c': 100, 'd': 500, 'm': 1000}
	n = len(roman)
	total = values[roman[n-1]]
	for i in range(n-1,0,-1):
		current = values[roman[i]]
		prev = values[roman[i-1]]
		total += prev if prev >= current else -prev
	return total

def int_to_roman(num):
	"""Convert from an integer to Roman numerals."""
	val = [
		1000, 900, 500, 400,
		100, 90, 50, 40,
		10, 9, 5, 4,
		1
	]
	syb = [
		'm', 'cm', 'd', 'cd',
		'c', 'xc', 'l', 'xl',
		'x', 'ix', 'v', 'iv',
		'i'
	]
	roman_num = ''
	i = 0
	while num > 0:
		for _ in range(num // val[i]):
			roman_num += syb[i]
			num -= val[i]
		i += 1
	return roman_num

def isNaN(num):
	return num != num

def get_ref_meta(ref_id):
	a = refs.loc[refs.id == ref_id, [
		'volume', 'page_start', 'page_end']]
	b = a.values.T.tolist()
	volume, page_start, page_end = [item for sublist in b for item in sublist]
	# ALT: volume, page_start, page_end, subtopic_id = [item for sublist in b for item in sublist]
	# ALT: description = subs.loc[subs.id == subtopic_id, 'description'].values[0]
	# ALT: return (volume, page_start, page_end, description)
	return (volume, page_start, page_end)

def get_page_range(start, end, vol=3):
	"""Return list of all pages (roman num and/or int) from start to end"""
	if start.isdigit():
		start = int(start)
		if type(end) is float:
			end = start
		if type(end) is str:
			end = int(end)
		return list(range(start, end + 1))
	else:
		if end and end.isdigit():
			return get_page_range_with_front_matter(start, end, vol)
		start = roman_to_int(start)
		end = roman_to_int(end) if end else start
		return [int_to_roman(i) for i in range(start, end + 1)]

def get_page_range_with_front_matter(start, end, vol):
	path_name = join('..', 'data', 'output', str(vol))
	only_front_matter = [f for f in listdir(path_name) if isfile(
		join(path_name, f)) and not f.isdigit()]
	all_front_matter = [roman_to_int(p) for p in only_front_matter]
	all_front_matter.sort()
	pages = []
	if len(all_front_matter):
		sorted_front_matter = [int_to_roman(p) for p in all_front_matter]
		try:
			start_index = sorted_front_matter.index(start)
			pages = sorted_front_matter[start_index:]
		except Exception as e:
			print('Error arranging front matter pages: {}'.format(e))
	pages.extend(get_page_range('1', end))
	return pages

def parse_passage(passage: str) -> list:
	return scriptures.extract(passage)

def retrieve_passage_summary(passage: str) -> str:
	parsed_passage = parse_passage(passage)
	summary_dir = os.path.join('..', 'data', 'summary')
	summary = ''
	if len(parsed_passage):
		for parsed in parsed_passage:
			(book, ch_start, vs_start, ch_end, vs_end) = parsed
			summary += retrieve_many(book, ch_start, ch_end, summary_dir)
	return summary

def retrieve(vol, page, data_path='../data/output', file_path=None, first_para=False):
	"""Retrieve one page from dir"""
	filepath = os.path.join(data_path, str(vol), str(page))
	text = ''
	try:
		with open(filepath, 'r') as output:
			for line in output:
				if first_para and line[0].isspace():
					break
				text += line
	except OSError as e:
		if e.errno == 2:  # [Errno 2] No such file or directory
			pass
		else:
			raise e
	return text

def retrieve_many(vol, start, end, data_path='../data/output') -> str:
	"""Retrieve many pages from dir"""
	start = str(start)
	end = str(end)
	if not end:
		return retrieve(vol, start)

	text = ''
	for i in get_page_range(start, end, vol):
		page = retrieve(vol, i, data_path)
		text += page
	return text


def main():
	return

if __name__ == '__main__':
	main()

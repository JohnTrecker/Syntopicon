import os

def roman_to_int(roman):
	"""Convert from Roman numerals to an integer."""
	values = {'x': 10, 'v': 5, 'i': 1, 'l': 50, 'c': 100, 'd': 500, 'm': 1000}
	numbers = []
	for char in roman:
		numbers.append(values[char])
	total = 0
	for num1, num2 in zip(numbers, numbers[1:]):
		if num1 >= num2:
			total += num1
		else:
			total -= num1
	return total + num2

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

def get_page_range(start, end):
	"""Return list of all pages (roman num and/or int) from start to end"""
	if start.isdigit():
		start = int(start)
		if type(end) is float:
			end = start
		if type(end) is str:
			end = int(end)
		return range(start, end + 1)
	else:
		start = roman_to_int(start)
		end = roman_to_int(end)
		pages = [int_to_roman(i) for i in list(range(start, end + 1))]
		return pages

def retrieve(vol, page, data_path='../data/output', first_para=False):
	"""Retrieve one page from dir"""
	filepath = os.path.join(data_path, str(vol), str(page))
	text = ''
	with open(filepath, 'r') as output:
		for line in output:
			if first_para and line[0].isspace():
				break
	text += line
	return text

def retrieve_many(vol, start, end):
	"""Retrieve many pages from dir"""
	text = ''
	for i in get_page_range(start, end):
		page = retrieve(vol, i)
		text += page
	return text


def main():
	return

if __name__ == '__main__':
	main()

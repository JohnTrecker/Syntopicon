# from librarian import get_ref_meta, parse_scripture, retrieve_many
import os
import json
from pprint import pprint

def errata():
	refs = pd.read_csv('../data/csv/reference.csv',
	                   encoding='utf8', index_col=False)
	a = refs.copy()
	a.set_index('id', inplace=True)

	# emendata
	a.at[34251, 'volume'] = 5
	a.at[34252, 'volume'] = 6
	a.at[90750, 'author'] = 'Euripedes'
	a.drop(43611)
	# Aristophanes refs taken from 1952 pagination =(
	a.at[13012, 'page_start'] = '673'
	a.at[13012, 'page_end'] = '696'
	a.at[32135, 'page_start'] = '683'
	a.at[30561, 'page_start'] = '697'
	a.at[30561, 'page_end'] = '721'
	a.at[67746, 'page_start'] = '719'
	a.at[67746, 'page_end'] = None
	a.at[90751, 'page_start'] = '752'
	a.at[90751, 'page_end'] = '756'
	a.at[36474, 'page_start'] = '810'
	a.at[32707, 'page_start'] = '815'
	a.at[32707, 'page_end'] = '816'
	a.at[90752, 'page_start'] = '824'
	a.at[90752, 'page_end'] = '845'
	a.at[64470, 'page_start'] = '848'
	a.at[64470, 'page_end'] = '848'
	a.at[82300, 'page_start'] = '887'
	a.at[82300, 'page_end'] = '905'

	a.at[27819, 'volume'] = 7
	a.at[27820, 'volume'] = 7
	a.at[27821, 'volume'] = 7
	a.at[69229, 'volume'] = 5

def main():
	# (vol, st, end, description) = get_ref_meta(89)
	# print(vol, st, end, description)
	# b = retrieve_many(vol, st, end)
	# prYellow(b)
if __name__ == '__main__':
	main()

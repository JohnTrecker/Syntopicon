#!/usr/bin/env python

import pandas as pd
import streamlit as st
import os
import csv
import scriptures

from summary_intern import Summarizer
from scriptures.texts.deuterocanon import Deuterocanon

s = Summarizer()
d = Deuterocanon()


refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
# subs = pd.read_csv('../data/csv/subs.csv', encoding='utf8', index_col=False)
# works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)
# vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
# auths = pd.read_csv('../data/csv/auths.csv', encoding='utf8', index_col=False)
# texts = pd.read_csv('../data/csv/texts.csv', encoding='utf8', index_col=False)


def fix_duplicates():
	refs = pd.read_csv('../data/csv/refs2.csv', encoding='utf8', index_col=False)
	refs['id'] = refs.index + 1
	st.write('fixed duplicates')
	refs.to_csv('../data/csv/refs3.csv', index=False, sep=',', encoding='utf-8')

def get_duplicates():
	refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
	a = refs[refs.duplicated(subset='id', keep=False)]
	st.write('duplicates in refs', a.shape[0])
	st.table(a)

def get_summary(ref_id, logwriter):
	try:
		summary = s.summarize_text(ref_id)
		st.write('{} summarized: {}'.format(ref_id, summary[:25]))
		return summary
	except Exception as e:
		st.write('ERROR: {} failed to summarize: {}'.format(ref_id, e))
		logwriter.writerow([ref_id, e])
		return ''

def set_summary(df):
	with open('../data/csv/logs/error_log_2019_10_01.csv', 'w') as log:
		logwriter = csv.writer(log, delimiter=',')
		logwriter.writerow(['id', 'error'])
		df['summary'] = df.apply(lambda x: get_summary(x.id, logwriter), axis=1)

def complete_summary():
	a = pd.read_csv('../data/csv/texts.csv', encoding='utf8', index_col=False)
	st.write('texts size', a.shape[0])

	b = pd.read_csv('../data/csv/error_log.csv', encoding='utf8', index_col=False)
	st.write('refs size', b.shape[0])
	set_summary(b)

	c = pd.concat([a, b], ignore_index=True, join="inner", verify_integrity=True)
	c.sort_values(by=['id'], inplace=True)
	st.write('resulting size')

	st.write(c.shape[0])
	st.write(c.head(n=60))

	c.to_csv('../data/csv/new_texts.csv', encoding='utf8', index=False)

	return

def get_cached_summary(df, ref_id: int) -> dict:
	ref_id = int(ref_id)
	summary = df.loc[df.id == ref_id, 'summary']
	st.title('summary')
	if not summary.empty:
		st.write(summary.iloc[0])
		return {'summary': summary.iloc[0]}
	else:
		st.write('no summary')
		return {'summary': None}

def clean_refs():
	refs = pd.read_csv('../data/csv/legacy/refs_orig.csv', encoding='utf8', index_col=False)

	refs['ID'] = refs.index + 1
	df_1 = refs.merge(subs, on=['topic_id','subtopic_id'], suffixes=('_REFS', '_SUBS'), validate='m:1')
	st.write(df_1.shape[0])
	df_1['subtopic_id'] = df_1['id']

	del df_1['id']
	del df_1['description']

	df_1.loc[df_1.author == 'Bible', 'alpha'] = df_1.loc[df_1.index, 'passage']
	del df_1['passage']

	df_2 = df_1.merge(auths, left_on='author', right_on='last_name', suffixes=('_REFS', '_AUTHS'), validate='m:1')
	del df_2['last_name']
	del df_2['first_name']

	df_2 = df_2.rename(index=str, columns={'id': 'author_id', 'ID': 'id', 'alpha': 'page_start', 'omega': 'page_end'})
	df_2.id.astype(int)

	cols = ['id', 'topic_id', 'subtopic_id', 'author_id', 'author', 'volume', 'page_start', 'page_end', 'notes']
	df_2 = df_2[cols]

	df_2 = df_2.sort_values('id')

	st.title('df_2 head')
	st.table(df_2.head())

	st.title('original refs')
	st.write(refs.shape[0])
	st.title('df_2 refs')
	st.write(df_2.shape[0])
	st.table(df_2.head(n=30))

	df_2.to_csv('../data/csv/refs.csv', encoding='utf8', index=False)

def add_indices():
	auths = pd.read_csv('../data/csv/auths.csv', encoding='utf8', index_col=False)
	refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
	subs = pd.read_csv('../data/csv/subs.csv', encoding='utf8', index_col=False)
	trans = pd.read_csv('../data/csv/trans.csv', encoding='utf8', index_col=False)
	vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
	works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)
	for csv in [(refs, 'refs_indexed.csv'), (works, 'works_indexed.csv'),
				(auths, 'auths_indexed.csv'), (refs, 'refs_indexed.csv'),
				(subs, 'subs_indexed.csv'), (trans, 'trans_indexed.csv'),
				(vols, 'vols_indexed.csv')]:
		df = csv[0]
		file = csv[1]
		path = os.path.join('..','data', 'csv', file)

		cols = list(df.columns.values)
		cols.insert(0, 'id')
		df = df.reindex(columns=cols)
		df['id'] = df.index + 1
		df.to_csv(path, index=False, sep=',', encoding='utf-8')

def get_keys(index, df):
	d = df.loc[index, ['volume', 'page_start']].to_dict()
	volume = d.get('volume', None)
	page_start = d.get('page_start', None)
	return {'volume': volume, 'page_start': page_start}

def separate_refs():
	# seperate out page references with integers
	ps = refs.page_start

	a = refs[pd.notnull(ps) & ps.str.isnumeric()]
	# a.page_stard.astype(int)
	# a.volume.astype(int)
	len_a = a.shape[0]

	# seperate out page references with roman numerals
	b = refs[pd.notnull(ps) & ps.str.isalpha() & ps.str.islower()]
	# b.page_start.astype(str)
	# b.volume.astype(str)
	len_b = b.shape[0]

	# seperate out page references with unique references
	c = refs[~refs.id.isin(a.id) & ~refs.id.isin(b.id)]
	# c.page_start.astype(str)
	# c.volume.astype(str)
	len_c = c.shape[0]

	st.title('seperated refs')
	st.write('integer refs', len_a, 'numeral refs', len_b, 'biblical refs', len_c)
	st.write('total:', len_a + len_b + len_c, 'expected:', refs.shape[0])
	st.title('All refs accounted for')
	st.write((len_a + len_b + len_c) == refs.shape[0])

	return (a, b, c)

def get_work_id(ref_id):
	volume = refs.loc[refs.id == ref_id, 'volume'].values[0].item()
	page_start = refs.loc[refs.id == ref_id, 'page_start'].values[0]

	if volume is None or page_start is None:
			return None

	if volume < 3 or (page_start.isalpha() and page_start.islower()):
		page_start = 1

	f = works.loc[works.volume == volume]
	g = f.query('page_start <= {}'.format(page_start))
	work_id = g.tail(1).id.values[0]
	return work_id
	# title = g.tail(1).title.values[0]
	# return title

def set_work_ids():
	refs['work_id'] = refs.apply(lambda x: get_work_id(x.id), axis=1)

def get_refs_by_page_length(length = 100, note=None):
	PAGE_LENGTH = length
	ps = refs.page_start
	pe = refs.page_end

	a = refs[pd.notnull(ps) & ps.str.isnumeric() & pd.notnull(pe)]
	a = a.astype({'page_start': int, 'page_end': int})
	ps_a = a.page_start
	pe_a = a.page_end

	b = a.loc[pe_a - ps_a > PAGE_LENGTH]
	if note:
		c = b[pd.notnull(b.notes) & b.notes.str.contains(note)]
		b = c
	st.title('References longer than {} pages'.format(PAGE_LENGTH))
	st.write(b.shape[0])
	st.table(b)

def drop_longs():
	a, b, c = separate_refs()
	d = b[pd.notnull(b.page_end) & b.page_end.str.isnumeric() & b.page_end.str.startswith('162')]
	b.drop(d.index, inplace=True, axis=0)
	st.write(b.shape[0])
	st.table(b)

def parse_scripture(passage: str) -> (str, int, int, int):
	"""returns tuple of book name, chapter start, verse start, chapter end, and verse end"""
	a = scriptures.extract(passage)
	if len(a) == 0:
		a = d.extract(passage)
	return a[0] if len(a) else []

def parse_ref_note(note: str, book: str = None) -> [dict]:
	"""returns start and end pages/chapters for more precise referencing"""
	if note.find('esp') == -1:
		return []
	passages = note.split('esp ')[1]
	seperated_refs = []
	for ref in passages.split(','):
		if book:
			seperated_refs.append({
				'start': '{} {}'.format(book, ref.strip()),
				'end': None,
			})
		else:
			new_ref = ref.strip().split('-')
			start = new_ref[0]
			end = None
			if len(new_ref) == 2:
				end = new_ref[1]
			seperated_refs.append({
				'start': start,
				'end': end,
			})
	return seperated_refs

def main():
	fix_duplicates()
	return

if __name__ == '__main__':
  main()

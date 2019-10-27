#!/usr/bin/env python

import pandas as pd
import streamlit as st
import os
import csv
import json
import time
import scriptures

from summary_intern import Summarizer
from scriptures.texts.deuterocanon import Deuterocanon
from librarian import get_ref_meta

s = Summarizer()
d = Deuterocanon()


# refs = pd.read_csv('../data/csv/reference.csv', encoding='utf8', index_col=False)
# summ = pd.read_csv('../data/csv/summary.csv', encoding='utf8', index_col=False)
# subs = pd.read_csv('../data/csv/subtopic.csv', encoding='utf8', index_col=False)
# tops = pd.read_csv('../data/csv/topic.csv', encoding='utf8', index_col=False)
works = pd.read_csv('../data/csv/work.csv', encoding='utf8', index_col=False)
# vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
# auths = pd.read_csv('../data/csv/author.csv', encoding='utf8', index_col=False)
# texts = pd.read_csv('../data/csv/text.csv', encoding='utf8', index_col=False)
# trans = pd.read_csv('../data/csv/translator.csv', encoding='utf8', index_col=False)


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
	a.page_stard.astype(int)
	a.volume.astype(int)
	len_a = a.shape[0]

	# seperate out page references with roman numerals
	b = refs[pd.notnull(ps) & ps.str.isalpha() & ps.str.islower()]
	b.page_start.astype(str)
	b.volume.astype(str)
	len_b = b.shape[0]

	# seperate out page references with unique references
	c = refs[~refs.id.isin(a.id) & ~refs.id.isin(b.id)]
	c.page_start.astype(str)
	c.volume.astype(str)
	len_c = c.shape[0]

	st.title('seperated refs')
	st.write('integer refs', len_a, 'numeral refs', len_b, 'biblical refs', len_c)
	st.write('total:', len_a + len_b + len_c, 'expected:', refs.shape[0])
	st.title('All refs accounted for')
	st.write((len_a + len_b + len_c) == refs.shape[0])

	return (a, b, c)

def get_work_id(ref_id, volume, page_start):
	if volume is None or page_start is None:
			return None

	if volume < 3 or (page_start.isalpha() and page_start.islower()):
		page_start = 1

	f = works.loc[works.volume_id == volume]
	g = f.query(f'page_start <= {page_start}')
	work_id = g.tail(1).id.values[0]
	return work_id

def set_work_ids():
	a = refs.drop(['work_id'], axis=1)
	st.write(a.head(n=5))
	a['work_id'] = a.apply(lambda x: get_work_id(x.id, x.volume, x.page_start), axis=1)
	a.to_csv(path_or_buf='../data/csv/test/refs_2019_10_19.csv', index=False)
	st.write('new refs written')

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
	return b

def get_long_goethe_refs():
	a = refs.copy()
	b = a[(a.author == 'Goethe') & (a.page_start == 'xv') & (a.page_end == '162')]
	return b

def drop_longs():
	longs = pd.concat([get_refs_by_page_length(), get_long_goethe_refs()])
	longs.set_index('id', verify_integrity=True, inplace=True)
	new_ref = refs.copy().set_index('id', verify_integrity=True)
	new_summary = summ.copy().set_index('id', verify_integrity=True)

	c = new_ref.drop(longs.index, axis=0)
	c.to_csv('../data/csv/reference2.csv', index=True, sep=',', encoding='utf-8')

	d = new_summary.drop(longs.index, axis=0)
	d.to_csv('../data/csv/summary2.csv', index=True, sep=',', encoding='utf-8')
	return

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

def combine_vals(x):
	a = x[0]
	b = x[1]
	c = x[2]
	return f'{a}-{b}-{c}'

def create_subtopics_json(outPath='../data/json/subtopics2.json'):
	a = subs.merge(tops, left_on='topic_id', right_on='id', suffixes=('_subs', '_tops'))
	a.drop(['id_tops', 'num_subtopics', 'subtopics', 'referrer_id'], axis=1, inplace=True)
	results = {'topics': []}
	current_topic = 0

	for i, subtopic in a.iterrows():
		row = dict(subtopic)
		if row.get('topic_id', None) == current_topic:
			results['topics'][current_topic - 1]['subtopics'].append({
				'id': row.get('id_subs', None),
				'number': row.get('alt_id', None),
				'subtopic': row.get('description', None),
			})
		else:
			current_topic = row.get('topic_id', None)
			results['topics'].append({
				'topic': row.get('name', None),
				'number': row.get('topic_id', None),
				'subtopics': [{
					'id': row.get('id_subs', None),
					'number': row.get('alt_id', None),
					'subtopic': row.get('description', None)
				}]
			})

	with open(outPath, 'w') as outFile:
		outFile.write(json.dumps(results))

	return

def get_author_mismatches():
	a = refs.copy()
	b = a.merge(works, left_on='work_id', right_on='id', suffixes=('_x', '_y'))
	c = b[b.author_x != b.author_y].sort_values(['volume', 'page_start_x'])
	c.set_index('id_x', inplace=True)
	c.drop(['work_id', 'notes', 'id_y', 'translator', 'page_start_y'], axis=1, inplace=True)
	st.write(f'{c.shape[0]} refs with mismatching authors')
	st.table(c)

def create_summary():
	a = summ.copy()
	b = a.merge(refs, on='id', validate='1:1', suffixes=('_x', '_y'))
	b.drop(['topic_id', 'subtopic_id', 'author_id', 'work_id', 'author', 'notes'], axis=1, inplace=True)
	b['alt_id'] = b[['volume', 'page_start', 'page_end']].apply(lambda x: combine_vals(x), axis=1)
	b.drop(['volume', 'page_start', 'page_end'], axis=1, inplace=True)
	b.drop_duplicates(subset=['alt_id'], inplace=True)
	b = b.reset_index()
	b.index += 1
	b.drop(['id', 'index'], axis=1, inplace=True)
	b.to_csv('../data/csv/summary2.csv', index=True, sep=',', encoding='utf-8')

def create_ref_summary_id():
	a = refs.copy()
	a['alt_id'] = a[['volume', 'page_start', 'page_end']].apply(
		lambda x: combine_vals(x), axis=1)

	b = a.merge(summ[['id','alt_id']], on='alt_id', validate='m:1', suffixes=('_x', '_y'))
	columns = {'id_x': 'id', 'id_y': 'summary_id'}
	b.drop(['alt_id'], axis=1, inplace=True)
	b.rename(columns=columns, inplace=True)
	b.sort_values(by=['id'], axis=0, inplace=True)
	st.write(b.head(n=100))
	b.to_csv('../data/csv/reference2.csv', index=False, sep=',', encoding='utf-8')

def create_ref_text_id():
	a = refs.copy()
	a['alt_id'] = a[['volume', 'page_start', 'page_end']].apply(
		lambda x: combine_vals(x), axis=1)

	b = a.merge(texts[['id','alt_id']], on='alt_id', validate='m:1', suffixes=('_x', '_y'))
	columns = {'id_x': 'id', 'id_y': 'text_id'}
	b.drop(['alt_id'], axis=1, inplace=True)
	b.rename(columns=columns, inplace=True)
	b.sort_values(by=['id'], axis=0, inplace=True)
	st.write(b.head(n=100))
	b.to_csv('../data/csv/reference2.csv', index=False, sep=',', encoding='utf-8')

def add_auth_id_to_works():
	a = works.copy().merge(auths, left_on='author', right_on='last_name',
		               validate='m:1', suffixes=('_x', '_y'))
	b = a.drop(['last_name', 'first_name'], axis=1)
	columns = {'id_x': 'id', 'id_y': 'author_id'}
	b.rename(columns=columns, inplace=True)
	c = b[['id', 'volume_id', 'author_id', 'author', 'title', 'translator', 'page_start']]
	c.sort_values(by=['id'], axis=0, inplace=True)
	c.loc[c.author == 'TSEliot', 'author'] = 'T.S. Eliot'
	c.loc[c.author == 'GEliot', 'author'] = 'George Eliot'
	c.loc[c.author == 'WJames', 'author'] = 'William James'
	c.loc[c.author == 'HJames', 'author'] = 'Henry James'
	st.table(c)
	c.to_csv('../data/legacy_csv/work_2019_10_24.csv', index=False, sep=',', encoding='utf-8')
	d = c.drop(['page_start'], axis=1)
	d.to_csv('../data/csv/work2.csv', index=False, sep=',', encoding='utf-8')

def add_crowdsourced_inputs_to_refs():
	a = refs.copy()
	a['referrer_id'] = 1
	a['upvotes'] = 0
	a['downvotes'] = 0
	st.write(a.head())
	a.to_csv('../data/csv/reference2.csv', index=False, sep=',', encoding='utf-8')

def main():
	return


if __name__ == '__main__':
  main()

#!/usr/bin/env python

import pandas as pd
import streamlit as st
import os

refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
subs = pd.read_csv('../data/csv/subs.csv', encoding='utf8', index_col=False)
# works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)
# vols = pd.read_csv('../data/csv/vols.csv', encoding='utf8', index_col=False)
# auths = pd.read_csv('../data/csv/auths.csv', encoding='utf8', index_col=False)

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

	# seperate out page references with roman numberals
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

def get_refs_by_page_length(length, note=None):
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


def main():
  return

if __name__ == '__main__':
  main()

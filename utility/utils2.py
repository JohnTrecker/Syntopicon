import pandas as pd
import streamlit as st

import pandas as pd

refs = pd.read_csv('../data/csv/refs.csv', encoding='utf8', index_col=False)
works = pd.read_csv('../data/csv/works.csv', encoding='utf8', index_col=False)

works.volume.astype(int)
works.page_start.astype(int)

# adjust columns
cols = list(refs.columns.values)
cols.insert(0, 'id')
cols.insert(3, 'work')
refs = refs.reindex(columns=cols)
refs['id'] = refs.index

# seperate out page references with integers
a = refs[pd.notnull(refs.alpha) & refs.alpha.str.isnumeric()]
a.alpha.astype(int)

# seperate out page references with roman numberals
b = refs[pd.notnull(refs.alpha) & refs.alpha.str.isalpha()]
b.alpha.astype(str)


## helper functions

# get volume, alpha
def get_keys(index, df):
    d = df.loc[a.id == index, ['volume', 'alpha']].to_dict()
    st.write(index)
    volume = d['volume'].get(index, None)
    alpha = d['alpha'].get(index, None)
    result = {'volume': volume, 'alpha': alpha}
    return result

# get title
def get_title(index, df):
    e = get_keys(index, df)
    volume = e.get('volume')
    alpha = e.get('alpha')
    print(index)
    if volume == None or alpha == None:
        return None
    f = works.loc[works.volume == volume]\
        .query('page_start <= {}'.format(alpha))\
        .sort_values('page_start', ascending=True)\
        .tail(1)['title']
    return f.to_dict()\
        .popitem()[1]

def set_work(index):
    title = get_title(index, a)
    a.loc[a.id == index, 'work'] = title

for i in range(0, a.shape[0]):
    a.loc[a.id == i, 'work'] = get_title(i, a)

st.write(a.head(n=12))

# def roman_to_int(roman, values={'x': 10, 'v': 5, 'i': 1}):
#     """Convert from Roman numerals to an integer."""
#     numbers = []
#     for char in roman:
#         numbers.append(values[char])
#     total = 0
#     for num1, num2 in zip(numbers, numbers[1:]):
#         if num1 >= num2:
#             total += num1
#         else:
#             total -= num1
#     return total + num2

# def convert_to_int(page):
#     if page.startswith('esp '):
#         return float('1.' + alpha[4:]) #1.211
#     if page[0] in ('x','v','i'):
#         return float('0.' + roman_to_int(page)) # 0.8
#     else:
#         return float('1.' + page) # 1.211


# from sumy.parsers.html import HtmlParser
# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.utils import get_stop_words
# from sumy.summarizers.edmundson import EdmundsonSummarizer

# from utils import retrieveMany

# # description = 'Inferior deities or demigods in polytheistic religion'
# LANGUAGE = 'english'
# SENTENCES_COUNT = 1
# text = retrieveMany(40, 329, 330)
# parser = PlaintextParser.from_string(text, Tokenizer('english'))

# print ("--EdmundsonSummarizer--")
# summarizer = EdmundsonSummarizer()
# words = ('demagoguery', 'despot', 'democracy', 'danger', 'revolution')
# summarizer.bonus_words = words

# words = get_stop_words(LANGUAGE)
# summarizer.stigma_words = words

# words = get_stop_words(LANGUAGE)
# summarizer.null_words = words
# for sentence in summarizer(parser.document, SENTENCES_COUNT):
#     print(sentence)
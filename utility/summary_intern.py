#!/usr/bin/env python

import math

from librarian import retrieve_many, get_ref_meta

from sumy.nlp.stemmers import Stemmer
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.utils import get_stop_words
from sumy.summarizers.lsa import LsaSummarizer

class Summarizer:
	def __init__(self, sentence_count=1, language='english'):
		self.SENTENCES_COUNT = sentence_count
		self.LANGUAGE = language

	def summarize_text(self, ref_id, volume=None,
                    page_start=None, page_end=None, description=None, text=None):
		if not volume or not page_start or not page_end:
			(volume, page_start, page_end, description) = get_ref_meta(ref_id)

		text = text or retrieve_many(volume, page_start, page_end)

		parser = PlaintextParser.from_string(text, Tokenizer('english'))
		stemmer = Stemmer(self.LANGUAGE)
		summarizer_2 = LsaSummarizer(stemmer)
		summarizer_2.stop_words = get_stop_words(self.LANGUAGE)

		summary = ''
		for lsa_sentence in summarizer_2(parser.document, self.SENTENCES_COUNT):
			summary += lsa_sentence._text

		return summary

	def get_bonus_words(self, description):
		"""returns expanded bonus words for Edmundson summarization"""
		filtered_words = set()
		stop_words = get_stop_words('english')
		for w in word_tokenize(description):
			if w not in stop_words:
				filtered_words.add(w.lower())

		for word in list(filtered_words):
			for synset in wordnet.synsets(word):
				for lemma in synset.lemmas():
					related_word = lemma.name()
					filtered_words.add(related_word)

		print('Bonus Words')
		print(filtered_words)

		return list(filtered_words)

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

def extract_keywords_tfidf(transcripts, num_keywords=10):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(transcripts)
    feature_names = vectorizer.get_feature_names_out()
    
    keywords = []
    for doc in range(tfidf_matrix.shape[0]):
        words = tfidf_matrix[doc, :]
        important_words_indices = words.toarray().argsort()[0][-num_keywords:]
        important_words = [feature_names[i] for i in important_words_indices]
        keywords.append(important_words[::-1])  # Reverse to get most important words first
    return keywords

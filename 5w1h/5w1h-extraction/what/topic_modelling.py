from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import TfidfVectorizer


def extract_topics_lda(transcripts, num_topics=5, num_words_per_topic=10):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(transcripts)
    
    lda = LatentDirichletAllocation(n_components=num_topics, random_state=0)
    lda.fit(tfidf_matrix)
    
    feature_names = vectorizer.get_feature_names_out()
    topics = []
    for topic_idx, topic in enumerate(lda.components_):
        top_features_indices = topic.argsort()[-num_words_per_topic:]
        top_features = [feature_names[i] for i in top_features_indices]
        topics.append(top_features[::-1])  # Reverse to get most important words first
    return topics

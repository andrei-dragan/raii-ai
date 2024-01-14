from nltk.sentiment import SentimentIntensityAnalyzer
import spacy
from why.preprocessing_why import preprocess_why

nlp = spacy.load("en_core_web_lg")
sia = SentimentIntensityAnalyzer()

# Keywords that often introduce reasons or explanations
REASON_KEYWORDS = ["because", "due to", "as a result", "the reason is", "since", "owing to", "caused by", "leads to"]

def extract_relevant_clause(sent, keyword):
    """
    Extracts the most relevant clause related to the keyword in the sentence.
    """
    for token in sent:
        if token.lemma_ == keyword:
            # Search for an entire phrase that can constitute a reason
            phrase = []
            for ancestor in token.ancestors:
                if ancestor.dep_ in ["ROOT"]:
                    phrase = [ancestor.text] + [child.text for child in ancestor.children if child.dep_ not in ["punct"]]
                    break
            if phrase:
                return ' '.join(phrase)
    return None

def analyze_sentence_structure(sent):
    """
    Analyzes the sentence structure for potential reasons.

    Args:
    sent (Span): The sentence span from the spaCy document.

    Returns:
    str: Extracted reason or None.
    """
    for token in sent:
        if token.dep_ in ["nsubj", "nsubjpass"] and token.head.pos_ == "VERB":
            subj = token.text
            verb = token.head.text
            # Collecting text from the verb's subtree while excluding auxiliary verbs and punctuation
            phrase = [child.text for child in token.head.subtree if child.pos_ != "AUX" and child.is_punct == False]
            # Reconstructing the reason phrase
            reason = " ".join([subj] + [verb] + phrase)
            return reason
    return None

def extract_reason_from_dialogue(doc):
    """
    Iterates over sentences in the dialogue to extract the most relevant reason.

    Args:
    doc (spacy.tokens.Doc): Processed spaCy document.

    Returns:
    str: The most relevant reason extracted from the dialogue.
    """
    reasons = []
    for sent in doc.sents:
        # Enhanced clause extraction
        for keyword in REASON_KEYWORDS:
            if keyword in sent.text.lower():
                reason = extract_relevant_clause(sent, keyword)
                if reason:
                    reasons.append(reason)
                else:
                    # Fallback to analyzing sentence structure
                    reason = analyze_sentence_structure(sent)
                    if reason:
                        reasons.append(reason)
    return max(reasons, key=lambda x: len(x.split()), default=None)  # Select the longest reason

def get_reason_score(reason, doc):
    """
    Calculates a relevance score for the extracted reason.

    Args:
    reason (str): The extracted reason.
    doc (spacy.tokens.Doc): The entire spaCy document for context.

    Returns:
    float: A relevance score for the reason.
    """
    sentiment_score = sia.polarity_scores(reason)['compound']
    # Length score: longer reasons may contain more detailed explanations
    length_score = len(reason.split())

    # Position in the document (earlier may be more relevant)
    position_score = doc.text.find(reason) / len(doc.text)

    return sentiment_score + length_score + (1 - position_score)

def extract_most_relevant_reason(text):
    doc = nlp(preprocess_why(text))
    reasons_with_scores = {}

    for reason in extract_reason_from_dialogue(doc):
        reasons_with_scores[reason] = get_reason_score(reason, doc)

    return max(reasons_with_scores, key=reasons_with_scores.get, default=None)


    return None

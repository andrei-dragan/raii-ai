import spacy
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load the spaCy model
try:
    nlp = spacy.load("en_core_web_lg")
except Exception as e:
    logging.exception("Failed to load spaCy model: %s", e)
    raise

def extract_person_entities(text):
    try:
        doc = nlp(text)
        return [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    except Exception as e:
        logging.exception("Error in extract_person_entities: %s", e)
        return []

def post_process_entities(entities):
    entities = [entity.title() for entity in entities]
    return list(set(entities))

def find_most_relevant_entity(text):
    person_entities = extract_person_entities(text)
    processed_entities = post_process_entities(person_entities)
    if processed_entities:
        most_common_entity = max(set(processed_entities), key=processed_entities.count)
        return most_common_entity
    return None
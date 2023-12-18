import spacy
import pandas as pd
import logging


# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


# Load the spaCy model
try:
    nlp = spacy.load("en_core_web_lg")
except Exception as e:
    logging.exception("Failed to load spaCy model: %s", e)
    raise  # Re-raise the exception to stop execution


def extract_person_entities(text):
    try:
        doc = nlp(text)
        person_entities = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
        return person_entities
    except Exception as e:
        logging.exception("Error in extract_person_entities: %s", e)
        return []  # Return empty list in case of error


def resolve_coreferences(text):
    try:
        doc = nlp(text)
        return doc._.coref_resolved
    except Exception as e:
        logging.exception("Error in resolve_coreferences: %s", e)
        return text  # Return original text in case of error


def post_process_entities(entities):
    # Standardize name formats (e.g., capitalize names)
    entities = [entity.title() for entity in entities]

    # Remove duplicates
    entities = list(set(entities))

    return entities


def apply_ner_to_dataset(file_path):
    try:
        df = pd.read_csv(file_path)
        df['Person_Entities'] = df['Text'].apply(extract_person_entities)
        df['Processed_Entities'] = df['Person_Entities'].apply(post_process_entities)
        return df
    except FileNotFoundError:
        logging.error("File not found: %s", file_path)
    except pd.errors.EmptyDataError:
        logging.error("Empty data in file: %s", file_path)
    except pd.errors.ParserError:
        logging.error("Error parsing the file: %s", file_path)
    except Exception as e:
        logging.exception("An unexpected error occurred: %s", e)
    return None


def find_patient_name(df, session_id):
    # Filter rows by SessionID
    session_data = df[df['SessionID'] == session_id]

    # Get unique speaker names
    unique_speakers = set(session_data['Speaker'])

    # Identify patient name by excluding known therapist identifiers
    therapist_identifiers = {'Therapist', 'Doctor', 'Counselor'}
    patient_names = unique_speakers - therapist_identifiers

    # Assuming there's only one patient per session
    return patient_names.pop() if patient_names else None


def find_most_relevant_entity(entities, df, session_id):
    """
    Find the name of the patient from a given therapy session.
    """
    if not entities:
        return find_patient_name(df, session_id)
        
    # Find the most frequently mentioned entity
    return max(set(entities), key=entities.count)


if __name__ == "__main__":
    file_path = '/Users/groza/Documents/mindful/5w1h-extraction/dataset/preprocessed_dataset.csv'
    processed_df = apply_ner_to_dataset(file_path)
    if processed_df is not None:
        processed_df.to_csv('who/ner_who_extracted_dataset.csv', index=False)
    else:
        logging.info("No data to save. Exiting.")

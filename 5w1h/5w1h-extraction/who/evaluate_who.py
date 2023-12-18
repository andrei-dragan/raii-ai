import pandas as pd
from ner_who import apply_ner_to_dataset, find_most_relevant_entity
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def load_annotated_data(file_path):
    return pd.read_csv(file_path)

def calculate_accuracy(annotated_df, predicted_df):
    correct_predictions = 0
    error_details = []

    for _, row in annotated_df.iterrows():
        actual_entity = row['Who']
        conversation_id = row['SessionID']  # Adjust as per your column name
        predicted_entities = predicted_df[predicted_df['SessionID'] == conversation_id]['Processed_Entities'].iloc[0]
        predicted_entity = find_most_relevant_entity(predicted_entities, predicted_df, conversation_id)

        if predicted_entity == actual_entity:
            correct_predictions += 1
        else:
            error_details.append((conversation_id, actual_entity, predicted_entity))

    accuracy = correct_predictions / len(annotated_df)
    return accuracy, error_details

def perform_error_analysis(error_details):
    logging.info("Performing error analysis...")
    for error in error_details:
        conversation_id, actual_entity, predicted_entity = error
        logging.info(f"Session ID: {conversation_id}, Actual: {actual_entity}, Predicted: {predicted_entity}")

def evaluate_ner(file_path_annotated, file_path_predicted):
    annotated_df = load_annotated_data(file_path_annotated)
    predicted_df = apply_ner_to_dataset(file_path_predicted)

    accuracy, error_details = calculate_accuracy(annotated_df, predicted_df)
    logging.info(f"NER Accuracy: {accuracy:.2f}")

    if error_details:
        perform_error_analysis(error_details)

if __name__ == "__main__":
    annotated_file_path = '/Users/groza/Documents/mindful/5w1h-extraction/dataset/dataset.csv'
    predicted_file_path = '/Users/groza/Documents/mindful/5w1h-extraction/who/ner_who_extracted_dataset.csv'
    evaluate_ner(annotated_file_path, predicted_file_path)

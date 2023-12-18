from who.ner_who_textblock import find_most_relevant_entity
import logging
from what.keyword_extraction import extract_keywords_tfidf
from what.topic_modelling import extract_topics_lda


# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


if __name__ == "__main__":
    # Example conversation text
    conversation_text = """
    Therapist: Good morning, Alex. How have you been feeling since our last session?

    Alex: Hi, Doctor. It's been a bit of a rollercoaster. Some days are good, but others are really challenging.

    Therapist: Can you tell me more about the challenging days?

    Alex: Sure. On the tough days, I feel overwhelmed with anxiety. It's like my thoughts are racing and I can't catch my breath.

    Therapist: That sounds difficult. Have you tried the breathing exercises we discussed?

    Alex: Yes, I have. They help a bit, but sometimes it's hard to even remember to do them when I'm panicking.

    Therapist: That's quite common, Alex. It takes practice. What usually triggers these feelings of panic?

    Alex: Work stress is a big trigger. Deadlines, meetings, it all piles up. And then there's the pressure I put on myself.

    Therapist: It's important to recognize these triggers. How do you usually cope with this pressure?

    Alex: I try to work harder, but that often makes it worse. Sometimes I just watch TV to distract myself, but I know that's just a temporary fix.

    Therapist: Distraction has its place, but let's explore some healthier coping mechanisms. Have you considered activities like yoga or journaling?

    Alex: I haven't, but I'm willing to try anything at this point.

    Therapist: Great. We can start by introducing a simple yoga routine and a journaling exercise to help manage your anxiety.
    """

    # Extracting "Who?"
    most_relevant_person = find_most_relevant_entity(conversation_text)
    if most_relevant_person:
        logging.info(f"The most relevant person in this conversation is: {most_relevant_person}")
    else:
        logging.info("No relevant person entity found in the conversation.")

    # Extracting "What?"
    keywords = extract_keywords_tfidf([conversation_text])
    topics = extract_topics_lda([conversation_text])

    # You can print or analyze the extracted keywords and topics further
    print("Keywords from TF-IDF:", keywords)
    print("Topics from LDA:", topics)   


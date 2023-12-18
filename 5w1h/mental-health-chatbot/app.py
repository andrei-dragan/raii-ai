import random
import pickle

import json

from flask import Flask, render_template, request

import numpy as np

import nltk
from nltk.stem import WordNetLemmatizer

from keras.models import load_model

nltk.download('popular') # popular NLTK data packages, including corpora, models
lemmatizer = WordNetLemmatizer()

model = load_model('model.h5')
intents = json.loads(open('intents.json').read())
words = pickle.load(open('texts.pkl','rb'))
classes = pickle.load(open('labels.pkl','rb'))


def clean_up_sentence(sentence):
    # Tokenize pattern - split words into array
    sentence_words = nltk.word_tokenize(sentence)

    # Stem each word - create short form for word
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


def bow(sentence, words, show_details=True):
    """
    Return: bag of words array (0 or 1 for each word in the bag that exists in the sentence)
    """
    # Tokenize pattern
    sentence_words = clean_up_sentence(sentence)

    # Bag of words - matrix of N words, vocabulary matrix
    bag = [0] * len(words)  
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s: 
                # Assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("Found in bag: %s" % w)

    return(np.array(bag))


def predict_class(sentence, model):
    # Filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    # Sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})

    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag']== tag):
            result = random.choice(i['responses'])
            break
    return result


def chatbot_response(msg):
    ints = predict_class(msg, model)
    res = getResponse(ints, intents)
    return res


app = Flask(__name__)
app.static_folder = 'static'
@app.route("/")


def home():
    return render_template("index.html")


@app.route("/get")


def get_bot_response():
    userText = request.args.get('msg')
    return chatbot_response(userText)

if __name__ == "__main__":
    app.run()
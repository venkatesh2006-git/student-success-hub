import re

FAQ_DATA = {
    "when does the semester end?": "The semester officially ends on May 15th, followed by finals week.",
    "how do i request an extension?": "Extensions must be requested directly from your professor via email at least 48 hours before the deadline.",
    "what is the grading scale?": "A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: <60.",
    "where is the library?": "The main university library is located at the center of the campus, next to the Student Union.",
    "how can i contact a ta?": "TAs hold office hours physically in room 402 and online via Zoom links posted on your course syllabus."
}

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text

def get_bot_response(user_query):
    query_clean = preprocess_text(user_query)
    best_match = None
    max_overlap = 0
    
    query_words = set(query_clean.split())
    for question, answer in FAQ_DATA.items():
        q_clean = preprocess_text(question)
        q_words = set(q_clean.split())
        overlap = len(query_words.intersection(q_words))
        if overlap > max_overlap:
            max_overlap = overlap
            best_match = answer
            
    if max_overlap > 0:
        return best_match
    else:
        return "I'm sorry, I couldn't find an answer to that question in my database. Please contact your academic advisor."

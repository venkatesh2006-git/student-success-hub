from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from planner_logic import generate_schedule
from bot_logic import get_bot_response

app = Flask(__name__, static_folder='frontend')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory('frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('frontend', path)

@app.route('/api/plan', methods=['POST'])
def plan():
    data = request.json
    if not data or 'subjects' not in data:
        return jsonify({"error": "Invalid input, 'subjects' array required"}), 400
        
    schedule = generate_schedule(data['subjects'])
    return jsonify({"schedule": schedule})

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Invalid input, 'query' required"}), 400
        
    response = get_bot_response(data['query'])
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

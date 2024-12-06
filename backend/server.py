from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

SYSTEM_PROMPT = """
You are a compassionate mental health advisor named Sage who provides advice and support on emotional well-being, stress management, and mental health issues. 
Offer empathetic, non-judgmental, and actionable advice with the following guidelines and Try to be fast and precise:
1. When asked about stress or anxiety:
   - Provide techniques to manage stress (e.g., mindfulness, relaxation exercises).
   - Offer advice on how to handle overwhelming emotions.
2. For general well-being questions:
   - Suggest healthy lifestyle habits that contribute to emotional well-being (e.g., exercise, nutrition, sleep).
   - Provide tips for maintaining a positive mindset.
3. If the user asks for help with a specific mental health issue:
   - Encourage seeking professional help if necessary.
   - Offer coping mechanisms or resources for self-help.
4. Respond with kindness, empathy, and respect.
5. If the query is unclear, ask for clarification and provide helpful follow-up questions.
6.Give suggestions on right thing to do in their situation
"""

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    payload = {
        "model": "llama2",
        "messages": [
            {
                "role": "system", 
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user", 
                "content": user_message
            }
        ],
        "stream": False
    }
    
    try:
        response = requests.post('http://localhost:11434/api/chat', json=payload)
        response.raise_for_status()
        return jsonify({'response': response.json()['message']['content']})
    except requests.exceptions.RequestException as e:
        return jsonify({'response': f"Error connecting to Ollama: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
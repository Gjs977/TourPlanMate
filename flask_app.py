# from flask import Flask, render_template, request, jsonify
# import openai
# from dotenv import load_dotenv
# import os

# load_dotenv()

# app = Flask(__name__)
# openai.api_key = os.getenv("OPENAI_API_KEY")

# @app.route("/")
# def hello():
#     return render_template('index.html')

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     data = request.json
#     user_message = data.get('message')

#     response = openai.ChatCompletion.create(
#         model="gpt-4o-mini",
#         messages=[{"role": "user", "content": user_message}],
#         max_tokens=2000, 
#         # temperature=0.7
#     )
#     answer = response.choices[0].message['content']
#     return jsonify({'answer': answer})

# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Flask, render_template, request, jsonify
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_message}],
        max_tokens=2000,
    )
    answer = response.choices[0].message.content
    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)

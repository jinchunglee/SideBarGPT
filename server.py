from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    text = data.get("text", "")
    question = data.get("question", "")

    full_prompt = f"Context:\n{text}\n\nQuestion: {question}"
    
    # 修改這行，加入 encoding="utf-8"
    result = subprocess.run(["ollama", "run", "mistral", full_prompt], capture_output=True, text=True, encoding="utf-8")

    return jsonify({"answer": result.stdout.strip()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

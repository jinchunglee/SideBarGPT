from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    text = data.get("text", "")
    question = data.get("question", "")

    full_prompt = f"Context:\n{text}\n\nQuestion: {question}"

    try:
        result = subprocess.run(
            ["ollama", "run", "llama3.2:3b", full_prompt],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="ignore"  # 忽略不能解碼的字元
        )
        output_text = result.stdout.strip()[:500]  # 限制最大輸出長度

    except UnicodeDecodeError:
        output_text = "⚠️ AI response contains unsupported characters."

    return jsonify({"answer": output_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

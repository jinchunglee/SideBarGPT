document.addEventListener("DOMContentLoaded", () => {
  // 讀取上一次的問題與 AI 回應
  let savedQuestion = localStorage.getItem("lastQuestion") || "";
  let savedResponse = localStorage.getItem("lastResponse") || "";

  document.getElementById("userQuestion").value = savedQuestion;
  document.getElementById("response").innerHTML = savedResponse;
});

document.getElementById("extract").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => document.body.innerText.trim()
    }, (results) => {
      if (results && results[0] && results[0].result) {
        let extractedText = results[0].result;
        localStorage.setItem("webpageText", extractedText);
        alert("✅ Webpage text extracted successfully!");
      } else {
        alert("⚠️ Failed to extract text.");
      }
    });
  });
});

document.getElementById("askAI").addEventListener("click", () => {
  let askButton = document.getElementById("askAI");
  let responseContainer = document.getElementById("response");

  askButton.innerText = "Processing...";
  askButton.disabled = true;
  responseContainer.innerHTML = "<em>Loading...</em>";

  let question = document.getElementById("userQuestion").value;
  let webpageText = localStorage.getItem("webpageText") || "";

  let fullText = webpageText ? `Context:\n${webpageText}\n\nQuestion: ${question}` : question;

  fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: fullText })
  })
  .then(response => response.json())
  .then(data => {
    console.log("🔍 AI 回應 (popup.js):", data.answer);

    // 顯示 AI 回應
    responseContainer.innerHTML = data.answer;

    // 存儲最近一次的問題與回應
    localStorage.setItem("lastQuestion", question);
    localStorage.setItem("lastResponse", data.answer);

    askButton.innerText = "Ask AI";
    askButton.disabled = false;
  })
  .catch(error => {
    console.error("⚠️ Error:", error);
    responseContainer.innerHTML = "<em>⚠️ Error: Unable to process request.</em>";

    askButton.innerText = "Ask AI";
    askButton.disabled = false;
  });
});

document.getElementById("extract").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        let text = document.body.innerText;
        localStorage.setItem("webpageText", text);
      }
    }, () => {
      alert("✅ Webpage text extracted! Ready to ask AI.");
    });
  });
});

document.getElementById("askAI").addEventListener("click", () => {
  let askButton = document.getElementById("askAI");
  let responseContainer = document.getElementById("response");

  // 顯示 Loading 狀態
  askButton.innerText = "Processing...";
  askButton.disabled = true;
  responseContainer.innerHTML = "<em>Loading...</em>";

  let question = document.getElementById("userQuestion").value;
  let webpageText = localStorage.getItem("webpageText") || "";

  fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: webpageText, question: question })
  })
  .then(response => response.json())
  .then(data => {
    console.log("🔍 AI 回應 (popup.js):", data.answer);

    // 顯示 AI 回應
    responseContainer.innerHTML = data.answer;

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

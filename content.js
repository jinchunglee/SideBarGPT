chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayAnswer") {
    console.log("🔍 AI 回應 (content.js):", message.answer);  // Debug 訊息

    // 移除舊的回應（避免多次顯示）
    let oldResponse = document.getElementById("ai-response-box");
    if (oldResponse) {
      oldResponse.remove();
    }

    // 創建 AI 回應的 UI 元素
    let responseBox = document.createElement("div");
    responseBox.id = "ai-response-box"; // 確保只有一個回應框
    responseBox.innerHTML = `<strong>💡 AI Answer:</strong> <br>${message.answer}`;
    responseBox.style.position = "fixed";
    responseBox.style.bottom = "20px";
    responseBox.style.right = "20px";
    responseBox.style.background = "rgba(0, 0, 0, 0.9)";
    responseBox.style.color = "white";
    responseBox.style.padding = "15px";
    responseBox.style.borderRadius = "10px";
    responseBox.style.zIndex = "9999";
    responseBox.style.maxWidth = "400px";
    responseBox.style.fontSize = "14px";
    responseBox.style.boxShadow = "0px 0px 10px rgba(255, 255, 255, 0.3)";

    // 關閉按鈕
    let closeButton = document.createElement("button");
    closeButton.innerText = "❌";
    closeButton.style.marginTop = "10px";
    closeButton.style.border = "none";
    closeButton.style.background = "red";
    closeButton.style.color = "white";
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.style.display = "block";
    closeButton.style.margin = "auto";
    closeButton.addEventListener("click", () => {
      responseBox.remove();
    });

    responseBox.appendChild(closeButton);
    document.body.appendChild(responseBox);
  }
});

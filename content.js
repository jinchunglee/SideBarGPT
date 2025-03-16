chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "displayAnswer") {
      let responseBox = document.createElement("div");
      responseBox.innerText = "💡 AI Answer: " + message.answer;
      responseBox.style.position = "fixed";
      responseBox.style.bottom = "20px";
      responseBox.style.right = "20px";
      responseBox.style.background = "rgba(0, 0, 0, 0.8)";
      responseBox.style.color = "white";
      responseBox.style.padding = "10px";
      responseBox.style.borderRadius = "5px";
      responseBox.style.zIndex = "9999";
      document.body.appendChild(responseBox);
    }
  });
  
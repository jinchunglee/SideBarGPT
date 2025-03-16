chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "askAI") {
      let webpageText = localStorage.getItem("webpageText") || "";
      
      fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: webpageText, question: message.question })
      })
      .then(response => response.json())
      .then(data => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (answer) => {
              let responseBox = document.createElement("div");
              responseBox.innerText = "💡 AI Answer: " + answer;
              responseBox.style.position = "fixed";
              responseBox.style.bottom = "20px";
              responseBox.style.right = "20px";
              responseBox.style.background = "rgba(0, 0, 0, 0.8)";
              responseBox.style.color = "white";
              responseBox.style.padding = "10px";
              responseBox.style.borderRadius = "5px";
              responseBox.style.zIndex = "9999";
              document.body.appendChild(responseBox);
            },
            args: [data.answer]
          });
        });
      });
    }
  });
  
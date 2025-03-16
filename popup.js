document.getElementById("extract").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          let text = document.body.innerText;
          localStorage.setItem("webpageText", text);
        }
      });
    });
  });
  
  document.getElementById("askAI").addEventListener("click", () => {
    let question = document.getElementById("userQuestion").value;
    let webpageText = localStorage.getItem("webpageText") || "";
  
    fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: webpageText, question: question })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").innerText = data.answer;
    });
  });
  
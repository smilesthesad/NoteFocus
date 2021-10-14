const fromContentScript = "from_content_script";
const fromPopup = "from_popup";
const messageQueue = [];

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === fromContentScript) {
    messageQueue.push(message);
  } else if (message.type === fromPopup) {
    sendResponse(messageQueue);
  }
});

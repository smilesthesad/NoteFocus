const EXTENSIONENABLED = "current-chrome-status";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    [EXTENSIONENABLED]: true,
  });
});

const EXTENSIONENABLED = "current-chrome-status";
const USERCONTENTKEY = "saved-content";

const getStorageValPromise = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (res) => {
      resolve(res[key] === undefined ? "" : res[key]);
    });
  });
};

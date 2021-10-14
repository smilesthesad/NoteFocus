const USERCONTENTKEY = "saved-content";

let editor;

const options = {
  theme: "snow",
};

const getStorageValPromise = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (res) => {
      console.log(res[USERCONTENTKEY]);
      resolve(res[USERCONTENTKEY] === undefined ? "" : res[USERCONTENTKEY]);
    });
  });
};

chrome.storage.onChanged.addListener(async () => {
  const curr = await getStorageValPromise(USERCONTENTKEY);
  console.log(`curr in popup js is ${curr}`);
  // editor.insertText(1, curr);
});

setTimeout(() => {
  editor = new Quill("#editor", { theme: "snow" });
  let curr;
  getStorageValPromise(USERCONTENTKEY);
  console.log(curr);
  // editor.insertText(0, "helloWorld");
  // editor.insertText(1, curr);
  console.log("editor started");
});

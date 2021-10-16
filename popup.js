const USERCONTENTKEY = "saved-content";

let editor;

const options = {
  theme: "snow",
};

const getStorageValPromise = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (res) => {
      console.log("user content is", res[USERCONTENTKEY]);
      resolve(res[USERCONTENTKEY] === undefined ? "" : res[USERCONTENTKEY]);
    });
  });
};

const createQuill = async () => {
  editor = new Quill("#editor", options);
  const curr = await getStorageValPromise(USERCONTENTKEY);
  editor.setText("");
  editor.setText(curr);
};

$(() => {
  createQuill();

  $("#clear-button").on("click", () => {
    console.log("cleared content in jqery");
    chrome.storage.sync.set(
      {
        [USERCONTENTKEY]: "",
      },
      () => {
        if (chrome.runtime.error) {
          console.log("unable to clear content");
        }
      }
    );
    console.log("cleared content");
    editor.setContents([]);
  });

  $("#copy-button").on("click", async () => {
    console.log("copied text");
    const text = await getStorageValPromise(USERCONTENTKEY);
    navigator.clipboard.writeText(text);
  });

  chrome.storage.onChanged.addListener(async () => {
    const curr = await getStorageValPromise(USERCONTENTKEY);
    editor.setText("");
    editor.setText(curr);
  });
});

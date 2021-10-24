let editor;

const options = {
  theme: "snow",
};
const createQuill = () => {
  editor = new Quill("#editor", options);
};

const initializePopup = async () => {
  createQuill();
  await readContext();
};

const readContext = async () => {
  const currText = await getStorageValPromise(USERCONTENTKEY);
  const currEnabled = await getStorageValPromise(EXTENSIONENABLED);
  editor.setText("");
  editor.setText(currText);
  if (!currEnabled) {
    // have the state be unchecked
    $("#toggle-extension").prop("checked", false);
  }
};

const toggleExtension = async (e) => {
  const $this = $(e.currentTarget);
  if ($this.prop("checked")) {
    chrome.storage.sync.set({ [EXTENSIONENABLED]: true });
    console.log(await getStorageValPromise(EXTENSIONENABLED));
  } else {
    chrome.storage.sync.set({ [EXTENSIONENABLED]: false });
    console.log(await getStorageValPromise(EXTENSIONENABLED));
  }
};

$(() => {
  initializePopup();

  $("#clear-button").on("click", () => {
    chrome.storage.sync.set(
      {
        [USERCONTENTKEY]: "",
      },
      () => {
        if (chrome.runtime.error) {
          console.error("unable to clear content");
        }
      }
    );
    editor.setContents([]);
  });

  $("#copy-button").on("click", async () => {
    const text = await getStorageValPromise(USERCONTENTKEY);
    navigator.clipboard.writeText(text);
  });

  $("#toggle-extension").on("change", toggleExtension);

  chrome.storage.onChanged.addListener(async () => {
    const curr = await getStorageValPromise(USERCONTENTKEY);
    editor.setText("");
    editor.setText(curr);
  });
});

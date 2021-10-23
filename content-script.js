const USERCONTENTKEY = "saved-content";
let prevSelected = "";

const getStorageValPromise = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (res) => {
      resolve(res[USERCONTENTKEY] === undefined ? "" : res[USERCONTENTKEY]);
    });
  });
};

const copyText = async (e) => {
  let selected = window.getSelection().toString();
  if (selected === "") {
    return;
  }
  selected = selected.trim();
  let previous;
  previous = await getStorageValPromise(USERCONTENTKEY);
  const newContent = previous + selected + "\n";
  chrome.storage.sync.set({
    [USERCONTENTKEY]: newContent,
  });
  let curr;
  curr = await getStorageValPromise(USERCONTENTKEY);
  closeTooltip(e, true);
};

const closeTooltip = (e, forceClose = false) => {
  // prevent closeTooltip from happening with the copy button
  // until AFTER the copyText function is done running)
  if (e.target.id === "copy-button" && !forceClose) {
    return;
  }
  $("#copy-tooltip").remove();
};

const createTooltip = (e) => {
  const selected = window.getSelection().toString();
  // if there is no selected text, dont add anything to the doc
  if (selected === "" || prevSelected === selected) {
    return;
  }
  prevSelected = selected;
  const xAxis = e.pageX;
  const yAxis = e.pageY;
  const copyButton = $("<button/>", {
    id: "copy-button",
    text: "Copy",
    click: copyText,
  });
  const closeButton = $("<button/>", {
    id: "close-button",
    text: "Close",
    click: closeTooltip,
  });
  const copyTooltip = $("<div>").css({
    position: "absolute",
    left: `${xAxis}px`,
    top: `${yAxis}px`,
  });
  copyTooltip.attr("id", "copy-tooltip");
  copyTooltip.append(copyButton);
  copyTooltip.append(closeButton);
  $("body").append(copyTooltip);
  console.log("created tooltip");
  return;
};

document.addEventListener("mouseup", createTooltip);
document.addEventListener("mousedown", closeTooltip);

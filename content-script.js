let prevSelected = "";

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

const createTooltip = async (e) => {
  // if extension toggle is off, dont create tooltip
  console.log("creating tooltip...");
  const extensionEnabled = await getStorageValPromise(EXTENSIONENABLED);
  console.log(extensionEnabled);
  if (!extensionEnabled) {
    console.log("returning ");
    return;
  }
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
  return;
};

document.addEventListener("mouseup", createTooltip);
document.addEventListener("mousedown", closeTooltip);

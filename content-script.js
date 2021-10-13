let prevSelected = "";

const copyText = () => {
  const selected = window.getSelection().toString();
  if (selected === "") {
    return;
  }
};

const closeTooltip = () => {
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
  return;
};
document.addEventListener("mouseup", createTooltip);
document.addEventListener("mousedown", closeTooltip);

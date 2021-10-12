const grabSelected = (e) => {
  const selected = window.getSelection().toString();
  // if there is no selected text, dont add anything to the doc
  if (selected === "") {
    return;
  }
  const xAxis = e.pageX;
  const yAxis = e.pageY;
  console.log(`x axis is ${xAxis}`);
  console.log(`y axis is ${yAxis}`);
  const copyButton = $('<button id="copy-button">Copy<button/>');
  const closeButton = $('<button id="close-button">Close<button/>');
  const copyTooltip = $("<div id=copy-tooltip>").css({
    left: `${xAxis} px`,
    top: `${yAxis} px`,
  });
  copyTooltip.append(copyButton);
  copyTooltip.append(closeButton);
  copyTooltip.appendTo("body");
  // copyTooltip.appendTo(document.body);
  // const copyTooltip = document.createElement("div");

  console.log(`selected text is ${selected}`);
  return;
};
document.addEventListener("mouseup", grabSelected);

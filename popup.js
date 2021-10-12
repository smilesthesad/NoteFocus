let editor;
const options = {
  theme: "snow",
};
setTimeout(() => {
  editor = new Quill("#editor", { theme: "snow" });
  console.log("editor started");
});

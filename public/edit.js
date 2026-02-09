(function () {
    const editorRoot = document.getElementById("editor");
    const editedHtmlInput = document.getElementById("editedHtml");
    const generatedHtmlTextarea = document.getElementById("generatedHtml");
  
    if (!editorRoot || !editedHtmlInput || !generatedHtmlTextarea) return;
  
    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });
  
    // Load initial HTML:
    // Prefer editedHtml if present, otherwise use generatedHtml
    const initialEdited = (editedHtmlInput.value || "").trim();
    const initialGenerated = (generatedHtmlTextarea.value || "").trim();
    const initialHtml = initialEdited || initialGenerated || "";
  
    if (initialHtml) {
      quill.clipboard.dangerouslyPasteHTML(initialHtml);
    }
  
    function syncEditedHtml() {
      const html = editorRoot.querySelector(".ql-editor").innerHTML;
      editedHtmlInput.value = html;
    }
  
    syncEditedHtml();
    quill.on("text-change", syncEditedHtml);
  })();
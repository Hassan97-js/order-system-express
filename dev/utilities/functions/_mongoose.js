async function saveDocument(document) {
  if (document.isNew) {
    await document.save(() => {
      document.isNew = false;
    });
  }
}

module.exports = { saveDocument };

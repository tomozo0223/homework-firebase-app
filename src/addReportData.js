export const addReportData = async (e, addDoc, collection, db) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment")
    });
  } catch (e) {
    console.error("Error :", e);
  }
}

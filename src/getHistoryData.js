export const getHistoryData = async (getDocs, collection, db) => {

  let report = "";
  const querySnapShot = await getDocs(collection(db, "reports"));
  querySnapShot.forEach((doc) => {
    let date = doc.data().date.toDate().toLocaleString('ja-JP', { dateStyle: 'short', timeStyle: 'short' });
    report += `<tr><td>${date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
  });

  document.getElementById("js-history").innerHTML = report;
};

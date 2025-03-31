// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_I
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const getHistoryData = async () => {

  let report = "";
  const querySnapShot = await getDocs(collection(db, "reports"));
  querySnapShot.forEach((doc) => {
    let date = doc.data().date.toDate().toLocaleString('ja-JP', { dateStyle: 'short', timeStyle: 'short' });
    report += `<tr><td>${date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
  });

  document.getElementById("js-history").innerHTML = report;
};

if (document.getElementById("js-history")) {
  getHistoryData();
}


const addReportData = async (e) => {
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


if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => addReportData(e));
}

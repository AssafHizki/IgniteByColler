// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbKX3NEcc--2UhuyMMmE4XnEdvlXKpQn8",
    authDomain: "ignite-49640.firebaseapp.com",
    projectId: "ignite-49640",
    storageBucket: "ignite-49640.appspot.com",
    messagingSenderId: "715707641412",
    appId: "1:715707641412:web:9aa331151a7b30ecffd611",
    measurementId: "G-VHB8BK3JLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };

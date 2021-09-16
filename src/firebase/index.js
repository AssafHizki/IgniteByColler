import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBbKX3NEcc--2UhuyMMmE4XnEdvlXKpQn8",
    authDomain: "ignite-49640.firebaseapp.com",
    projectId: "ignite-49640",
    storageBucket: "ignite-49640.appspot.com",
    messagingSenderId: "715707641412",
    appId: "1:715707641412:web:9aa331151a7b30ecffd611",
    measurementId: "G-VHB8BK3JLW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics();
const auth = getAuth(app);

export { db, analytics, auth };

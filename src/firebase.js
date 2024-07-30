import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 填入 Firebase 配置
  apiKey: "AIzaSyD36jb-Ll5Z_oWQ5VddETX8NSNd4f2SYuc",
  authDomain: "worldtracker-cd84f.firebaseapp.com",
  projectId: "worldtracker-cd84f",
  storageBucket: "worldtracker-cd84f.appspot.com",
  messagingSenderId: "19154684959",
  appId: "1:19154684959:web:4f293d831b24d8340e992a",
  measurementId: "G-NP0BLGH22Z",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

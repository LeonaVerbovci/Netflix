import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcXlWdesS3XCXfNUICmF3ZDAlyIpT-aJU",
  authDomain: "netflix-clone-7ba2e.firebaseapp.com",
  projectId: "netflix-clone-7ba2e",
  storageBucket: "netflix-clone-7ba2e.appspot.com",
  messagingSenderId: "30783096065",
  appId: "1:30783096065:web:2d75755f823139ca07c700",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);

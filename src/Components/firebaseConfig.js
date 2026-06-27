import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXiSyQF9Wz8Q8nBrdXKswd82zIL4eQT50",
  authDomain: "netflix-clone-59343.firebaseapp.com",
  projectId: "netflix-clone-59343",
  storageBucket: "netflix-clone-59343.firebasestorage.app",
  messagingSenderId: "361014745641",
  appId: "1:361014745641:web:fdfa464643d51d07e41a38",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;





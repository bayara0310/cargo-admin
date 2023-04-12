import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB-s9BE5zPUVOsxqSu20Kxb0S-gRtH43FM",
    authDomain: "all-cargo-1d49d.firebaseapp.com",
    projectId: "all-cargo-1d49d",
    storageBucket: "all-cargo-1d49d.appspot.com",
    messagingSenderId: "254188448459",
    appId: "1:254188448459:web:c19bbeaf18183f502f894e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
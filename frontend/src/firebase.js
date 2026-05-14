import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

    apiKey:
        "AIzaSyASF63jj0Mbuz2_ahH0qcbVW_bS_v2fmP0",

    authDomain:
        "smart-retail-system-4c517.firebaseapp.com",

    projectId:
        "smart-retail-system-4c517",

    storageBucket:
        "smart-retail-system-4c517.firebasestorage.app",

    messagingSenderId:
        "148183247222",

    appId:
        "1:148183247222:web:8e3ad8881555950167f257"

};

const app =
    initializeApp(firebaseConfig);

export const auth =
    getAuth(app);

export const provider =
    new GoogleAuthProvider();
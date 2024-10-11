import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBocBTWxQRnx0swNZPAb6pK16ZN4H8UkJc",
  authDomain: "chat-app-gs-29175.firebaseapp.com",
  projectId: "chat-app-gs-29175",
  storageBucket: "chat-app-gs-29175.appspot.com",
  messagingSenderId: "641654027600",
  appId: "1:641654027600:web:9d430043579b284f8be855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There I am useing chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData:[]
        })
    } catch(error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

export {signup, login, logout, auth, db}
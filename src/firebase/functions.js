import { db, auth } from './index';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from 'firebase/firestore/lite';

const createUser = async (data) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            return setDoc(doc(db, 'users', userCredential.user.uid), { ...data, id: userCredential.user.uid })
                .then(() => { return true })
        })
        .catch((error) => {
            console.log("err: ", error.message);
            return false;
        });
}

const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return getUser(userCredential.user.uid)
        })
        .catch(e => { console.log("Error: ", e); return false })
}

const logOut = async () => {
    return signOut(auth)
        .then(() => {
            return true;
        })
        .catch(e => { console.log("Error: ", e); return false })
}

const getUser = async (id) => {
    if (!id) {
        return false;
    }
    return getDoc(doc(db, 'users', id))
        .then(userDoc => { if (userDoc.exists) { return userDoc.data() } return false; })
        .catch(e => { console.log("E: ", e); return false; })
}

export { createUser, signIn, getUser, logOut }
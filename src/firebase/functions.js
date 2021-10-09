import { db, auth } from './index';
import {
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
    updatePassword, updateEmail
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';

const createUser = async (data) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            delete data.password;
            delete data.email;

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

const updateUser = async (props) => {
    if (!props) {
        return false;
    }

    return updateDoc(doc(db, 'users', auth.currentUser.uid), { ...props })
        .then(() => logOut())
        .catch(e => { console.log("E: ", e); return false; })
}

const updateUserAuth = async (email = null, password = null) => {
    if (!email && !password) {
        return false;
    }

    let promises = [];

    if (email) {
        promises.push(updateEmail(auth.currentUser, email));
    }

    if (password) {
        promises.push(updatePassword(auth.currentUser, password));
    }

    return Promise.all(promises)
        .catch(e => { console.log("E: ", e); return false; })
}

export { createUser, signIn, getUser, logOut, updateUser, updateUserAuth }
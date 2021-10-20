import { db, auth } from './index';
import {
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
    updatePassword, updateEmail
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, collectionGroup, getDocs } from 'firebase/firestore/lite';

// For the full list of FireStore commands see:
// https://firebase.google.com/docs/reference/js/firestore_lite

const createUser = async (data) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            delete data.password;

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
        .then(() => { return true; })
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

const getData = async () => {
    let arr = [];

    return getDocs(collectionGroup(db, 'users'))
        .then(col => {
            if (!col.empty) {
                col.docs.forEach(userDoc => {
                    arr.push(userDoc.data())
                })
            }
            console.log(arr)
            return arr;
        })
        .catch(e => { console.log("E: ", e); return false; })
}


export { createUser, signIn, getUser, logOut, updateUser, updateUserAuth, getData }
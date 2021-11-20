import { db, auth } from './index';
import {
    signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
    updatePassword, updateEmail, sendPasswordResetEmail, sendEmailVerification,
    deleteUser
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc, collectionGroup, getDocs, deleteDoc } from 'firebase/firestore/lite';

// For the full list of FireStore commands see:
// https://firebase.google.com/docs/reference/js/firestore_lite

const createUser = async (data) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            delete data.password;

            return setDoc(doc(db, 'users', userCredential.user.uid), { ...data, id: userCredential.user.uid })
                .then(() => {
                    sendEmailVerification(auth.currentUser);
                    auth.signOut();
                    return true
                })
        })
}

const deleteCurrUser = async () => {
    return getDoc(doc(db, 'users', auth.currentUser.uid))
        .then(userDoc => {
            if (!userDoc.exists) { return false; }

            return setDoc(doc(db, "deleted-users", auth.currentUser.uid), { ...userDoc.data() })
                .then(() => { return deleteUser(auth.currentUser) })
                .then(() => { return deleteDoc(doc(db, 'users', auth.currentUser.uid)) })
                .then(() => logOut());
        })
        .catch(e => { console.log("E: ", e); return false; })
}

const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            if (!userCredential.user.emailVerified) {
                sendEmailVerification(auth.currentUser);
                throw new Error("Email not verified");
            }
            return getUser(userCredential.user.uid)
        })
        .catch(e => {
            if (e.message === "Email not verified") { throw e }
            console.log("Error: ", e);
            return false
        })
}

const resetPassword = async (email) => {
    if (!email) {
        return false;
    }

    return sendPasswordResetEmail(auth, email)
        .then(() => { return true })
        .catch(error => {
            console.log(error)
            return false;
        })
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

const updateRemoteUserContacts = async (remoteUserID) => {
    if (!remoteUserID) {
        return false;
    }

    return getDoc(doc(db, 'users', remoteUserID))
        .then(userDoc => {
            if (!userDoc.exists) { return false; }
            let remoteData = userDoc.data();
            let contacts = { "addressedMe": [auth.currentUser.uid] }

            if (remoteData && remoteData.contacts && remoteData.contacts.addressedMe) {
                contacts.addressedMe = [...remoteData.contacts.addressedMe, auth.currentUser.uid];
            }
            if (remoteData && remoteData.contacts && remoteData.contacts.myContacts) {
                contacts.MyContacts = remoteData.contacts.myContacts;
            }


            return updateDoc(doc(db, 'users', remoteUserID), {
                contacts
            })
                .then(() => { return true; })
                .catch(e => { console.log("E: ", e); return false; })
        })
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
            return arr;
        })
        .catch(e => { console.log("E: ", e); return false; })
}

const getUsersByIDs = async (IDs) => {
    let arr = [];

    return getDocs(collectionGroup(db, 'users'))
        .then(col => {
            if (!col.empty) {
                col.docs.forEach(userDoc => {
                    if (IDs.includes(userDoc.id)) {
                        arr.push(userDoc.data())
                    }
                })
            }
            return arr;
        })
        .catch(e => { console.log("E: ", e); return false; })
}
export {
    createUser, signIn, resetPassword, getUser, logOut, updateUser, updateRemoteUserContacts,
    updateUserAuth, getData, getUsersByIDs, deleteCurrUser
}
import InitiateFirebase from "./InitiateFirebase"
import { ref, set, push, onValue, off, update, remove, child } from 'firebase/database'
import { ref as storage_ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
// eslint-disable-next-line
import { collection, addDoc, getDocs } from "firebase/firestore"

class ManageDb {
    constructor(user, currentFolder = [], fileName = '') {
        this.db = InitiateFirebase()
        this.storage = InitiateFirebase('storage')
        this.firestore = InitiateFirebase('firestore')
        this.ref = ref(this.db, `Users/${user}/${currentFolder.join('/')}`)
        this.storage_ref = storage_ref(this.storage, `Users/${user}/${currentFolder.join('/')}/${fileName}`)
    }

    getUserRef() {
        return this.ref
    }

    getStorageRef() {
        return this.storage_ref
    }
    
    setInUser(content = {}) {
        return set(push(this.getUserRef()), content)
    }

    startUploadBytesResumable(file) {
        return uploadBytesResumable(this.getStorageRef(), file)
    }

    getDownload(ref) {
        return getDownloadURL(ref)
    }

    // must instantiate current folder and user in class constructor
    read(fn = () => {}) {
        onValue(this.getUserRef(), fn)
    }

    stopReading() {
        off(this.getUserRef())
    }

    updateKey(key, file = {}) {
        update(child(this.getUserRef(), key), file)
    }

    // return a promise
    deleteFile() {
        return deleteObject(this.getStorageRef())
    }

    removeRef(key) {
        return remove(child(this.getUserRef(), key))
    }

    // firestore
    setInCollection(user, data) {
        return new Promise((resolve, reject) => {
            try {
                const docRef = addDoc(collection(this.firestore, `Users/${user}`), data)
                resolve(docRef)
            } catch (error) {
                reject(error)
            }
        })
    }

    readInCollection(user) {
        let docs = []
        return new Promise((resolve, reject) => {
            const snapshot = getDocs(collection(this.firestore, `Users/${user}`))
            try {
                snapshot.forEach(doc => {
                    docs.push(doc)
                })
                resolve(docs)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default ManageDb
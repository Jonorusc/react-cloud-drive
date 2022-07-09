import InitiateFirebase from "./InitiateFirebase"
// eslint-disable-next-line
import { ref, set, get, push, onValue, off, update, remove, child } from 'firebase/database'
// eslint-disable-next-line
import { ref as storage_ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL, deleteObject, listAll, list } from 'firebase/storage'

class ManageDb {
    constructor(user, currentFolder = [], fileName = '') {
        this.db = InitiateFirebase()
        this.storage = InitiateFirebase('storage')
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
}

export default ManageDb
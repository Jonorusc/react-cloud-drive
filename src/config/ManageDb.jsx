import InitiateFirebase from "./InitiateFirebase"
// eslint-disable-next-line
import { ref, set, get, push, onValue, off, update, remove, child } from 'firebase/database'

class ManageDb {
    constructor(user, currentFolder = []) {
        this.db = InitiateFirebase()
        this.ref = ref(this.db, 'Users/' + user + '/' + currentFolder.join('/'))
    }

    getUserRef() {
        return this.ref
    }
    
    setInUser(content = {}) {
        return set(push(this.getUserRef()), content)
    }
}

export default ManageDb
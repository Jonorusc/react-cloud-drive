import InitiateFirebase from "../config/InitiateFirebase"
import { doc, setDoc, getDoc  } from "firebase/firestore"

export default async function Firestore(which = 'set', user, file = {}) {
    const db = InitiateFirebase('firestore')
    // eslint-disable-next-line
    switch(which) {
        case 'set':
            return await setDoc(doc(db, "Users", user), file)
        case 'get':
            const docSnap = await getDoc(doc(db, "Users", user))
            return docSnap.data()
    }
}
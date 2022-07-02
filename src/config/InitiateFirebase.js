import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const InitiateFirebase = () => {
    const firebaseConfig = {
        // your project firebase settings
    },
    app = initializeApp(firebaseConfig)
    return getDatabase(app)
}

export default InitiateFirebase
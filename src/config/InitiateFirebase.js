import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage"

const InitiateFirebase = (which = 'realtime') => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        databaseURL: process.env.REACT_APP_DATABASEURL,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
    },
    app = initializeApp(firebaseConfig)
    switch(which) {
        case 'storage': 
            return getStorage(app)
        case 'realtime': 
            return getDatabase(app)
        default: return 
    } 
}

export default InitiateFirebase
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage"

const InitiateFirebase = (which = 'realtime') => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: 'cloud-drive-e1991.firebaseapp.com',
        databaseURL: 'https://cloud-drive-e1991-default-rtdb.firebaseio.com',
        projectId: 'cloud-drive-e1991',
        storageBucket: 'cloud-drive-e1991.appspot.com',
        messagingSenderId: '652680835499',
        appId: '1:652680835499:web:80bc65e74ce48657d822ee',
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
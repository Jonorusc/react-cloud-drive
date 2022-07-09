import ManageDb from "../config/ManageDb"

class itemsOptions {
    constructor(db, keys, folderListener, excluded) {
        this.keys = keys
        this.db = db
        this.excluded = excluded
        this.folderListener = folderListener
        this._data = []
    }

    restoreOrToTrash(keys = this.keys) {
        let current, promises = []

        keys.forEach(key => {
            promises.push(new Promise((resolve, reject) => {
                current = this.folderListener.find(item => {
                    return (item.key === key) ? item : null
                })
                let file = current.data 
                file.excluded = this.excluded
                // check contentType
                if(file.type === 'folder') {
                    this.restoreOrToTrashFolder(this.db.user, this.db.currentFolder)
                    .then(() => {
                        resolve({
                            message: 'Success',
                            data: file
                        })
                    }).catch(err => {
                        reject({
                            message: err
                        })
                    })
                } else if(file.type === 'file') {
                    const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
                    manageDb.updateKey(key, file)
                    resolve({
                        message: 'Success',
                        data: file
                    })
                }
            }))
        })
        return Promise.all(promises)
    }
    
    restoreOrToTrashFolder(user, folder) {
        const manageDb = new ManageDb(user, folder)

        return new Promise((resolve, reject) => {
            manageDb.read(snapshot => {
                manageDb.stopReading()
                snapshot.forEach(item => {
                    let data = item.val(),
                        key = item.key
                    
                    if(data.type === 'folder') {
                        data.excluded = this.excluded
                        manageDb.updateKey(key, data)
                        let tempFolder = folder 
                        tempFolder.push(data.name)
                        this.restoreOrToTrashFolder(user, tempFolder)
                        .then(() => {
                            resolve({
                                message: 'Success',
                                data,
                            })
                        }).catch(err => {
                            reject({
                                message: err
                            })
                        })
                    } else if(data.type === 'file'){
                        data.excluded = this.excluded
                        manageDb.updateKey(key, data)
                        resolve({
                            message: 'Success',
                            data,
                        })
                    }
                })
            })
        })
    }

    deleteOptions() {

    }
}

export default itemsOptions

/*
if(current.data.type === 'folder') {
    // search for folder name
    let folder = this.folderListener.find(item => {
        return (item.key === current.data.name) ? item : null
    })
    // all content from folder is in object 'folder.data'
    Object.values(folder.data).forEach(folderData => {
        const folderObjArray = Object.entries(folderData)
        console.log('foldr', folderData)
        // store in this._data what i'll use
        // letting any folder pass because if there is another folder a recursion will be done further down
        if(Object.entries(folderData)[0][0].indexOf('-') === -1)  // isn't a folder so push a file to data
            this._data.push(folderData)
        
        let keys = []
        folderObjArray.forEach(([key, value]) => {
            // now i have the key from another folder inside the folder and again, again...
            // but i just want firebase key which start with ' -... ' 
            // check if the key starts with - if true let's proceed with a recursion 
            if(key.indexOf('-') === 0) {
                keys.push(key)
                console.log(key)
                // this.restoreAndTrash(keys)
            } else {
                resolve({
                    message: 'success',
                    data: this._data,
                })
            }
        })
        // this.restoreAndTrash()
    })
} 
*/
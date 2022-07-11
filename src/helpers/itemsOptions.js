import ManageDb from "../config/ManageDb"

class itemsOptions {
    constructor(db, folderListener = [], excluded = false) {
        this.db = db
        this.excluded = excluded
        this.folderListener = folderListener
        this._data = []
        this.restoreOrToTrash = this.restoreOrToTrash.bind(this)
        this.readTrashedItems = this.readTrashedItems.bind(this)
    }

    readAllowedItems() {
        this._data = []
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
        manageDb.read(snapshot => {
            snapshot.forEach(item => {
                if(!item.val().excluded && item.val().name) {
                    this._data.push({
                        key: item.key,
                        data: item.val(),
                    })
                }
            })
        })
        return this._data.sort((a,b) => {
            return (a.data.type && b.data.type) === 'folder' ? 1 : -1
        })
    }

    readTrashedItems() {
        this._data = []
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
        manageDb.read(snapshot => {
            snapshot.forEach(item => {
                if(item?.val().name && item?.val().excluded) {
                    this._data.push({
                        key: item.key,
                        data: item?.val(),
                    })
                }
            })
        })
        return this._data.sort((a,b) => {
            return (a.data?.type && b.data.type) === 'folder' ? 1 : -1
        })
    }

    restoreOrToTrash(keys) {
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
        let current, promises = []

        keys.forEach(key => {
            promises.push(new Promise((resolve, reject) => {
                current = this.folderListener.find(item => {
                    return (item.key === key) ? item : null
                })
                let file = current.data 
                file.excluded = this.excluded
                manageDb.updateKey(key, file)
                // check contentType
                if(file.type === 'folder') {
                    // read and search for more files or folders
                    manageDb.read(snapshot => {
                        snapshot.forEach(folderData => {
                            // in this folder have another folder inside?
                            if(folderData.val().type === 'folder') {
                                let tempFolder = this.db.currentFolder
                                tempFolder.push(file.name)
                                this.searchForFiles(tempFolder).then(() => {
                                    resolve({
                                        message: 'Success',
                                    })
                                }).catch(error => {
                                    reject({
                                        message: error
                                    })
                                })
                                // if false return success
                            } else {
                                resolve({
                                    message: 'Success',
                                })
                            }
                        })
                    })
                } else if(file.type === 'file') {
                    resolve({
                        message: 'Success',
                    })
                }
            }))
        })
        return Promise.all(promises)
    }

    searchForFiles(folder) {
        const folderData = new ManageDb(this.db.user, folder)
        return new Promise((resolve, reject) => {
            folderData.read(snapshot => {
                // folderData.stopReading()
                snapshot.forEach(folderFile => {
                    let file = folderFile.val(), 
                        key = folderFile.key
                    
                    if(file.name) {
                        file.excluded = this.excluded
                        folderData.updateKey(key, file)
                        if(file.type === 'folder') {
                            let tempFolder = folder
                            tempFolder.push(file.name)
                            this.searchForFiles(tempFolder).then(() => {
                                resolve({
                                    message: 'Success',
                                })
                            }).catch(error => {
                                reject({
                                    message: error
                                })
                            })
                        } else {
                            resolve({
                                message: 'Success',
                            })
                        }
                    } 
                })
            })
        })
    }
    
    rename(newName, keys) {
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
        let promises = [], current
        
        keys.forEach(key => {
            promises.push(new Promise((resolve, reject) => {
                current = this.folderListener.find(item => {
                    return (item.key === key) ? item : null
                })
                let file = current.data 
                if(file.type === 'folder') {
                    /* 
                    'item.key' is a reference to the folder inside firebase
                    i saved it for later use when renaming the folder 
                    after renaming the folder it is necessary to rename its reference too, 
                    otherwise it will be the same as having created a new folder
                    */
                    
                    manageDb.read(snapshot => {
                        manageDb.stopReading()
                        snapshot.forEach(item => {
                            // check if file.name is equal to item.key if true let's get the data and create a new reference with the new name
                            if(item.key === file.name) {
                                let tempFolder = this.db.currentFolder
                                tempFolder.push(newName)
                                Object.values(item.val()).forEach(folderFile => {
                                    // create a item file
                                    let itemFile = {}
                                    if(folderFile.type === 'folder') {
                                        itemFile = {
                                            name: folderFile.name.toString(),
                                            type: 'folder',
                                            filepath: tempFolder.join('/'),
                                            excluded: false,
                                        }
                                    } else if(folderFile.type === 'file') {
                                        itemFile = {
                                            name: folderFile.name.toString(),
                                            type: 'file',
                                            size: folderFile.size,
                                            downloadURL: folderFile.downloadURL,
                                            fullPath: folderFile.fullPath,
                                            preview: folderFile.preview,
                                            contentType: folderFile.contentType,
                                            timeCreated: folderFile.timeCreated,
                                            updated: folderFile.updated,
                                            excluded: false,
                                        }
                                    }
                                    
                                    new ManageDb(this.db.user, tempFolder)
                                    .setInUser(itemFile).then(() => {
                                        resolve({
                                            message: 'Success',
                                            currentFolder: newName,
                                            currentFile: '',
                                            data: folderFile,
                                        })
                                    })
                                    .catch((err) => {
                                        reject()
                                    })
                                })  
                            }
                        })
                        // remove old ref
                        manageDb.removeRef(file.name)
                    })
                    // folder reference file 
                    file.name = newName
                    manageDb.updateKey(key, file)
                } else if(file.type === 'file') {
                    file.name = newName
                    manageDb.updateKey(key, file)
                    resolve({
                        message: 'Success',
                        currentFolder: this.db.currentFolder,
                        currentFile: newName,
                        data: file,
                    })
                }
            }))
        })

        return Promise.all(promises)
    }

    delete(keys) {
        let promises = [], current
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)

        keys.forEach(key => {
            promises.push(new Promise((resolve, reject) => {
                current = this.folderListener.find(item => {
                    return (item.key === key) ? item : null
                })
                if(current.data.type === 'folder') {
                    // here i've to remove all content what is in this folder from the realtime database as well as in the storage
                    manageDb.read(snapshot => {
                        snapshot.forEach(folderData => {
                            if(folderData.val().excluded) {
                                if(folderData.val().type === 'folder') {
                                    let tempFolder = this.db.currentFolder
                                    tempFolder.push(folderData.val().name)
                                    this.deleteInside(tempFolder).then(() => {
                                        manageDb.removeRef(folderData.val().name) //remove the folder ref data, like: local: key = name
                                        manageDb.removeRef(key) //remove the folder ref, like: local: folder -> key: -N.... -> name
                                        resolve({ message: 'success' })
                                    }).catch(err => {
                                        reject(err)
                                    })
                                } 
                            }
                        })
                    })
                    
                } else if(current.data.type === 'file') {
                    const tempFolder = current.data.fullPath.split('/')
                    const file = new ManageDb(this.db.user, tempFolder, current.data.storageName)
                    file.deleteFile().then(() => {
                        file.removeRef(key)
                        resolve({
                            message: 'Success'
                        })
                    }).catch(err => {
                        reject(err)
                    })
                }
            }))
        })

        return Promise.all(promises)
    }

    deleteInside(folder = []) {
        const manageDb = new ManageDb(this.db.user, this.db.currentFolder)
        return new Promise((resolve, reject) => {
            manageDb.read(snapshot => {
                snapshot.forEach(folderData => {
                    if(folderData.val().excluded) {
                        if(folderData.val().type === 'folder') {
                            let tempFolder = this.db.currentFolder
                            tempFolder.push(folderData.val().name)
                            this.deleteInside(tempFolder).then(() => {
                                resolve({ message: 'success' })
                            }).catch(err => {
                                reject(err)
                            })
                        } else if(folderData.val().type === 'file') {
                            const tempFolder = folderData.val().fullPath.split('/')
                            const file = new ManageDb(this.db.user, tempFolder, folderData.val().storageName)
                            file.deleteFile().then(() => {
                                file.removeRef(folderData.key)
                                resolve({
                                    message: 'Success'
                                })
                            }).catch(err => {
                                reject(err)
                            })
                        }
                    }
                })
            })
        })
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
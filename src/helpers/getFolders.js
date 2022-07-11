import ManageDb from "../config/ManageDb";

export default function getFolders(dbUser, folder = []) {
    let files = []
    const manageDb =  new ManageDb(dbUser, folder)
    manageDb.read(snapshot => {
        snapshot.forEach(item => {
            let file = item.val()
            
            if(file.name) {
                if(file.type === 'folder' && !file.excluded) {
                    files.push(file.name)
                }
            }
        })
    })
    return files
}
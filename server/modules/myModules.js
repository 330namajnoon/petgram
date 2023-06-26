function createNewUnikID(data, length) {
    let newID = "PG";
    let cs = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz0123456789";
    let t = true;
    while (t) {
        let id = newID;
        for (let index = 0; index < length - 2; index++) {
            id += cs.charAt(Math.floor(Math.random() * cs.length));
        }
        let f = data.find(d => d.id == id);
        if (!f) {
            newID = id;
            t = false;
        }
    }
    return newID;
}

exports.createNewUnikID = createNewUnikID;
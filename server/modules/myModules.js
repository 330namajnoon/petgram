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

function crateNewStoryID(length = 10,nl = 4) {
    let n = length;
    let len = 0;
    while(length >= 1) {
       length /= 10;
       len++;
    }
    let res = "";
    for (let i = 0; i < nl - len; i++) {
      res += "0";
    }
    res += n;
    return (res);
}
exports.crateNewStoryID = crateNewStoryID;
exports.createNewUnikID = createNewUnikID;
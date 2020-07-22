function hbsFix(docs) {
    const arr = docs.map(document => {
        const obj = {};
        for (let key in document) {
            obj[key] = document[key];
        }
        return obj;
    })
    return arr;
}

module.exports = { hbsFix }
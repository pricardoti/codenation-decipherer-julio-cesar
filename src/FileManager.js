const fs = require('fs');

module.exports = {
    save(name, data) {
        fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
            if (err) throw err;
            return data;
        });
    },

    readStream(name) {
        return fs.createReadStream(`${name}.json`, err => {
            if (err) throw err;
            return data;
        });
    }
};
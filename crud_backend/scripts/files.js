const fs = require('fs');
const fsPromise = require('fs/promises');

class FileHelper {
    constructor() {}

    async deleteFile(path) {
        try {
            const resp = await fsPromise.unlink(path);
            console.log('successfully deleted /tmp/hello');
            return resp;
        } catch (error) {
            console.error('there was an error:', error.message);
            throw new Error(error.message);
        }
    }

    async openFile(path) {
        let filehandle;
        try {
            filehandle = await fsPromise.open(path, 'r');
            return filehandle;
        } finally {
            await filehandle?.close();
        }
    }

    async readViaStream(path) {
        let reader = fs.createReadStream(path);

        reader.on('data', function (chunk) {
            console.log(chunk.toString());
        });
    }

    async fileWatcher() {}
}

module.exports = new FileHelper();

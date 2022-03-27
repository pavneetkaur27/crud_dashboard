const FileHelper = require('./files');

async function deleteFile() {
    try {
        const resp = await FileHelper.deleteFile('a.txt');
        console.log(resp);
    } catch (err) {
        console.log('deleteFile err', err);
    }
}

async function openFile() {
    try {
        const resp = await FileHelper.openFile('a.txt');
        console.log(resp);
    } catch (err) {
        console.log('deleteFile err', err);
    }
}
async function readViaStream() {
    try {
        await FileHelper.readViaStream('a.txt');
    } catch (err) {
        console.log('deleteFile err', err);
    }
}

readViaStream();

module.exports = {
    deleteFile,
    openFile,
    readViaStream,
};

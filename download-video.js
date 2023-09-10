const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

async function downloadVideo(videoUrl, folderName, fileName) {
    const outputPath = path.join(folderName, `${fileName}.mp4`);

    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    const videoStream = ytdl(videoUrl, { quality: 'highest' });
    const writeStream = fs.createWriteStream(outputPath);

    return new Promise((resolve, reject) => {
        videoStream.pipe(writeStream);
        writeStream.on('end', () => {
            console.log(`video downloaded to ${outputPath}`);
            resolve(outputPath);
        });
        writeStream.on('error', () => {
            console.error(`error writing video to disk`);
            reject();
        } );
    })
}

module.exports = { downloadVideo };




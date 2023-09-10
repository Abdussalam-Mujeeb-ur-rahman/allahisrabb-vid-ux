const { execFile } = require('youtube-dl-exec')
const fs = require('fs');




async function download_video(videoUrl, folderName) {
    if (videoUrl && folderName) {
        try {
          const options = {
            url: videoUrl,
            output: `${folderName}/%(title)s.%(ext)s`, // Define the output filename
          };
    
          console.log('Download started');
    
          // Execute the download
          await exec(options);
    
          console.log('Finished downloading!');
        } catch (error) {
          console.error('Error:', error.message);
        }
      } else {
        console.error('Both videoUrl and folderName must be provided.');
      }

}

module.exports = { download_video }
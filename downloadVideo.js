const fs = require("fs");
const child_process = require("child_process");
const { exec } = require("youtube-dl-exec");
const colors = require("colors");

// Function to download a video
async function downloadVideo(url, output) {
  try {
    // Check if Python is installed in Termux
    const pythonCheck = await new Promise((resolve) => {
      child_process.exec("python --version", (error, stdout, stderr) => {
        if (error) {
          resolve(false); // Python is not installed
        } else {
          resolve(true); // Python is installed
        }
      });
    });

    if (!pythonCheck) {
      // Python is not installed, prompt the user to install it
      console.error("Python is not installed on your system.".red);
      console.log("Please install Python before using this tool.".yellow);

      // You can provide installation instructions here based on the user's OS
      // For example, for Linux, you can suggest using the package manager:
      console.log("To install Python on Linux, you can run:");
      console.log("sudo apt-get install python3".purple);

      // For Windows, you can suggest downloading from the official website:
      console.log("To install Python on Windows, download it from:");
      console.log("https://www.python.org/downloads/windows/".purple);

      console.log(
        "You can install Python in Termux using the following command:"
      );
      console.log("pkg install python".purple);

      process.exit(1);
    }

    // Check if the output includes a '/'
    if (!output.includes("/") || output[output.length - 1] == "/") {
      console.error(
        "Error: The format must include both a folder name and a file name only. Example: folder_name/what_you_wish_to_name_the_video"
          .red
      );
      process.exit(1);
    }

    // Split the output path into directory and filename
    const [folder, filename] = output.split("/");

    // Check if the file already exists
    if (fs.existsSync(`${folder}/${filename}.mp4`)) {
      console.error(
        `Error: The specified file name (${filename}) already exists. Please provide a different filename for your video. exmple - ${folder}/the_file_name`
          .red
      );
      process.exit(1);
    }

    if (filename.length < 3 || folder.length < 3) {
      console.error(
        `Error: The file name and folder should contain 3 or more than 3 characters! each, The format must include both a folder name and a file name only. Example: folder_name/what_you_wish_to_name_the_video`
          .red
      );
      process.exit(1);
    }

    console.log(
      "The speed of the download depends on your internet connection".yellow
    );
    console.log(`The folder: ${folder}, The file name: ${filename}`.blue);
    console.log("Downloading video...".green);

    // Pass the URL, output directory
    await exec([url, "-o", `${folder}/${filename}.mp4`]);
    console.log("Download complete!".green);
    console.log("congratulations".orange);
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
}

module.exports = { downloadVideo };

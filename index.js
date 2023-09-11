#!/usr/bin/env node
const { program } = require("commander");
const { exec } = require("youtube-dl-exec");
const colors = require("colors");
const fs = require("fs");
const child_process = require("child_process");

program.version("1.0.0").description("A CLI tool to download YouTube videos");

program
  .command("download <url>")
  .option("-o, --output <path>", "Output directory and filename")
  .action((url, options) => {
    const { output } = options;

    if (!output) {
      console.error(
        "Error: You must provide a directory(folder and file name) for storing the video. example - video/some_name"
          .red
      );
      process.exit(1);
    }

    // Check if the output includes a '/'
    if (!output.includes("/") || output[output.length - 1] == '/') {
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

    if(filename.length < 3 || folder.length < 3) {
      console.error(
        `Error: The file name and folder should contain 3 or more than 3 characters! each, The format must include both a folder name and a file name only. Example: folder_name/what_you_wish_to_name_the_video`
          .red
      );
      process.exit(1);
    }

    console.log(`The speed of the download depends on your internet connection`.yellow);

    // Check if Python is installed
    child_process.exec("python --version", (error, stdout, stderr) => {
      if (error) {
        // Python is not installed, prompt the user to install it
        console.error("Python is not installed on your system.".red);
        console.log("Please install Python before using this tool.".yellow);

        // You can provide installation instructions here based on the user's OS
        // For example, for Linux, you can suggest using the package manager:
        console.log("To install Python on Linux, you can run:");
        console.log("sudo apt-get install python3");
        
        // For Windows, you can suggest downloading from the official website:
        console.log("To install Python on Windows, download it from:");
        console.log("https://www.python.org/downloads/windows/");

        process.exit(1);
      }

      console.log(`The folder: ${folder}, The file name: ${filename}`.blue);
      console.log("Downloading video...".green);

      // Python is installed, proceed with video download
      // Pass the URL, output directory
      exec([url, "-o", `${folder}/${filename}.mp4`])
        .then((output) => {
          console.log("Download complete!".green);
          // console.log(output);
        })
        .catch((error) => {
          console.error(`Error: ${error.message}`.red);
          process.exit(1);
        });
    });
  });

program.parse();

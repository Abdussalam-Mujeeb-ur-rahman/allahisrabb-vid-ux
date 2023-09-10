#!/usr/bin/env node
const { program } = require("commander");
const { exec } = require("youtube-dl-exec");
const colors = require("colors");
const fs = require("fs");

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
        `Error: The specified file name (${filename}) already exists. Please provide a different filename for your video. exmple - video/the_file_name`
          .red
      );
      process.exit(1);
    }

    if(filename.length < 3) {
      console.error(
        `Error: The file name (${filename}) should contain 3 or more than 3 characters!, The format must include both a folder name and a file name only. Example: folder_name/what_you_wish_to_name_the_video`
          .red
      );
      process.exit(1);
    }

    console.log("Downloading video...".green);
    console.log(`The folder: ${folder}, The file name: ${filename}` )

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

program.parse();

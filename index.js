#!/usr/bin/env node
const { program } = require("commander");
const { exec } = require("youtube-dl-exec");
const colors = require("colors");

program.version("1.0.0").description("A CLI tool to download YouTube videos");

program
  .command("download <url>")
  .option("-o, --output <path>", "Output directory and filename")
  .option("-f, --format <format>", "Video format (e.g., mp4, webm)")
  .action((url, options) => {
    const { output, format } = options;

    if (!output) {
      console.error("Error: You must provide a directory(folder and file name) for storing the video.".red);
      process.exit(1);
    }

    console.log("Downloading video...".green);

    // Split the output path into directory and filename
    const [folder, filename] = output.split("/");

    // Specify the format with the -f flag
    const formatOption = format ? ["-f", format] : [];

    // Pass the URL, output directory, and format options separately
    exec([url, ...formatOption, "-o", `${folder}/${filename}`])
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

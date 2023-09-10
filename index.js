#!/usr/bin/env node
const { program } = require("commander");
const { exec } = require("youtube-dl-exec");
const colors = require("colors");

program.version("1.0.0").description("A CLI tool to download YouTube videos");

program
  .command("download <url>")
  .option("-o, --output <path>", "Output directory and filename")
  .action((url, options) => {
    const { output } = options;
    if (!url) {
      console.error("Error: You must provide a YouTube video URL.".red);
      process.exit(1);
    }

    console.log(output);

    if (!output) {
      console.error("Error: You must provide a directory(folder and file name) for storing the video.".red);
      process.exit(1);
    }

    console.log("Downloading video...".green);

    exec(url, output)
      .then((output) => {
        console.log("Download complete!".green);
        console.log(output);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
      });
  });
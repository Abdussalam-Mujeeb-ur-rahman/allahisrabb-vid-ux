#!/usr/bin/env node
const { program } = require("commander");
const colors = require("colors");

const { downloadVideo } = require("./downloadVideo");


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

    downloadVideo(url, output);
  });

program.parse();

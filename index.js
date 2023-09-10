#!/usr/bin/env node
const { Command } = require("commander");
const { downloadVideo } = require("./download-video");
const { download_video } = require("./downloadVideo")

const program = new Command();

console.log("My CLI tool is here!");

program
  .name("yt-converter")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("hello <name>")
  .option("-c, --capitalize", "Capitalize the name")
  .description("Say hello to someone")
  .action((name, options) => {
    console.log(`Hello ${options.capitalize ? name.toUpperCase() : name}`);
  });

program
   .command("download <videoUrl>")
   .description('Download a video from YouTube: this command is not functioning for now due to changes in YouTube codes.')
   .option('-f, --folder <folderName>', 'Output folder name', 'videos')
   .option('-n, --name <fileName>', 'Output file name', 'video-file')
   .action(async (videoUrl, options) => {
    const { folder: folderName, name: fileName } = options;
    try {
        // const outputPath = await downloadVideo(videoUrl, folderName, fileName);
        const outputPath = await download_video(videoUrl, folderName);
        console.log(`Video downloaded to ${outputPath}`);
    } catch (error) {
        console.error(error);
    }
   })

program.parse(process.argv);

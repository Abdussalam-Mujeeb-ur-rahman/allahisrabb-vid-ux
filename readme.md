# Meet allahisrabb-vid-ux

A command-line tool that allows you to easily download YouTube videos.
## Features

- Download YouTube videos with a simple command.
- Specify the output directory and filename.

## Installation

First of all, make sure Python is installed on your device. To download Python;
- for Windows, download it [here](https://www.python.org/downloads/windows/)
- for Linux, you can run `sudo apt-get install python3` in your terminal
- for termux, you can run `pkg install python`
- for macOs, Python is typically pre-installed on macOS. You can check by running:`python3 --version`. If it's not installed, you can download it from [here](https://www.python.org/downloads/macos/)

You can install allahisrabb-vid-ux globally using npm:
```bash
npm install -g allahisrabb-vid-ux
```
### or
 you can run `npx allahisrabb-vid-ux`. You will be asked if the package can be installed, click ENTER or type YES and click ENTER.

## Usage
### Specify Output Directory and Filename
To download a YouTube video, use the following command:
```bash
allahisrabb-vid-ux download <video_url> -o <output_directory>/<filename>
```

## Examples
```bash
allahisrabb-vid-ux download https://youtu.be/your_video_url -o videos/my_video
```

## Acknowledgments
- This tool is built on top of `youtube-dl-exec`.
- Special thanks to the open-source community for creating and maintaining the tools used in this project.

## Author
- **Name**: Abdussalam Mujeeb-ur-rahman [allahisrabb]
- **Socials**: [X](https://twitter.com/allahisrabb), [LinkedIn](https://www.linkedin.com/67806b208) 
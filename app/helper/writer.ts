import * as fs from "fs";
import path from "path";

import callFile from "@/app/data/caller";

const writer = async (year: any) => {
  try {
    // Create directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "data"); // Use process.cwd() to get the root path
    const outputFile = path.join(outputDir, `${year}.csv`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const writerStream = fs.createWriteStream(outputFile);

    const response = await callFile(year);

    // Pipe the stream from Axios to the write stream
    response.pipe(writerStream);

    // Return a Promise that resolves when the writing is finished
    return new Promise((resolve, reject) => {
      writerStream.on("finish", resolve);
      writerStream.on("error", reject);
    });
  } catch (e) {
    console.error("Error in writer:", e);
    throw e; // Re-throw to handle upstream
  }
};

export default writer;

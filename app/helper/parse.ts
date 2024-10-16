import fs from "fs";
import path from "path";
import csv from "csv-parser";

const parser = async (year: any) => {
  // Path to the CSV file
  const csvFilePath = path.join(process.cwd(), "data", `${year}.csv`);

  // Path to the output JSON file
  const jsonFilePath = path.join(process.cwd(), "data", `${year}.json`);

  // Function to parse CSV and write to JSON
  const parseCSVtoJSON = async () => {
    const results: any = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data) => results.push(data)) // Push each row into results array
        .on("end", () => {
          // Write the results array to a JSON file
          fs.promises
            .writeFile(jsonFilePath, JSON.stringify(results, null, 2))
            .then(() => {
              console.log(
                "CSV file successfully processed and written to JSON."
              );
              resolve();
            })
            .catch((err) => reject(`Error writing JSON file: ${err}`));
        })
        .on("error", (err) => reject(`Error processing the CSV file: ${err}`));
    });
  };

  // Call the function
  const run = async () => {
    try {
      await parseCSVtoJSON();
    } catch (err) {
      console.error(err);
    }
  };

  await run();
};

export default parser;

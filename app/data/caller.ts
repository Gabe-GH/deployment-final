"use server";
import axios from "axios";

const callFile = async (year: any) => {
  const url = `https://raw.githubusercontent.com/abhionlyone/us-car-models-data/refs/heads/master/${year}.csv`;

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    // Return the response stream
    return response.data;
  } catch (e) {
    console.log("Error in callFile:", e);
    throw e; // rethrow to handle errors better in other places
  }
};

export default callFile;

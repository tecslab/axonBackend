/* export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
} */


import { globalParameters } from "./utils/globalParameters.ts";
const { ftpAddress, ftpUser, ftpPsw } = globalParameters

import { getIntervalDate } from "./utils/dateFunctions.ts";
import { getAsyncExcelData, writeCSVFile } from "./utils/dataProcessing.ts";
import {FTPClient} from "https://deno.land/x/ftpc/mod.ts";


import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import express from "npm:express@4.18.2";

const app = express();
const port : number = Number(Deno.env.get("APP_PORT")) | 3000;

app.get("/", (_req: Request, res: Response): void => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(port, () => {
  console.log(`Listening on ${ port } ...`);
});




const client = new FTPClient(ftpAddress, {
  // Enable TLS
  tlsOpts: {
    implicit: false
  },

  // Authentication information
  // Default is anonymous for username and password
  user: ftpUser,
  pass: ftpPsw,

  // Default is passive mode and port 21
  mode: "passive",
  port: 21,
});

try {
  await client.connect();
  const uploadStream = await client.uploadStream("visitorsData.csv", 4096);
  const fileName = "visitorsData.csv"
  const file = await Deno.open(`./${fileName}`, {
    read: true,
    create: true,
    truncate: true,
  });
  
  const fileContent = await Deno.readAll(file);

  /*// Create a ReadableStream from the file
  const fileStream = Deno.toAsyncIterable(file);
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of fileStream) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  // Convert the ReadableStream to ArrayBuffer
  const fileContent = await streamToBuffer(readableStream);
  
  await uploadStream.write(fileContent);
  
  // Close the stream and notify the server that file upload is complete
  await client.finalizeStream();
  file.close();*/

}catch(e){
  console.log(e)
}

/* // Helper function to convert ReadableStream to ArrayBuffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return new Uint8Array(Buffer.concat(chunks)).buffer;
} */


// Schedule the task to run every day at 23:00
cron("0 23 * * *", async () => {
  const now = new Date();
  const intervalDate = getIntervalDate(now)
  const {initDate, finishDate} = intervalDate


  console.log("Fetching data at 23:00...");
  const excelData = await getAsyncExcelData({initDate, finishDate});
  const fileName = await writeCSVFile(excelData)

});
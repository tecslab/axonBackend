/* export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
} */


//import { globalParameters } from "./utils/globalParameters.ts";
import { getVisitorsData } from "./utils/dataFetcher.ts";
import { getIntervalDate } from "./utils/dateFunctions.ts";
import { cron } from "https://deno.land/x/deno_cron/cron.ts";

// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

const app = express();
const port : number = Number(Deno.env.get("APP_PORT")) | 3000;

app.get("/", (_req: Request, res: Response): void => {
  res.send("Welcome to the Dinosaur API!");
});  

app.listen(port, () => {
  console.log(`Listening on ${ port } ...`);
});


// Schedule the task to run every day at 23:00
cron("0 23 * * *", async () => {
  const now = new Date();
  const intervalDate = getIntervalDate(now)
  const {initDate, finishDate} = intervalDate

  console.log("Fetching data at 23:00...");
  await getVisitorsData({initDate, finishDate});
});
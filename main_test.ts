import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { add } from "./app.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});

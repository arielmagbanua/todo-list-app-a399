import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // get the current directory

export default function readFile(filename) {
  const filePath = path.join(__dirname, "../uploads", filename);

  return fs.readFileSync(filePath);
}

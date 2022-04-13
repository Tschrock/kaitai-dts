#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import YAML from 'yaml';
import { generateModuleFile } from "./lib/generate";

export async function generateTypeFile(filepath: string) {
    // Read the spec
    const content = await fs.readFile(filepath, { encoding: 'utf8' });
    const spec = YAML.parse(content);

    // Generate the types
    const filename = path.basename(filepath);
    const dts = generateModuleFile(filename, spec);
    
    // Write the types
    const dtsFilepath = filepath + ".d.ts";
    await fs.writeFile(dtsFilepath, dts, { encoding: 'utf8' });
}

const filePath = process.argv.pop();
if (filePath && filePath.endsWith(".ksy")) {
    generateTypeFile(filePath).catch(e => console.error(e));
}
else {
    console.log("Usage: npx kaitai-dts my-data.ksy");
}

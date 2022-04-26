import { promises as fs } from 'fs';
import path from 'path';

import { expect } from 'chai';
import YAML from 'yaml';

import { generateModuleFile } from "../src";

describe('generateModuleFile', () => {
    it('should generate a matching module file', async () => {

        const ksyContent = await fs.readFile(path.resolve(__dirname, "./png.ksy"), { encoding: 'utf8' });
        const realDtsContent = await fs.readFile(path.resolve(__dirname, "./png.ksy.d.ts"), { encoding: 'utf8' });
    
        // Generate the types
        const generatedDtsContent = generateModuleFile(YAML.parse(ksyContent));

        expect(generatedDtsContent).to.equal(realDtsContent)
    })
})

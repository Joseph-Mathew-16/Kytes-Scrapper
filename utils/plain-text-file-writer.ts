import * as fs from 'fs';

export function writePlainTextFile(filePath: string, fileContent: string) {
    fs.writeFileSync(filePath, fileContent, 'utf-8');
}
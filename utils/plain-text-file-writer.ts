import * as fs from 'node:fs';
import path from 'node:path/win32';

export function writePlainTextFile(filePath: string, fileContent: string) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, fileContent, 'utf-8');
}
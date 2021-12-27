const fs = require('fs');
const path = require('path');

const file = path.resolve(process.cwd(), 'src/styles/variables-theme.scss');

const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
const output = [];

const regex = /^\$(\S*?): *(.*?);$/gm;
let match;
while ((match = regex.exec(fileContent)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (match.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  const [_, varName, scssVarValue] = match;

  const isNumber = !isNaN(Number(scssVarValue));
  const isColor = scssVarValue.startsWith('#');

  if (isNumber) {
    output.push(`  '${varName}': ${Number(scssVarValue)},`);
  } else if (isColor) {
    output.push(`  '${varName}': '${scssVarValue}',`);
  }
}

output.unshift('export default {');
output.push('};');
output.push('');

const outputFile = path.resolve(process.cwd(), 'src/styles/generated-config.ts');
fs.writeFileSync(outputFile, output.join('\n'), { encoding: 'utf-8' });

console.log(`Output TS variables to ${outputFile.replace(process.cwd() + '/', '')}`);

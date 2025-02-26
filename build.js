const fs = require('fs');
const path = require('path');

const data = require('./variables.json');

function toCssVarName(collectionName, varName) {
  // create a css variable name by combining collection name and variable name, replacing spaces and slashes.
  const col = collectionName.toLowerCase().replace(/\s+/g, '-');
  const name = varName.replace(/\//g, '-');
  return `--${col}-${name}`;
}

let cssVars = ':root {\n';

data.collections.forEach(collection => {
  collection.modes.forEach(mode => {
    mode.variables.forEach(variable => {
      const cssVarName = toCssVarName(collection.name, variable.name);
      let cssValue;
      if (variable.isAlias) {
        const aliasCollection = variable.value.collection;
        const aliasName = variable.value.name;
        cssValue = `var(${toCssVarName(aliasCollection, aliasName)})`;
      } else {
        // if value is a primitive, use it, otherwise ignore it
        cssValue = (typeof variable.value === 'string' || typeof variable.value === 'number')
          ? variable.value
          : null;
      }
      if (cssValue === null) {
        console.warn(`Skipping ${cssVarName} because it is not a primitive value`);
        return;
      }
      cssVars += `  ${cssVarName}: ${cssValue};\n`;
    });
  });
});

cssVars += '}\n';

// Write the output to variables.css
fs.writeFileSync(path.join(__dirname, 'dist/custom-properties.css'), cssVars);
console.log('CSS variables generated in custom-properties.css');

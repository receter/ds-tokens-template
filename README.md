# ds-tokens

## How it works

1. Use this plugin to export your Figma variables to a JSON file: https://www.figma.com/community/plugin/1253571037276959291/variables2json

2. Commit the JSON file to the repository. The file should be named `variables.json` and should be placed in the root of the repository.

3. Run `npm run build` to generate the CSS file.

```css
import "@my-company/ds-tokens/custom-properties.css";
```

## Release please

To get release please up and running you will have to make sure that to set the GitHub token in the repository secrets. You can do that by going to the repository settings and then to the secrets tab. There you can add a new secret with the name `RELEASE_PLEASE_TOKEN` and the value of the token.

The token should have the following permissions:

Actions - Read & Write
Commit statuses - Read & Write
Contents - Read & Write
Pull requests - Read & Write
Metadata - Read-only

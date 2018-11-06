const fs = require('fs-extra')

const distPath = "dist";
const reactPath = "react/dist";
const themesPath = "themes/dist";

fs.copySync("packages/ui-react/dist", `./${distPath}/${reactPath}`)
fs.copySync("packages/ui-themes/dist", `./${distPath}/${themesPath}`)
#UI SVG Icons

##How generate the react component automatically based in the SVG files
 
### Getting Started
Install the npm [svg-to-react-cli](https://www.npmjs.com/package/svg-to-react-cli)

```bash
npm install -g svg-to-react-cli
```

#### Running

Use the following command in the directory where the icons are 

```bash
svgtoreact dir
```

If the file are in a folder tree structure the command should be execute in each folder.

### Maintenance
The original SVG files converted should be added to the `resources` folder, to be possible to track the generated files.
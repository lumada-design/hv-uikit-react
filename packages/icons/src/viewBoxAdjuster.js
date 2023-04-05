const fs = require("fs");
const path = require("path");
const SVGPathBoundingBox = require("svg-path-bounding-box");
const { DOMParser } = require("xmldom");
const { XMLSerializer } = require("xmldom");

// Load the SVG file as a string
//const filePath = "./Abacus.S[D].svg";
//const svgString = fs.readFileSync(filePath, "utf8");

const directoryPath = "./";

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error reading directory:", err);
    return;
  }

  const svgFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".svg"
  );

  console.log("SVG files:", svgFiles);

  svgFiles.forEach((filename) => {
    const filePath = path.join(directoryPath, filename);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log("Error reading file:", err);
        return;
      }
      // Parse the SVG string into a DOM tree
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(data, "image/svg+xml");

      // Remove all non-path elements
      const nonPathElems = svgDoc.getElementsByTagName("rect");
      for (let i = 0; i < nonPathElems.length; i++) {
        nonPathElems[i].parentNode.removeChild(nonPathElems[i]);
      }

      // Remove all 'g' elements but keep their children
      // const groups = svgDoc.getElementsByTagName("g");
      // for (let i = groups.length - 1; i >= 0; i--) {
      // 	const group = groups[i];
      // 	while (group.firstChild) {
      // 		group.parentNode.insertBefore(group.firstChild, group);
      // 	}
      // 	group.parentNode.removeChild(group);
      // }

      // Find the bounding box of the non-empty elements
      let nonEmptyBBox = {
        x1: Infinity,
        y1: Infinity,
        x2: -Infinity,
        y2: -Infinity,
        width: 0,
        height: 0,
      };
      const paths = svgDoc.getElementsByTagName("path");
      for (let i = 0; i < paths.length; i++) {
        const pathData = paths[i].getAttribute("d");
        const pathBBox = SVGPathBoundingBox(pathData);
        if (pathBBox.width > 0 && pathBBox.height > 0) {
          const x = Math.min(pathBBox.x1, nonEmptyBBox.x1);
          const y = Math.min(pathBBox.y1, nonEmptyBBox.y1);
          const maxX = Math.max(pathBBox.x2, nonEmptyBBox.x2);
          const maxY = Math.max(pathBBox.y2, nonEmptyBBox.y2);
          nonEmptyBBox = {
            x1: x,
            y1: y,
            x2: maxX,
            y2: maxY,
            width: maxX - x,
            height: maxY - y,
          };
        }
      }

      // Calculate new viewbox coordinates to remove blank space
      const viewBoxAttr = svgDoc.documentElement.getAttribute("viewBox");
      if (viewBoxAttr) {
        const viewBox = viewBoxAttr.split(" ");
        const minX = parseFloat(viewBox[0]);
        const minY = parseFloat(viewBox[1]);
        const newViewBox = {
          x: nonEmptyBBox.x1 - minX,
          y: nonEmptyBBox.y1 - minY,
          width: nonEmptyBBox.width,
          height: nonEmptyBBox.height,
        };

        // Update viewbox attribute of the SVG element
        svgDoc.documentElement.setAttribute(
          "viewBox",
          `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`
        );

        // Remove width and height attributes
        svgDoc.documentElement.removeAttribute("width");
        svgDoc.documentElement.removeAttribute("height");

        // Serialize the updated SVG back to a string
        const updatedSvgString = new XMLSerializer().serializeToString(svgDoc);

        // Save the updated SVG back to disk
        fs.writeFileSync(filePath, updatedSvgString, "utf8");
        console.log("Updated viewbox for", filePath);
      } else {
        console.log("No viewbox found in", filePath);
      }
    });
  });
});

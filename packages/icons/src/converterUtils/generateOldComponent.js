/**
 * Creates a full component string based upon provided svg data and a component name
 * @param  string svgOutput -The svg data, preformatted
 * @param  string componentName - The name of the component without extension
 * @param  string colors - The defaults value of colors to add to the component
 * @return string The parsed component string
 */
module.exports = ({ svgOutput, componentName, colors }) => `
import React from 'react';

const ${componentName} = ({ color = null, className = "", ...other }) => {
  const colorArray = (!color || color.length < 1) ? [${colors}] : color;
  return (${svgOutput});
}

export default ${componentName};`;

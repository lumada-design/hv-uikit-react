'use strict'

/**
 * Creates a full component string based upon provided svg data and a component name
 * @param  string svgOutput -The svg data, preformatted
 * @param  string componentName - The name of the component without extension
 * @param  string colorArrayDefaultValues - The defaults value of colors to add to the component
 * @return string The parsed component string
 */
module.exports = (svgOutput, componentName, colorArrayDefaultValues) =>
`import React from 'react';
import PropTypes from "prop-types";

const ${componentName} = props => {

const {color, ...other} = props;

  return (
    ${svgOutput.split('\n').map(line => `    ${line}`).join('\n')}
  );
}

${componentName}.propTypes = {
 color: PropTypes.array
};

${componentName}.defaultProps = {
  color: [${colorArrayDefaultValues}]
};

export default ${componentName};`;
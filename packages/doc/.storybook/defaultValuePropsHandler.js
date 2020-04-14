const pattern = /@default (.*$)/;

function defaultValueHandler(documentation) {
  for (var [key, value] of documentation._props.entries()) {
    if (value.description.includes("@default")) {
      /* extended metadata format: @deprecated:metadata */
      const match = value.description.match(pattern);
      if (match) {
        value.defaultValue = {
          value: match[1],
          computed: false
        };
      }
    }
  }
}

module.exports = defaultValueHandler;

export default function sortProps(extractedProps, order = []) {
  if (!extractedProps) {
    return extractedProps;
  }

  return extractedProps.sort((propA, propB) => {
    const nameA = propA.name;
    const nameB = propB.name;

    // Look for the names in the given `order` array.
    let indexA = order.indexOf(nameA);
    let indexB = order.indexOf(nameB);

    // If at least one of the names is found, sort by the `order` array.
    if (indexA !== -1 || indexB !== -1) {
      // If one of the names is not found in `order`, list it last.
      if (indexA === -1) {
        indexA = order.length;
      }
      if (indexB === -1) {
        indexB = order.length;
      }

      return indexA - indexB;
    }

    return nameA.localeCompare(nameB, undefined, {
      numeric: true,
      sensitivity: "accent",
    });
  });
}

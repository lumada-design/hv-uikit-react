const cycleThroughSelection = (
  selectedState,
  index,
  allValues,
  selectionCheck
) => {
  const newValue: any[] = [];
  selectedState.forEach((isSelected, i) => {
    if (i === index) {
      if (selectionCheck || !isSelected) {
        newValue.push(allValues[i]);
      }
    } else if (isSelected) {
      newValue.push(allValues[i]);
    }
  });

  return newValue;
};

export const multiSelectionEventHandler = (
  evt,
  index,
  selectionAnchor,
  allValues,
  selectedState,
  selectionCheck
) => {
  let newValue: any[] = [];

  if (evt.nativeEvent.shiftKey) {
    if (selectionAnchor.current === undefined) {
      selectionAnchor.current = index;
      newValue.push(allValues[index]);
    } else {
      let selectionStart;
      let selectionEnd;
      if (selectionAnchor.current > index) {
        selectionStart = index;
        selectionEnd = selectionAnchor.current + 1;
      } else {
        selectionStart = selectionAnchor.current;
        selectionEnd = index + 1;
      }

      const selectedValues = allValues.slice(selectionStart, selectionEnd);

      newValue.push(...selectedValues);
    }
  } else if (evt.nativeEvent.metaKey) {
    selectionAnchor.current = index;

    newValue = cycleThroughSelection(
      selectedState,
      index,
      allValues,
      selectionCheck
    );
  } else {
    selectionAnchor.current = index;

    newValue = cycleThroughSelection(
      selectedState,
      index,
      allValues,
      selectionCheck
    );
  }

  return newValue;
};

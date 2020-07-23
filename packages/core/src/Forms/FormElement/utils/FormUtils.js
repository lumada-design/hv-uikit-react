import isNil from "lodash/isNil";

/**
 * Returns a descriptor in case the element being checked matches with the name.
 *
 * @param {Array} element - The current element being checked.
 * @param {string} componentName - The name of the component this function should scan i.e.: HvHelperText.
 */
const getDescriptorMap = (element, componentName) => {
  if (element.type?.__docgenInfo?.displayName?.includes(componentName)) {
    return {
      id: element.props?.id,
      showWhen: element.props?.showWhen
    };
  }
  return null;
};

const initializeFieldIfEmpty = field => (isNil(field) || !Array.isArray(field) ? [] : field);

/**
 * Receives a descriptor checks whether if the name matches and updates it.
 *
 * @param {Array} element - The current element being checked.
 * @param {Array} names - An array with the names of the components this function should scan i.e.: HvHelperText.
 * @param {Object} descriptors - descriptors to update.
 *
 */
const updateDescriptors = (element, names, descriptors = {}) => {
  const newDescriptorsMap = { ...descriptors };
  let descriptorMap = {};
  names.forEach(name => {
    newDescriptorsMap[name] = initializeFieldIfEmpty(newDescriptorsMap[name]);
    descriptorMap = getDescriptorMap(element, name);
    descriptorMap ? newDescriptorsMap[name].push(descriptorMap) : null;
  });
  return newDescriptorsMap;
};

/**
 * Scans the FormElement children looking for the Id's of the children that matches the provided names.
 * This function will produce an object that has a key for each provided name
 * Inside each key there will be an array with each id of the found descriptor.
 *
 * @param {Array} children - The children inside the form element to scan.
 * @param {Array} names - An array with the names of the components this function should scan i.e.: HvHelperText.
 * @param {Object} descriptors - Already found descriptors used for recursion.
 *
 */
const findDescriptors = (children, names, descriptors = {}) => {
  let newDescriptorsMap = { ...descriptors };
  if (!isNil(children)) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        newDescriptorsMap = updateDescriptors(child, names, newDescriptorsMap);
        if (child.props?.children) {
          newDescriptorsMap = findDescriptors(child.props.children, names, newDescriptorsMap);
        }
      });
    } else {
      newDescriptorsMap = updateDescriptors(children, names, newDescriptorsMap);
      if (children.props?.children) {
        newDescriptorsMap = findDescriptors(children.props.children, names, newDescriptorsMap);
      }
    }
    return newDescriptorsMap;
  }
  return newDescriptorsMap;
};

const getChildIdToLabel = (children, childName) => {
  let childId = "";
  if (Array.isArray(children)) {
    childId = children.forEach(child => {
      const foundId = getDescriptorMap(child, childName)?.id;
      if (!isNil(foundId)) {
        childId = childId.concat(`${foundId} `);
      }
    });
  } else {
    childId = getDescriptorMap(children, childName)?.id;
  }
  return childId;
};

export { getDescriptorMap, findDescriptors, updateDescriptors, getChildIdToLabel };

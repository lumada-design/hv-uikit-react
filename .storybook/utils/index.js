const findByKey = (obj, keyToFind) => {
  return (
    Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === keyToFind
          ? (acc = obj)
          : typeof value === "object" && value
          ? (acc = findByKey(value, keyToFind))
          : acc,
      {}
    ) || {}
  );
};

module.exports = {
  findByKey,
};

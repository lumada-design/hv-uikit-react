export const groupBy = (arr, groupBy) => {
  return arr.reduce((acc, elem) => {
    const { type } = elem;

    if (type === groupBy) {
      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(elem);
    }

    return acc;
  }, {});
};

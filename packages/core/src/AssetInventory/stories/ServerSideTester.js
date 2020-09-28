// --------------------------- Values ---------------------------------

const baseData = (id) => ({
  id: `id_${id}`,
  probability: 90 + id,
  timeHorizon: 8 + id,
  checkboxProps: { value: `id_${id}` },
});

const compressorData = (id) => ({
  ...baseData(id),
  headerTitle: `Risk of downtime ${id + 1}`,
  status: 5,
  event: {
    description: `Risk of downtime on Truck ${id}`,
    timestamp: "2 minutes ago",
    schedule: "fix now",
  },
  relatedAssets: "Track A, Zone 15 Brake",
});

const machineData = (id) => ({
  ...baseData(id),
  headerTitle: `Track severe ${id + 1}`,
  status: 2,
  event: {
    description: `Track ${id} severe breakdown`,
    timestamp: "2 hours ago",
    schedule: "fix 3rd shift",
  },
  relatedAssets: "Track B, Load 2 Brake",
});

/**
 * Return the first word of a string in a number format.
 *
 * @param str
 * @returns {number}
 */
const getHeaderNumber = (str) => Number(str.substr(0, str.indexOf(" ")));

/**
 * Sort ascending.
 *
 * @param a
 * @param b
 * @returns {number}
 */
const sortAsc = (a, b) => getHeaderNumber(a.headerTitle) - getHeaderNumber(b.headerTitle);

/**
 * Sort descending.
 *
 * @param a
 * @param b
 * @returns {number}
 */
const sortDesc = (a, b) => getHeaderNumber(b.headerTitle) - getHeaderNumber(a.headerTitle);

/**
 * Values generator.
 *
 * @returns {[]}
 */
const valuesGenerator = (num = 50) =>
  Array.from(Array(num).keys()).map((i) => (i % 2 === 0 ? compressorData(i) : machineData(i)));

let values = valuesGenerator();
let searchString = "";

/**
 * Returns the slice of the values to the corresponding page.
 *
 * @param values
 * @param size
 * @param page
 * @returns {*}
 */
const getSlicePage = (values2, size, page) => {
  const slicePage = values2.slice(size * page, size * (page + 1));

  return slicePage.length === 0 ? values2 : slicePage;
};

/**
 * Filter function for the search.
 *
 * @param data
 * @returns {boolean}
 */
const searchFilter = (data) => data.headerTitle.toUpperCase().includes(searchString);

/**
 * Returns the data for the page.
 *
 * @param size
 * @param page
 * @returns {*}
 */
const fetchData = (size, page) => getSlicePage(values.filter(searchFilter), size, page);

/**
 * Sets the search string and returns the values filtered.
 *
 * @param search
 * @param size
 * @returns {*}
 */
const doSearch = (search, size) => {
  searchString = search.toUpperCase();
  return fetchData(size, 0);
};

/**
 * Sort the values.
 *
 * @param type
 * @param size
 * @param page
 * @returns {*}
 */
const doSort = (type, size, page) => {
  const sortFunc = type === "asc" ? sortAsc : sortDesc;
  values = values.filter(searchFilter).sort(sortFunc);

  return getSlicePage(values, size, page);
};

/**
 * Determines how many pages based in the lenght of the values and the page size.
 *
 * @param size
 * @returns {number}
 */
const getPages = (size) => Math.ceil(values.filter(searchFilter).length / size);

export { fetchData, getPages, doSearch, doSort };

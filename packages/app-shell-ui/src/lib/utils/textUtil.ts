/**
 * Checks if a search string (can be a single character or a string sequence) may be found within the given value string.
 * @param value The string to be checked if contains the search value
 * @param searchParam The string
 */
const includesString = (value: string, searchParam: string): boolean => {
  return value.includes(searchParam);
};

export default includesString;

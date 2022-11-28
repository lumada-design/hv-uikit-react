function config(entry = []) {
  return [...entry, require.resolve("./dist/preset/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/preset/manager")];
}

module.exports = {
  managerEntries,
  config,
};

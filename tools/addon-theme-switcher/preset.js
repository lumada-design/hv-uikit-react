function config(entry = []) {
  return [...entry, require.resolve("./dist/es/preset/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/es/preset/manager")];
}

module.exports = {
  managerEntries,
  config,
};

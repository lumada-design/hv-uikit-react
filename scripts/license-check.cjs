#!/usr/bin/env node

const path = require("path");
const findRoot = require("find-root");
const fs = require("fs");

const licenseChecker = require("license-checker");
const licenseCorrect = require("spdx-correct");
const licenseSatisfies = require("spdx-satisfies");

const moduleRoot = findRoot(process.cwd());

let packageJson = null;
try {
  packageJson = JSON.parse(
    fs.readFileSync(path.resolve(moduleRoot, "package.json"))
  );
} catch (error) {
  console.error("Error reading current package descriptor.");
  process.exit(1);
}

let config = null;
try {
  config = JSON.parse(
    fs.readFileSync(process.argv[2])
  );
} catch (error) {
  console.error("Error reading license-check configuration.");
  process.exit(1);
}

const allowedLicenses =
config.allowedLicenses.map(l => licenseCorrect(l) || l) || [];
const allowedPackages = config.allowedPackages || [];
const production = config.production || true;
const allowUnknown = config.allowUnknown || false;

function isAllowedPackage(dependency) {
  return allowedPackages.some(
    allowedPackage =>
      allowedPackage.name === dependency.name &&
      (allowedPackage.version == null ||
        allowedPackage.version === dependency.version)
  );
}

function isAllowedLicense(licenses) {
  if (!licenses) {
    return false;
  }

  if (Array.isArray(licenses)) {
    return licenses.every(license => isAllowedLicense(license));
  }

  const license = licenseCorrect(licenses) || licenses;
  return allowedLicenses.some(allowedLicense => {
    try {
      return licenseSatisfies(allowedLicense, license);
    } catch (e) {
      return allowedLicense.toLowerCase() === license.toLowerCase();
    }
  });
}

function dependencyToString(dep) {
  let type = "transitive";
  if (packageJson.dependencies && packageJson.dependencies[dep.name]) {
    type = "dependency";
  } else if (
    packageJson.devDependencies &&
    packageJson.devDependencies[dep.name]
  ) {
    type = "devDependency";
  } else if (
    packageJson.peerDependencies &&
    packageJson.peerDependencies[dep.name]
  ) {
    type = "peerDependency";
  } else if (
    packageJson.optionalDependencies &&
    packageJson.optionalDependencies[dep.name]
  ) {
    type = "optionalDependency";
  }

  return `${dep.name}@${dep.version} (${type}): ${dep.licenses}`;
}

function parsePackageId(pckId) {
  const parts = pckId.split("@");
  return {
    version: parts.pop(),
    name: (parts.length > 1 ? "@" : "") + parts[parts.length - 1]
  };
}

licenseChecker.init(
  {
    start: moduleRoot,
    production
  },
  (err, packages) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    let numberOfPackages = 0;
    let numberOfErrors = 0;
    let numberOfWarnings = 0;

    Object.keys(packages).forEach(pckId => {
      const dep = {
        ...parsePackageId(pckId),
        ...packages[pckId]
      };

      // don't check the current package
      if (dep.name.indexOf(packageJson.name) !== -1) return;
      // weird unknown package?
      if (dep.name === "undefined" && dep.version === "undefined") return;

      numberOfPackages += 1;

      if (isAllowedPackage(dep)) return;

      if (allowUnknown && dep.licenses === "UNKNOWN") {
        numberOfWarnings += 1;
        console.warn(dependencyToString(dep));

        return;
      }

      if (isAllowedLicense(dep.licenses)) return;

      numberOfErrors += 1;
      console.error(dependencyToString(dep));
    });

    if (numberOfErrors > 0) {
      console.error(
        `License check failed: ${numberOfPackages} packages checked, ${numberOfErrors} problems detected.`
      );

      process.exit(1);
    } else if (numberOfWarnings > 0) {
      console.warn(
        `License check: ${numberOfPackages} packages checked, ${numberOfWarnings} unknown licenses detected.`
      );
    } else {
      console.log(
        `License check: ${numberOfPackages} packages checked, no problems detected.`
      );
    }
  }
);

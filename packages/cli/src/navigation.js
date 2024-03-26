import fs from "fs-extra";
import nodePlop from "node-plop";

import { __dirname, toSentenceCase } from "./utils.js";

const plop = await nodePlop(`${__dirname}/plopfile.js`);

const createRoute = plop.getGenerator("createRoute");
const createNavigation = plop.getGenerator("createNavigation");

export const createNavigationFiles = async (path) => {
  const pagesPath = `${path}/src/pages`;
  const pages = fs.readdirSync(pagesPath);

  /* eslint-disable no-await-in-loop */
  for (const page of pages) {
    if (page === "NotFound") break;

    // create routes file from plop template
    await createRoute.runActions({ path, name: page });
    // create navigation file from plop template
    await createNavigation.runActions({ path, name: toSentenceCase(page) });
  }
};

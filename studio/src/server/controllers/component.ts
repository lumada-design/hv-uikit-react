// import fetch from "node-fetch";
import { loadStories } from "../utils/component";

const root = __dirname.split("studio/").slice(0, -1).join("/");

const storiesPaths = [`${root}packages/**/*.stories.@(ts|tsx)`];

export const getComponents = (_, res) => {
  try {
    const stories = loadStories(storiesPaths);
    res.status(200).json(stories);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: err });
  }
};

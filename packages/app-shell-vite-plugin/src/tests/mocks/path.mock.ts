export default {
  resolve: (...paths: string[]) => {
    return paths.join("/");
  },
};

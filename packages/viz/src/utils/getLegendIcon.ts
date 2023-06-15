export const getLegendIcon = (square: boolean) => {
  if (square) {
    return "path://M0,0L16,0L16,16L0,16L0,0Z";
  }

  return "path://M0,0L16,0L16,2L0,2Z";
};

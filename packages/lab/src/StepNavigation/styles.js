const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  titles: {
    display: "flex",
  },
  ol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 0,
    listStyle: "none",
  },
  li: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    userSelect: "none",
    "& > div": {
      display: "flex",
    },
  },
});

export default styles;

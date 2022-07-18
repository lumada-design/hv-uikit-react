import { makeStyles } from "@mui/styles";

// accommodating the focus outline space with extra 4px

const styles = makeStyles(() => ({
  root: {
    "& $filterItem": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  filterItem: {},
}));

export default styles;

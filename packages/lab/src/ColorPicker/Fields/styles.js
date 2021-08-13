import { makeStyles } from "@material-ui/core";

const styles = makeStyles(() => ({
  fields: {
    width: "100%",
    display: "flex",
    paddingTop: 10,
    paddingBottom: 20,
    marginRight: 5,
  },
  single: {
    width: 40,
    paddingLeft: 5,
    "& input": {
      marginLeft: 5,
      marginRight: 5,
    },
    "& label": {
      paddingLeft: 5,
    },
  },
  double: {
    width: 80,
    "& input": {
      textTransform: "uppercase",
      marginLeft: 5,
      marginRight: 5,
    },
    "& label": {
      paddingLeft: 5,
    },
    paddingRight: 20,
  },
}));

export default styles;

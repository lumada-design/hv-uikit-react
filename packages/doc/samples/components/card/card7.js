import React from "react";
import HvCard, { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/dist/Card";
import { Add, Delete, Preview, Upload } from "@hv/uikit-react-icons/dist";
import withStyles from "@material-ui/core/styles/withStyles";
import leaf from "./resources/leaf.png";

const styles = theme => ({
  root: {
    width: "100%",
    paddingBottom: "0px",
    borderLeft: `1px solid ${theme.palette.grey.plain}`,
    borderRight: `1px solid ${theme.palette.grey.plain}`
  },
  media: {
    height: "100%",
    width: "100%"
  }
});

const CustomMedia = withStyles(styles)(HvCardMedia);

const myActions = [
  {
    id: "post",
    label: "Upload",
    iconCallback: () => <Upload />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <Preview />,
    disabled: true
  },
  {
    id: "put",
    label: "Add",
    iconCallback: () => <Add />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <Delete />,
    disabled: false
  }
];

export default (
  <div style={{ width: "500px" }}>
    <HvCard>
      <CustomMedia mediaPath={leaf} mediaHeight={160} aria-label="leafy leaf" />
      <HvCardFooter
        aria-label="Composed card"
        checkboxProps={{
          value: "value",
          "aria-label": "Composed card",
          inputProps: {
            "aria-label": "composed input"
          }
        }}
        actions={myActions}
        isSelectable
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </HvCard>
  </div>
);

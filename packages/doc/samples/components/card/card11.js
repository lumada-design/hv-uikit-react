import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import compressor from "./resources/compressor.png";

const styles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};

const SingleContent = ({ classes }) => (
  <>
    <div>
      <div>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {data.firstContent}
        </HvTypography>
      </div>
    </div>
    <div style={{ marginTop: "15px" }}>
      <div>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
      </div>
      <div>
        <HvTypography variant="normalText" className={classes.text}>
          {data.secondContent}
        </HvTypography>
      </div>
    </div>
  </>
);

export default (
  <div style={{ width: "360px" }}>
    <HvCard
      headerTitle="Asset Avatar L90"
      subheader="Compressor"
      id="test"
      innerCardContent={<SingleContent classes={styles}/>}
      onClickAction={()=>{console.log("CLICK")}}
      noFooter
      isSelectable
      selectOnClickAction
      semantic="sema4"
    />
  </div>
);

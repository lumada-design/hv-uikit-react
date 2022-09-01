import {
  HvContainer,
  HvGlobalActions,
  HvScrollToHorizontal,
  HvGrid,
} from "@hitachivantara/uikit-react-core";
import React from "react";
import { withStyles } from "@material-ui/core";
import KPISection from "./KPISection";
import TableSection from "./TableSection";
import PropertiesSection from "./PropertiesSection";
import styles from "./styles";

const DetailsPage = ({ classes }) => {
  const options = [
    { label: "KPIs", value: "contentId1" },
    { label: "Properties", value: "contentId2" },
    { label: "Table", value: "contentId3" },
  ];

  return (
    <HvContainer>
      <HvGlobalActions title="Detail" />
      <HvContainer>
        <HvScrollToHorizontal
          id="detailsPageId"
          href
          options={options}
          scrollElementId="pageContentId"
          position="sticky"
          offset={100}
          className={classes.positionSticky}
        />
        <HvContainer>
          <HvGrid id={options[0].value} className={classes.container} container>
            <KPISection />
          </HvGrid>
        </HvContainer>
        <HvContainer>
          <HvGrid id={options[1].value} className={classes.container} container>
            <PropertiesSection />
          </HvGrid>
        </HvContainer>
        <HvContainer>
          <HvGrid id={options[2].value} className={classes.container} container>
            <TableSection />
          </HvGrid>
        </HvContainer>
      </HvContainer>
    </HvContainer>
  );
};

export default withStyles(styles)(DetailsPage);

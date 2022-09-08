import {
  HvContainer,
  HvGlobalActions,
  HvScrollToHorizontal,
  HvGrid,
} from "@hitachivantara/uikit-react-core";
import React from "react";
import { withStyles } from "@mui/styles";
import KPISection from "./KPISection";
import TableSection from "./TableSection";
import PropertiesSection from "./PropertiesSection";
import styles from "./styles";

const options = [
  { label: "KPIs", value: "contentId1" },
  { label: "Properties", value: "contentId2" },
  { label: "Events", value: "contentId3" },
];

const DetailsPage = ({ classes }) => {
  return (
    <HvContainer>
      <HvGlobalActions title="Deploy" backButton={false} />
      <HvScrollToHorizontal
        id="detailsPageId"
        href
        options={options}
        scrollElementId="pageContentId"
        position="sticky"
        offset={200}
        className={classes.scrollTo}
      />
      <HvGrid container>
        <HvGrid item xs={12} id={options[0].value}>
          <KPISection />
        </HvGrid>
        <HvGrid item xs={12} id={options[1].value}>
          <PropertiesSection />
        </HvGrid>
        <HvGrid item xs={12} id={options[2].value}>
          <TableSection />
        </HvGrid>
      </HvGrid>
    </HvContainer>
  );
};

export default withStyles(styles)(DetailsPage);

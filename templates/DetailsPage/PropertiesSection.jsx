import React from "react";
import {
  HvGrid,
  HvSimpleGrid,
  HvTypography,
  HvTextArea,
  HvTagsInput,
  HvCard,
  HvCardContent,
  HvCardHeader,
} from "@hitachivantara/uikit-react-core";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const PropertiesSection = ({ classes }) => {
  return (
    <HvGrid container className={classes.section}>
      <HvGrid item xs={12} className={classes.sectionItem}>
        <HvTypography variant="sectionTitle" className={classes.sectionTitle}>
          Model Properties
        </HvTypography>
        <HvSimpleGrid
          spacing="sm"
          breakpoints={[
            { minWidth: 980, cols: 3, spacing: "md" },
            { minWidth: 500, cols: 2, spacing: "sm" },
            { minWidth: 400, cols: 1, spacing: "sm" },
          ]}
        >
          <HvCard>
            <HvCardHeader
              title="Description"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTextArea
                readOnly
                rows={5}
                placeholder="Enter value"
                defaultValue="Model created from the example Jupyter Notebook"
                maxCharQuantity={256}
              />
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="Status"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>Ready</HvTypography>
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="The Tags"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTagsInput
                id="properties-tags"
                aria-label="Properties Tags"
                placeholder="Enter value"
                readOnly
                value={[{ label: "test" }, { label: "notebook" }]}
                classes={{
                  root: classes.tagRoot,
                }}
              />
            </HvCardContent>
          </HvCard>
        </HvSimpleGrid>
        <HvSimpleGrid
          spacing="sm"
          breakpoints={[
            { minWidth: 980, cols: 2, spacing: "md" },
            { minWidth: 500, cols: 2, spacing: "sm" },
            { minWidth: 400, cols: 1, spacing: "sm" },
          ]}
        >
          <HvCard>
            <HvCardHeader
              title="Project"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>Wine Quality</HvTypography>
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="ASC"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>Failure Prediction</HvTypography>
            </HvCardContent>
          </HvCard>
        </HvSimpleGrid>
        <HvSimpleGrid
          spacing="sm"
          breakpoints={[
            { minWidth: 980, cols: 4, spacing: "md" },
            { minWidth: 500, cols: 2, spacing: "sm" },
            { minWidth: 400, cols: 1, spacing: "sm" },
          ]}
        >
          <HvCard>
            <HvCardHeader
              title="Created"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="Created By"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>-</HvTypography>
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="Modified"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
            </HvCardContent>
          </HvCard>
          <HvCard>
            <HvCardHeader
              title="Modified By"
              classes={{
                root: classes.propertiesTitleRoot,
                title: classes.titleText,
              }}
            />
            <HvCardContent
              classes={{
                content: classes.propertiesContentRoot,
              }}
            >
              <HvTypography noWrap>-</HvTypography>
            </HvCardContent>
          </HvCard>
        </HvSimpleGrid>
      </HvGrid>
    </HvGrid>
  );
};

export default withStyles(styles)(PropertiesSection);

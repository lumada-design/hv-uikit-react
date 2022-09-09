import React from "react";
import {
  HvSimpleGrid,
  HvTypography,
  HvTextArea,
  HvTagsInput,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvGlobalActions,
} from "@hitachivantara/uikit-react-core";
import { withStyles } from "@mui/styles";
import styles from "./styles";

const PropertiesSection = ({ classes }) => {
  return (
    <>
      <HvGlobalActions title="Model Properties" variant="section" className={classes.section} />
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
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
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
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>Ready</HvTypography>
          </HvCardContent>
        </HvCard>
        <HvCard>
          <HvCardHeader
            title="The Tags"
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
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
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>Wine Quality</HvTypography>
          </HvCardContent>
        </HvCard>
        <HvCard>
          <HvCardHeader
            title="ASC"
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
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
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
          </HvCardContent>
        </HvCard>
        <HvCard>
          <HvCardHeader
            title="Created By"
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>-</HvTypography>
          </HvCardContent>
        </HvCard>
        <HvCard>
          <HvCardHeader
            title="Modified"
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
          </HvCardContent>
        </HvCard>
        <HvCard>
          <HvCardHeader
            title="Modified By"
            classes={{
              root: classes.headerRoot,
              title: classes.headerTitle,
            }}
          />
          <HvCardContent
            classes={{
              content: classes.cardContent,
            }}
          >
            <HvTypography noWrap>-</HvTypography>
          </HvCardContent>
        </HvCard>
      </HvSimpleGrid>
    </>
  );
};

export default withStyles(styles)(PropertiesSection);

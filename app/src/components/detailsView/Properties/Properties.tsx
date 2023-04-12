import {
  HvSimpleGrid,
  HvTypography,
  HvTextArea,
  HvTagsInput,
  HvGlobalActions,
} from "@hitachivantara/uikit-react-core";
import { Kpi3 } from "../Kpi3/index.js";
import classes from "./styles.js";

export const Properties = () => {
  return (
    <>
      <HvGlobalActions
        title="Model Properties"
        variant="section"
        className={classes.section}
      />
      <HvSimpleGrid
        spacing="sm"
        breakpoints={[
          { minWidth: 980, cols: 3, spacing: "md" },
          { minWidth: 500, cols: 2, spacing: "sm" },
          { minWidth: 400, cols: 1, spacing: "sm" },
        ]}
      >
        <Kpi3 title="Description">
          <HvTextArea
            readOnly
            rows={5}
            placeholder="Enter value"
            defaultValue="Model created from the example Jupyter Notebook"
            maxCharQuantity={256}
          />
        </Kpi3>
        <Kpi3 title="Status">
          <HvTypography noWrap>Ready</HvTypography>
        </Kpi3>
        <Kpi3 title="Tags">
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
        </Kpi3>
      </HvSimpleGrid>
      <HvSimpleGrid
        spacing="sm"
        breakpoints={[
          { minWidth: 980, cols: 2, spacing: "md" },
          { minWidth: 500, cols: 2, spacing: "sm" },
          { minWidth: 400, cols: 1, spacing: "sm" },
        ]}
      >
        <Kpi3 title="Project">
          <HvTypography noWrap>Wine Quality</HvTypography>
        </Kpi3>
        <Kpi3 title="ASC">
          <HvTypography noWrap>Failure Prediction</HvTypography>
        </Kpi3>
      </HvSimpleGrid>
      <HvSimpleGrid
        spacing="sm"
        breakpoints={[
          { minWidth: 980, cols: 4, spacing: "md" },
          { minWidth: 500, cols: 2, spacing: "sm" },
          { minWidth: 400, cols: 1, spacing: "sm" },
        ]}
      >
        <Kpi3 title="Created">
          <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
        </Kpi3>
        <Kpi3 title="Created By">
          <HvTypography noWrap>-</HvTypography>
        </Kpi3>
        <Kpi3 title="Modified">
          <HvTypography noWrap>2022-05-24 14:32:50</HvTypography>
        </Kpi3>
        <Kpi3 title="Modified By">
          <HvTypography noWrap>-</HvTypography>
        </Kpi3>
      </HvSimpleGrid>
    </>
  );
};

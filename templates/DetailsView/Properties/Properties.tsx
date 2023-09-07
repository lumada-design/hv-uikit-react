import {
  HvSimpleGrid,
  HvTypography,
  HvTextArea,
  HvTagsInput,
  HvGlobalActions,
} from "@hitachivantara/uikit-react-core";

import { Kpi3 } from "../Kpi3";
import classes from "./styles";
import { LoadingContainer } from "../../LoadingContainer";
import { ModelDetails } from "../data";

interface PropertiesProps {
  details?: ModelDetails;
  loading: boolean;
}

export const Properties = ({ details, loading }: PropertiesProps) => {
  return (
    <>
      <HvGlobalActions
        title="Model Properties"
        variant="section"
        className={classes.section}
      />
      <LoadingContainer loading={loading}>
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
              value={details?.description || "-"}
              maxCharQuantity={256}
            />
          </Kpi3>
          <Kpi3 title="Status">
            <HvTypography noWrap>{details?.status || "-"}</HvTypography>
          </Kpi3>
          <Kpi3 title="Tags">
            <HvTagsInput
              id="properties-tags"
              aria-label="Properties Tags"
              placeholder="Enter value"
              readOnly
              value={details?.tags || []}
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
            <HvTypography noWrap>{details?.project || "-"}</HvTypography>
          </Kpi3>
          <Kpi3 title="ASC">
            <HvTypography noWrap>{details?.asc || "-"}</HvTypography>
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
            <HvTypography noWrap>{details?.createdAt || "-"}</HvTypography>
          </Kpi3>
          <Kpi3 title="Created By">
            <HvTypography noWrap>{details?.createdBy || "-"}</HvTypography>
          </Kpi3>
          <Kpi3 title="Modified">
            <HvTypography noWrap>{details?.modifiedAt || "-"}</HvTypography>
          </Kpi3>
          <Kpi3 title="Modified By">
            <HvTypography noWrap>{details?.modifiedBy || "-"}</HvTypography>
          </Kpi3>
        </HvSimpleGrid>
      </LoadingContainer>
    </>
  );
};

import React from "react";
import PropTypes from "prop-types";
import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCheckBox,
  HvActionBar,
  HvActionsGeneric,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { makeIcon, idsToControl } from "./utils";

/**
 * The card view of the Asset Inventory.
 *
 * @param {Object} instance - the instance returned by the `useHvData` data.
 */
const CardView = ({ instance }) => {
  return (
    <HvSimpleGrid
      id={idsToControl.cards}
      breakpoints={[
        { minWidth: 1270, cols: 4, spacing: "md" },
        { minWidth: 960, cols: 3, spacing: "md" },
        { minWidth: 600, cols: 2, spacing: "sm" },
        { minWidth: 0, cols: 1, spacing: "sm" },
      ]}
    >
      {instance.page.map((row) => {
        return (
          <HvCard
            bgcolor="atmo1"
            key={`${row?.values?.name}-row`}
            style={{ width: "100%" }}
            statusColor={row?.original?.statusColor}
            icon={makeIcon(row?.original?.statusColor)}
          >
            <HvCardHeader title={row?.values?.name} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div>
                <HvCardContent>
                  <HvTypography variant="highlightText">Event</HvTypography>
                  <HvTypography noWrap>{row?.values?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="highlightText">Severity</HvTypography>
                  <HvTypography noWrap>{row?.values?.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="highlightText">Status</HvTypography>
                  <HvTypography noWrap>{row?.values?.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="highlightText">Priority</HvTypography>
                  <HvTypography noWrap>{row?.values?.priority}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvActionBar>
              <HvCheckBox
                onChange={() => instance.toggleRowSelected(row.id)}
                checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view1", label: "View" }]} />
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};

CardView.propTypes = {
  /**
   * The instance object which contains all the data information and functions.
   */
  instance: PropTypes.object,
};

export default CardView;

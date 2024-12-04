import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { bulkActionsClasses } from "../BulkActions";
import { paginationClasses } from "../Pagination";
import { tableCellClasses } from "../Table/TableCell";
import { tableContainerClasses } from "../Table/TableContainer";
import { tableHeaderClasses } from "../Table/TableHeader";
import { tableRowClasses } from "../Table/TableRow";

export const { staticClasses, useClasses } = createClasses("HvTableSection", {
  root: {},
  header: {
    // Only apply the border to divide the header and content when both are displayed
    "+ div": {
      borderTop: `1px solid ${theme.colors.atmo3}`,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  actions: {},
  content: {
    marginTop: 0,
    padding: 0,

    // Apply border radius to the first child if there's not an header
    "&:first-of-type": {
      "& > :first-of-type": {
        borderTopLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
      },
    },

    "& > :last-child": {
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
    },

    [`& .${tableContainerClasses.root}`]: {
      paddingBottom: 0,
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
    },

    [`& .${tableHeaderClasses.head}`]: {
      backgroundColor: theme.colors.atmo2,
      borderBottomColor: theme.colors.atmo3,
      [`&.${tableHeaderClasses.variantCheckbox}`]: {
        borderRight: "none",
      },
      [`&.${tableHeaderClasses.variantActions}`]: {
        borderLeft: "none",
      },
    },

    // Remove border for the last table row
    [`& .${tableRowClasses.root}`]: {
      "&:last-child": {
        [`& .${tableCellClasses.root}`]: { borderBottom: "none" },
      },
    },

    [`& .${tableCellClasses.root}`]: {
      borderBottomColor: theme.colors.atmo3,
    },

    [`& .${tableCellClasses.variantCheckbox}`]: {
      borderRight: "none",
    },

    [`& .${tableCellClasses.variantActions}`]: {
      borderLeft: "none",
    },

    [`& .${bulkActionsClasses.root}`]: {
      marginBottom: 0,
      border: "none",
      borderBottom: `1px solid ${theme.colors.atmo3}`,
      padding: theme.spacing("xs", "sm"),
    },

    [`& .${paginationClasses.root}`]: {
      margin: 0,
      backgroundColor: theme.colors.atmo2,
      padding: theme.space.xs,
      borderTop: `1px solid ${theme.colors.atmo3}`,
      borderBottomLeftRadius: "inherit",
      borderBottomRightRadius: "inherit",
    },

    [`& .${paginationClasses.pageSizeOptions}`]: {
      left: theme.space.sm,
    },
    [`& .${paginationClasses.pageSizeHeader}`]: {
      border: "none",
      "&:hover": {
        border: "none",
      },
    },
  },
  hidden: {},
  raisedHeader: {
    "& $content": {
      paddingTop: 0,
    },
  },
  hasHeader: {},
  /** @deprecated use `hasHeader` instead */
  spaceTop: {},
});

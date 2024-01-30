import { theme } from "@hitachivantara/uikit-styles";

import { bulkActionsClasses } from "../BulkActions";
import { paginationClasses } from "../Pagination";
import { sectionClasses } from "../Section";

import { tableCellClasses } from "../Table/TableCell";
import { tableContainerClasses } from "../Table/TableContainer";
import { tableHeaderClasses } from "../Table/TableHeader";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvTableSection", {
  root: {
    padding: 0,
  },
  header: {
    padding: theme.spacing("xs", "xs", "xs", "sm"),
    borderBottom: `1px solid ${theme.colors.atmo3}`,
    [`&.${sectionClasses.raisedHeader}`]: {
      "+ div": {
        paddingTop: `0`,
      },
    },
  },
  actions: {
    right: theme.space.sm,
  },
  content: {
    marginTop: 0,
    padding: 0,
    [`&&`]: {
      paddingTop: 0,
    },
    [`& .${tableContainerClasses.root}`]: {
      paddingBottom: 0,
      borderRadius: `${theme.radii.round} ${theme.radii.round} 0 0`,
    },
    [`& .${tableHeaderClasses.head}`]: {
      backgroundColor: theme.colors.atmo2,
      borderBottomColor: theme.colors.atmo3,
      [`&.${tableHeaderClasses.variantCheckbox}`]: {
        borderRight: "none",
      },
    },
    [`& .${tableCellClasses.root}`]: {
      borderBottomColor: theme.colors.atmo3,
    },
    [`& .${tableCellClasses.variantCheckbox}`]: {
      borderRight: "none",
    },
    [`& .${bulkActionsClasses.root}`]: {
      marginBottom: 0,
      border: "none",
      borderBottom: `1px solid ${theme.colors.atmo3}`,
      padding: theme.spacing("xs", "sm"),
      borderRadius: `${theme.radii.round} ${theme.radii.round} 0 0`,
    },
    [`& .${paginationClasses.root}`]: {
      margin: 0,
      backgroundColor: theme.colors.atmo2,
      padding: theme.space.xs,
      borderRadius: `0 0 ${theme.radii.round} ${theme.radii.round}`,
    },
    [`& .${paginationClasses.pageSizeOptions}`]: {
      left: theme.space.sm,
    },
  },
  hidden: {},
  raisedHeader: {},
  spaceTop: {},
});

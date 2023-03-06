import {
  HvTooltip,
  HvTypography,
  HvCellInstance,
} from "@hitachivantara/uikit-react-core";
import {
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Refresh,
} from "@hitachivantara/uikit-react-icons";

export const getStatusIcon = (status: number) => {
  switch (status) {
    case 0:
      return <Level0Good semantic="sema1" iconSize="XS" />;
    case 1:
      return <Level3Bad semantic="sema4" iconSize="XS" />;
    case 2:
      return <Level2Average semantic="sema3" iconSize="XS" />;
    default:
      return <Level1 semantic="sema2" iconSize="XS" />;
  }
};

export const getColumns = () => [
  {
    Header: "Status",
    accessor: "status",
    style: { width: 40 },
    Cell: (cellData: HvCellInstance) => {
      switch (cellData.row.original.status) {
        case 0:
          return (
            <HvTooltip title={<HvTypography>Success</HvTypography>}>
              <div>{getStatusIcon(0)}</div>
            </HvTooltip>
          );
        case 1:
          return (
            <HvTooltip title={<HvTypography>Error</HvTypography>}>
              <div>{getStatusIcon(1)}</div>
            </HvTooltip>
          );
        case 2:
          return (
            <HvTooltip title={<HvTypography>Open</HvTypography>}>
              <div>{getStatusIcon(2)}</div>
            </HvTooltip>
          );
        default:
          return (
            <HvTooltip title={<HvTypography>Unassigned</HvTypography>}>
              <div>{getStatusIcon(3)}</div>
            </HvTooltip>
          );
      }
    },
  },
  { Header: "Name", accessor: "name", style: { minWidth: 200 } },
  { Header: "Description", accessor: "description", style: { minWidth: 200 } },
  { Header: "Server ID", accessor: "serverId", style: { width: 120 } },
  { Header: "Created", accessor: "created" },
  { Header: "Build", accessor: "build", style: { width: 120 } },
];

export const actions = [{ id: "refresh", label: "Refresh", icon: <Refresh /> }];

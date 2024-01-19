import {
  HvTableContainer,
  HvTable,
  HvTableHead,
  HvTableRow,
  HvTableCell,
  HvTableBody,
} from "@hitachivantara/uikit-react-core";

export const ClassesTable = ({
  classes,
}: {
  classes: { [selector: string]: string };
}) => {
  const columns = [
    { Header: "Selector", accessor: "selector", style: { minWidth: 120 } },
    { Header: "Static Selector", accessor: "static", style: { minWidth: 100 } },
    {
      Header: "Description",
      accessor: "description",
      style: { minWidth: 100 },
    },
  ];
  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((element) => (
              <HvTableCell key={element.Header}>{element.Header}</HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {Object.entries(classes).map(([classKey, value]) => (
            <HvTableRow>
              <HvTableCell>{classKey}</HvTableCell>
              <HvTableCell>{value}</HvTableCell>
              <HvTableCell>{}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

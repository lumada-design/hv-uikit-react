import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";

import { PropDescriptor } from "react-docgen/dist/Documentation";

export const PropsTable = ({ props }: { props: PropDescriptor }) => {
  const columns = [
    { Header: "Name", accessor: "name", style: { minWidth: 120 } },
    { Header: "Type", accessor: "type", style: { minWidth: 100 } },
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
          {Object.entries(props).map(([propKey, value]) => (
            <HvTableRow>
              <HvTableCell>{propKey}</HvTableCell>
              <HvTableCell>{value.flowType.name}</HvTableCell>
              <HvTableCell>{value.description}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

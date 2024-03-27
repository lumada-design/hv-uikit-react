import {
  HvEmptyState,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";
import { Ban } from "@hitachivantara/uikit-react-icons";

import { getColumns } from "../storiesUtils";

export const NoData = () => (
  <HvTableContainer>
    <HvTable>
      <HvTableHead>
        <HvTableRow>
          {getColumns().map((el) => (
            <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
          ))}
        </HvTableRow>
      </HvTableHead>
      <HvTableBody>
        <HvTableRow>
          <HvTableCell colSpan={100} style={{ height: 96 }}>
            <HvEmptyState message="No data to display." icon={<Ban />} />
          </HvTableCell>
        </HvTableRow>
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);

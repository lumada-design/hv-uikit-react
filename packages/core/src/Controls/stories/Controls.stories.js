import React from "react";
import ControlsRoot from "..";

export default {
  title: "Components/Controls",
  parameters: {
    componentSubtitle: "",
    usage: 'import { Controls } from "@hitachivantara/uikit-react-core"',
  },
  component: ControlsRoot,
};

export const Controls = () => (
  <ControlsRoot
    rightControlsProps={{
      values: [
        { id: "id-1", label: "value 1", selected: true },
        { id: "id-2", label: "value 2" },
        { id: "id-3", label: "value 3" },
        { id: "id-4", label: "value 4" },
      ],
    }}
    columns={React.useMemo(
      () => [
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName",
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              // Use our custom `fuzzyText` filter on this column
              filter: "fuzzyText",
            },
          ],
        },
      ],
      []
    )}
  />
);

import { useData } from "nextra/hooks";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import type { HvTableColumnConfig } from "@hitachivantara/uikit-react-core";

type ClassItem = {
  name: string;
  selector: string;
};

const columns: HvTableColumnConfig<ClassItem, string>[] = [
  {
    Header: "Key",
    accessor: "name",
  },
  {
    Header: "Class",
    accessor: "selector",
  },
];

export const Classes = () => {
  const { meta } = useData();

  const classesToShow: ClassItem[] = Object.entries(meta.classes).map(
    ([name, selector]) => ({
      name,
      selector: selector as string,
    }),
  );

  return (
    <div className="flex flex-col">
      <HvTypography variant="title3">{meta.component} classes</HvTypography>
      <HvTypography className="mt-xs mb-md">
        Classes of each component are available in the Component.classes object.
      </HvTypography>
      <HvTableContainer className="!bg-transparent">
        <HvTable>
          <HvTableHead>
            <HvTableRow className="table-row border-atmo3 !bg-transparent">
              {columns.map((el, i) => (
                <HvTableHeader
                  key={el.Header}
                  className={`!bg-transparent ${i === 0 ? "!pl-1" : ""}`}
                >
                  {el.Header}
                </HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {classesToShow.map((c: ClassItem) => (
              <HvTableRow
                key={c.name}
                className="table-row border-atmo3 !bg-transparent"
              >
                <HvTableCell className="w-[25%] !pl-1">
                  <HvTypography>{c.name}</HvTypography>
                </HvTableCell>
                <HvTableCell>
                  <HvTypography className="!text-primary_80 !text-[12px]">
                    <pre>.{c.selector}</pre>
                  </HvTypography>
                </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </div>
  );
};

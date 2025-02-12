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
  { Header: "Key", accessor: "name" },
  { Header: "CSS Class", accessor: "selector" },
];

export const Classes = () => {
  const { meta } = useData();

  const classesToShow = Object.entries(meta.classes).map(
    ([name, selector]) => ({ name, selector }) as ClassItem,
  );

  return (
    <div className="flex flex-col">
      <HvTypography variant="title3">{meta.component} classes</HvTypography>
      <HvTypography className="mt-xs mb-md">
        The following classes are available in the component{" "}
        <code className="nextra-code">classes</code> property.
      </HvTypography>
      <HvTableContainer className="!bg-transparent">
        <HvTable>
          <HvTableHead>
            <HvTableRow className="!bg-transparent">
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
            {classesToShow.map((c) => (
              <HvTableRow
                key={c.name}
                id={`class-${c.name}`}
                className="!bg-transparent"
              >
                <HvTableCell className="w-[25%] !pl-1">
                  <a
                    href={`#class-${c.name}`}
                    className="[&>span]:hover:visible"
                  >
                    <code>{c.name}</code>
                    <span className="opacity-40 invisible">{` #`}</span>
                  </a>
                </HvTableCell>
                <HvTableCell>
                  <pre className="!text-primary_80 !text-[12px]">
                    {`.${c.selector}`}
                  </pre>
                </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </div>
  );
};

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import { useState } from "react";

import { Columns, SplitterTable } from "~/components/SplitterTable";

export function Component() {
  const [data] = useState(() => baseData.trimStart().repeat(4));
  const [columns, setColumns] = useState<Columns>({ 0: "1" }); // initial column required

  return (
    <SplitterTable
      data={data}
      columns={columns}
      onColumnsChange={(cols) => setColumns(sortNumberColumns(cols))}
    />
  );
}

/** order numeric-only column names */
function sortNumberColumns(columns: Columns) {
  const numericCols = Object.entries(columns)
    .filter(([, name]) => /^\d+$/.test(name))
    .toSorted(([a], [b]) => Number(a) - Number(b));

  const newCols = { ...columns };
  numericCols.forEach(([index], i) => {
    newCols[Number(index)] = String(i + 1);
  });

  return newCols;
}

// ID     Name                        Age Location    Occupation       Salary   Department    Email                     Phone
const baseData = `
10001  Lazarus      Stormcloak     30  New York    Engineer         70000    R&D           lazarus@example.com       123-456-7890
10002  Eleonora     Stormcloak     51  London      Manager          85000    HR            eleonora@example.com      234-567-8901
10003  Silvermoon   Shadowdancer   32  Portugal    Designer         65000    Design        silvermoon@example.com    345-678-9012
10004  Marigold     Winterfell     45  India       Developer        75000    IT            marigold@example.com      456-789-0123
10005  Cassian      Darkwater      39  France      Analyst          72000    Finance       cassian@example.com       567-890-1234
10006  Ophelia      Ravenshroud    48  Spain       Consultant       80000    Consulting    ophelia@example.com       678-901-2345
10007  Atticus      Withertom      29  London      Engineer         70000    R&D           atticus@example.com       789-012-3456
10008  Calliope     Riverstone     41  Portugal    Manager          85000    HR            calliope@example.com      890-123-4567
10009  Oberon       Frostwolf      46  India       Designer         65000    Design        oberon@example.com        901-234-5678
10010  Theodora     Moonshadow     57  France      Developer        75000    IT            theodora@example.com      012-345-6789
10011  Zephyrus     Nightshade     36  New York    Analyst          72000    Finance       zephyrus@example.com      123-456-7890
10012  Persephone   Wildwood       38  London      Consultant       80000    Consulting    persephone@example.com    234-567-8901
10013  Seraphim     Foxglove       44  Spain       Engineer         70000    R&D           seraphim@example.com      345-678-9012
10014  Orion        Thunderforge   60  India       Manager          85000    HR            orion@example.com         456-789-0123
`;

import { sortOperationSetup, sortValues } from "../Sort";

describe("Sort ", () => {
  const values = [
    {
      id: 1,
      name: "Z",
      serialNumber: 542231,
      birthDate: "1946-01-22",
    },
    {
      id: 2,
      name: "H",
      serialNumber: 9912313,
      birthDate: "1971-04-24",
    },
    {
      id: 3,
      name: "A",
      serialNumber: 9912314,
      birthDate: "1971-07-14",
    },
  ];

  it("should sort by alpha-numeric", () => {
    const metadata = [
      {
        id: "id",
        title: "title",
        accessor: "name",
        cellType: "Alpha-numeric",
        sortable: true,
        searchFunction: null,
      },
    ];

    const criterion = sortOperationSetup(metadata);

    const [ascCriteria, descCriteria] = criterion;

    let sortFunction = sortValues(ascCriteria);

    let sortValue = values.sort(sortFunction);

    expect(sortValue[0].id).toBe(3);
    expect(sortValue[1].id).toBe(2);
    expect(sortValue[2].id).toBe(1);

    sortFunction = sortValues(descCriteria);

    sortValue = values.sort(sortFunction);

    expect(sortValue[0].id).toBe(1);
    expect(sortValue[1].id).toBe(2);
    expect(sortValue[2].id).toBe(3);
  });

  it("should sort by date", () => {
    const metadata = [
      {
        id: "id",
        accessor: "birthDate",
        cellType: "date",
        sortable: true,
        searchFunction: null,
      },
    ];

    const criterion = sortOperationSetup(metadata);

    const [ascCriteria, descCriteria] = criterion;

    let sortFunction = sortValues(ascCriteria);

    let sortValue = values.sort(sortFunction);

    expect(sortValue[0].id).toBe(1);
    expect(sortValue[1].id).toBe(2);
    expect(sortValue[2].id).toBe(3);

    sortFunction = sortValues(descCriteria);

    sortValue = values.sort(sortFunction);

    expect(sortValue[0].id).toBe(3);
    expect(sortValue[1].id).toBe(2);
    expect(sortValue[2].id).toBe(1);
  });
});

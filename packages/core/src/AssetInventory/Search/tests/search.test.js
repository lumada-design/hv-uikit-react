import { filter, searchOperation } from "../Search";

describe("Search ", () => {
  const values = [
    {
      rank: "Gunnery Sargent",
      branch: "Marines",
      name: "Hartman",
      serialNumber: 542231,
      birthDate: "1946-01-22",
    },
    {
      rank: "Private",
      branch: "Marines",
      name: "Leonard Lawrence",
      serialNumber: 9912313,
      birthDate: "1971-04-24",
    },
    {
      rank: "Private",
      branch: "Army",
      name: "J.T. Davis",
      serialNumber: 9912314,
      birthDate: "1971-07-14",
    },
  ];

  it("should filter alpha-numeric", () => {
    const criteria = {
      id: "id",
      title: "title",
      accessor: "name",
      cellType: "Alpha-numeric",
      searchable: true,
      searchFunction: null,
    };

    const value = values[0];
    let filteredValues = filter(value, criteria, "man");

    expect(filteredValues).toBe(true);

    filteredValues = filter(value, criteria, "xt");

    expect(filteredValues).toBe(false);
  });

  it("should filter number", () => {
    const criteria = {
      id: "id",
      title: "title",
      accessor: "serialNumber",
      cellType: "numeric",
      searchable: true,
      searchFunction: null,
    };

    const value = values[0];
    let filteredValues = filter(value, criteria, 54);

    expect(filteredValues).toBe(true);

    filteredValues = filter(value, criteria, 20);

    expect(filteredValues).toBe(false);
  });

  it("should filter date", () => {
    const criteria = {
      id: "id",
      title: "age",
      accessor: "birthDate",
      cellType: "date",
      searchable: true,
      searchFunction: null,
    };

    const value = values[0];
    let filteredValues = filter(value, criteria, "1946-01-22");

    expect(filteredValues).toBe(true);

    filteredValues = filter(value, criteria, "1946-01-23");

    expect(filteredValues).toBe(false);
  });

  it("should use custom filter", () => {
    const criteria = {
      id: "id",
      title: "age",
      accessor: "birthDate",
      cellType: "date",
      searchable: true,
      searchFunction: (value, searchValue) => {
        const splitted = searchValue.split("-");
        const searchValueYear = Number(splitted[2]);
        const valueDate = new Date(value).getFullYear();
        return searchValueYear === valueDate;
      },
    };

    const value = values[0];
    let filteredValues = filter(value, criteria, "22-01-1946");

    expect(filteredValues).toBe(true);

    filteredValues = filter(value, criteria, "23-01-1947");

    expect(filteredValues).toBe(false);
  });

  it("should filter by value", () => {
    const criteria1 = [
      {
        id: "id",
        title: "title",
        accessor: "rank",
        cellType: "Alpha-numeric",
        searchable: true,
        searchFunction: null,
      },
    ];

    let filteredValues = searchOperation("a", values, criteria1);

    expect(filteredValues.length).toBe(3);

    const criteria2 = [
      {
        id: "id",
        title: "title",
        accessor: "serialNumber",
        cellType: "numeric",
        searchable: true,
        searchFunction: null,
      },
    ];

    filteredValues = searchOperation(2134, values, criteria2);

    expect(filteredValues.length).toBe(0);

    const criteria3 = [
      {
        id: "id",
        title: "title",
        accessor: "branch",
        cellType: "Alpha-numeric",
        searchable: true,
        searchFunction: null,
      },
      {
        id: "id",
        title: "title",
        accessor: "name",
        cellType: "Alpha-numeric",
        searchable: true,
        searchFunction: null,
      },
      {
        id: "id",
        title: "title",
        accessor: "rank",
        cellType: "Alpha-numeric",
        searchable: true,
        searchFunction: null,
      },
    ];

    filteredValues = searchOperation("r", values, criteria3);

    expect(filteredValues.length).toBe(3);
  });
});

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { sortOperationSetup, sortValues } from "../Sort";

describe("Sort ", () => {
  const values = [
    {
      id: 1,
      name: "Z",
      serialNumber: 542231,
      birthDate: "1946-01-22"
    },
    {
      id: 2,
      name: "H",
      serialNumber: 9912313,
      birthDate: "1971-04-24"
    },
    {
      id: 3,
      name: "A",
      serialNumber: 9912314,
      birthDate: "1971-07-14"
    }
  ];

  it("should sort by alpha-numeric", () => {
    const metadata = [
      {
        id: "id",
        title: "title",
        accessor: "name",
        cellType: "Alpha-numeric",
        sortable: true,
        searchFunction: null
      }
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
        searchFunction: null
      }
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

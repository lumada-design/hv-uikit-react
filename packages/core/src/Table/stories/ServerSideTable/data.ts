import useSWRInfinite from "swr/infinite";
import { loadArrow, desc } from "arquero";
import ColumnTable from "arquero/dist/types/table/column-table";

const RowIndex = Symbol("rowIndex");
function rowProxy(table: ColumnTable) {
  const fields: string[] = [];
  fields.push(...table.columnNames());

  return (i: number) => {
    const r = {};
    r[RowIndex] = i;
    fields.forEach((name) => {
      // skip columns with duplicate names
      if (Object.prototype.hasOwnProperty.call(r, name) || !name) return;

      Object.defineProperty(r, name, {
        get() {
          return table.get(name, this[RowIndex]);
        },
        set() {
          throw Error("Field values can not be overwritten.");
        },
        enumerable: true,
        configurable: false,
      });
    });
    return r;
  };
}

function proxyArqueroAsArrayOfObjects<T>(table?: ColumnTable): T[] {
  if (!table) {
    return [];
  }

  const proxy = rowProxy(table);
  const rows = new Array(table.numRows());

  for (let i = 0, n = rows.length; i < n; ++i) {
    rows[i] = proxy(i);
  }

  return rows;
}

let data: ColumnTable;

/**
 * Simulates fetching data from a REST API endpoint.
 * It expects an URL pointing to an Arrow file and search parameters for pagination,
 * filtering, and sorting.
 *
 * It loads the data from an Arrow file and simulates a delay for loading.
 * If the data has not been loaded previously, it loads the Arrow file from the provided URL.
 * Once loaded, it applies any filtering and sorting specified in the URL parameters.
 * Finally, it returns a portion of the processed data based on pagination parameters.
 *
 * The underlying arquero table is hidden from the caller, and the data is returned looking
 * as an array of objects.
 *
 * @template T
 * @param {string} url - The URL to fetch data from. Must point to an Arrow file.
 * @returns {Promise<T[]>} - A promise resolving to the fetched data.
 */
async function fakeFetcher<T>(url: string) {
  console.log("Pretending to fetch", url);

  const fullUrl = new URL(url);
  const index = Number(fullUrl.searchParams.get("pageIndex"));
  const pageSize = Number(fullUrl.searchParams.get("pageSize"));
  const filter = fullUrl.searchParams.get("filter");
  const sortBy = fullUrl.searchParams.getAll("sortBy");
  const urlWithoutParams = url.split("?")[0];

  if (data == null) {
    // @ts-expect-error options should be optional
    data = await loadArrow(urlWithoutParams);

    // uncomment to limit the number of rows and more easily reach the end of the data
    // data = data.slice(0, 50);
  }

  // simulate delay for loading
  await new Promise((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(resolve, 100 + Math.random() * 1000)
  );

  let processedData = data;
  if (filter) {
    processedData = data.filter(
      `d => op.includes(d["Territory"], "${filter}") || op.includes(d["Country"], "${filter}") || op.includes(d["State Province"], "${filter}") || op.includes(d["City"], "${filter}") || op.includes(d["Type"], "${filter}") || op.includes(d["Line"], "${filter}") || op.includes(d["Vendor"], "${filter}") || op.includes(d["Product"], "${filter}") || op.includes(d["Years"], "${filter}") || op.includes(d["Quarters"], "${filter}") || op.includes(d["Months"], "${filter}") || op.includes(d["Credit Limit"], "${filter}") || op.includes(d["Customer"], "${filter}") || op.includes(d["Quantity"], "${filter}") || op.includes(d["Sales"], "${filter}")`
    );
  }
  const sort = sortBy.filter((s) => s.includes(":"));
  if (sort.length > 0) {
    processedData = data.orderby(
      ...sort.map((s) => {
        const [col, dir] = s.split(":");
        return dir === "desc" ? desc(col) : col;
      })
    );
  }

  return proxyArqueroAsArrayOfObjects<T>(
    processedData.slice(index * pageSize, (index + 1) * pageSize)
  );
}

function getKey<T>(url: string = "") {
  const fullUrl = new URL(url);
  const pageSize = Number(fullUrl.searchParams.get("pageSize"));

  return (pageIndex: number, previousPageData: T[] | null) => {
    if (previousPageData && previousPageData.length < pageSize) {
      return null;
    }

    return `${url}&pageIndex=${pageIndex}`;
  };
}

export function useData<T>(url?: string) {
  return useSWRInfinite<T[]>(getKey(url), fakeFetcher, {
    revalidateFirstPage: false,
  });
}

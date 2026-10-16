/* Fixture: the on-system page from the 7487 list-page run (with context). Must pass every check. */
import { useCallback, useEffect, useState } from "react";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvEmptyState,
  HvGlobalActions,
  HvPagination,
  HvSkeleton,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  HvTag,
} from "@pentaho/uikit-react-core";

import { deleteDataset, fetchDatasets } from "./api";
import type { Dataset, DatasetStatus } from "./api";

const PAGE_SIZE = 10;

const statusTag: Record<
  DatasetStatus,
  { label: string; color: "positive" | "warning" | "negative" }
> = {
  draft: { label: "Draft", color: "warning" },
  published: { label: "Published", color: "positive" },
  failed: { label: "Failed", color: "negative" },
};

const formatDate = (iso: string, locale = navigator.language) =>
  new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

type LoadState = "loading" | "error" | "loaded";

export function DatasetsPage({ onCreate }: { onCreate: () => void }) {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<Dataset[]>([]);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState<Dataset | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const load = useCallback(async (p: number) => {
    setState("loading");
    try {
      const res = await fetchDatasets(p, PAGE_SIZE);
      setItems(res.items);
      setTotal(res.total);
      setState("loaded");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setState("error");
    }
  }, []);

  useEffect(() => {
    void load(page);
  }, [load, page]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteDataset(toDelete.id);
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Delete failed");
      return;
    }
    setToDelete(null);
    setDeleteError("");
    // If the last row of the last page was removed, step back a page.
    const newPage = items.length === 1 && page > 0 ? page - 1 : page;
    if (newPage !== page) setPage(newPage);
    else await load(page);
  };

  const closeDialog = () => {
    setToDelete(null);
    setDeleteError("");
  };

  const createButton = <HvButton onClick={onCreate}>New dataset</HvButton>;

  let content;
  if (state === "loading" && items.length === 0) {
    content = (
      <HvSkeleton
        variant="square"
        width="100%"
        height={240}
        role="progressbar"
        aria-label="Loading datasets"
      />
    );
  } else if (state === "error") {
    content = (
      <HvEmptyState
        icon={null}
        title="Couldn't load datasets"
        message={error}
        action={
          <HvButton variant="secondaryGhost" onClick={() => void load(page)}>
            Try again
          </HvButton>
        }
      />
    );
  } else if (state === "loaded" && total === 0) {
    content = (
      <HvEmptyState
        icon={null}
        title="No datasets yet"
        message="Create a dataset to start exploring your data."
        action={createButton}
      />
    );
  } else {
    content = (
      <HvTableSection>
        <HvTable aria-label="Datasets">
          <HvTableHead>
            <HvTableRow>
              <HvTableHeader>Name</HvTableHeader>
              <HvTableHeader>Owner</HvTableHeader>
              <HvTableHeader>Status</HvTableHeader>
              <HvTableHeader>Last updated</HvTableHeader>
              <HvTableHeader>Actions</HvTableHeader>
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {items.map((d) => (
              <HvTableRow key={d.id}>
                <HvTableCell>{d.name}</HvTableCell>
                <HvTableCell>{d.owner}</HvTableCell>
                <HvTableCell>
                  <HvTag
                    type="semantic"
                    color={statusTag[d.status].color}
                    label={statusTag[d.status].label}
                  />
                </HvTableCell>
                <HvTableCell>{formatDate(d.updatedAt)}</HvTableCell>
                <HvTableCell>
                  <HvButton
                    variant="negativeGhost"
                    onClick={() => setToDelete(d)}
                  >
                    Delete
                  </HvButton>
                </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
        <HvPagination page={page} pages={pages} onPageChange={setPage} />
      </HvTableSection>
    );
  }

  return (
    <div className="flex flex-col gap-md p-md">
      <HvGlobalActions title="Datasets" backButton={false}>
        {createButton}
      </HvGlobalActions>
      {content}
      <HvDialog
        open={toDelete !== null}
        onClose={closeDialog}
        aria-labelledby="delete-dataset-title"
      >
        <HvDialogTitle id="delete-dataset-title">
          Delete "{toDelete?.name}"?
        </HvDialogTitle>
        <HvDialogContent>
          {deleteError
            ? `Couldn't delete the dataset: ${deleteError}`
            : "The dataset will be permanently removed."}
        </HvDialogContent>
        <HvDialogActions>
          <HvButton
            variant="negativeGhost"
            onClick={() => void confirmDelete()}
          >
            Delete
          </HvButton>
          <HvButton variant="secondaryGhost" onClick={closeDialog}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
}

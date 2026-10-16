/* Fixture: every checked rule is broken at least once, on a known line. */
// Not real code; line numbers are asserted in tools.test.ts.
import {
  HvAvatar,
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTable,
  HvTableBody,
} from "@pentaho/uikit-react-core";

declare const events: { id: string; name: string; createdAt: string }[];
declare function deleteEvent(id: string): Promise<void>;
declare function removeTag(id: string): Promise<void>;

const columns = [{ Header: "Created", accessor: "createdAt" }];

export const OffSystemPage = ({ open }: { open: boolean }) => {
  const remove = (id: string) => deleteEvent(id);
  return (
    <div style={{ padding: "24px", color: "#3b82f6" }}>
      <h2>Events 🚀</h2>
      <HvButton variant="danger">Save</HvButton>
      <HvButton icon onClick={() => removeTag("x")}>
        <span />
      </HvButton>
      <button onClick={() => remove("1")}>Delete</button>
      <HvAvatar src="me.png" />
      <HvAvatar variant="round" alt="Me" />
      <div className="card shadow">
        <span className="tag">Draft</span>
        {events[0].createdAt}
        <HvTable>
          <HvTableBody />
        </HvTable>
      </div>
      <HvDialog open={open} variant="warning">
        <HvDialogTitle>Delete event?</HvDialogTitle>
        <HvDialogContent>This cannot be undone.</HvDialogContent>
        <HvDialogActions>
          <HvButton variant="primary">Delete</HvButton>
        </HvDialogActions>
      </HvDialog>
      <p className="p-[13px] text-[#ff0000]">{columns.length}</p>
    </div>
  );
};

import { Panel, PanelList } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import useAppStore from "lib/store/useAppStore";
import { groupBy } from "lib/utils";

export const Sections = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  const { components } = useAppStore();

  const grouped = groupBy(components, "section");

  return (
    <Panel label={selected}>
      <PanelList
        items={grouped}
        showSearch={false}
        groupItems={false}
        layout="list"
      />
    </Panel>
  );
};

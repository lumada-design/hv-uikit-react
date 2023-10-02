import { Panel, PanelList } from "components/common";
import { useEditorStore } from "lib/hooks/useEditorStore";
import { groupBy } from "lib/utils";

export const Sections = () => {
  const {
    leftPanel: { selected },
    components,
  } = useEditorStore();

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

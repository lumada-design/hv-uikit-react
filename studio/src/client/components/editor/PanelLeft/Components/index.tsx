import { Panel, PanelList } from "components/common";
import { useEditorStore } from "lib/hooks/useEditorStore";
import { groupBy } from "lib/utils";

export const Components = () => {
  const {
    leftPanel: { selected },
    components,
  } = useEditorStore();

  const grouped = groupBy(components, "component");

  return (
    <Panel label={selected}>
      <PanelList items={grouped} />
    </Panel>
  );
};

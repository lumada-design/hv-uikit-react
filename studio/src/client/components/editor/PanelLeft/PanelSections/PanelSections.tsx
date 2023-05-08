import { Panel, PanelList } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import { useComponents } from "lib/api/useComponents";

export const PanelSections = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  const { data = {}, isLoading } = useComponents();
  const { sections } = data;

  return (
    <Panel label={selected}>
      <PanelList
        items={{ sections }}
        loading={isLoading}
        showSearch={false}
        groupItems={false}
        layout="list"
      />
    </Panel>
  );
};

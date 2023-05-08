import { Panel, PanelList } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import { useComponents } from "lib/api/useComponents";

export const PanelComponents = () => {
  const {
    leftPanel: { selected },
  } = useEditorStore();

  const { data = {}, isLoading } = useComponents();
  const { sections, ...components } = data;

  return (
    <Panel label={selected}>
      <PanelList items={components} loading={isLoading} />
    </Panel>
  );
};

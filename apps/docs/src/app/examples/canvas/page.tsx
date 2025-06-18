import canvasContext from "../../../../../../templates/Canvas/Context?raw";
import canvasMain from "../../../../../../templates/Canvas/index?raw";
import canvasListView from "../../../../../../templates/Canvas/ListView?raw";
import canvasNode from "../../../../../../templates/Canvas/Node?raw";
import canvasSidebar from "../../../../../../templates/Canvas/Sidebar?raw";
import canvasStatusEdge from "../../../../../../templates/Canvas/StatusEdge?raw";
import canvasStyles from "../../../../../../templates/Canvas/styles?raw";
import canvasTable from "../../../../../../templates/Canvas/Table?raw";
import canvasTreeView from "../../../../../../templates/Canvas/TreeView?raw";
import canvasUtils from "../../../../../../templates/Canvas/utils?raw";
import { CodeBlock } from "../../../components/code/CodeBlock";

export default function Page() {
  return (
    <div className="mt-20">
      <CodeBlock
        code={{
          main: canvasMain,
          "./utils": canvasUtils,
          "./styles": canvasStyles,
          "./Context": canvasContext,
          "./ListView": canvasListView,
          "./Node": canvasNode,
          "./Sidebar": canvasSidebar,
          "./StatusEdge": canvasStatusEdge,
          "./Table": canvasTable,
          "./TreeView": canvasTreeView,
        }}
      />
    </div>
  );
}

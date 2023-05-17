import { useContext } from "react";
import { HvFilterGroupContext } from "../FilterGroupContext";
import { HvListContainer, HvListItem, HvPanel } from "@core/components";
import { setId, wrapperTooltip } from "@core/utils";
import { HvFilterGroupCounter } from "../Counter";
import { ClassNames } from "@emotion/react";
import { styles } from "./LeftPanel.styles";
import filterGroupLeftPanelClasses, {
  HvFilterGroupLeftPanelClasses,
} from "./leftPanelClasses";

export interface HvFilterGroupLeftPanelProps {
  id?: string;
  className?: string;
  emptyElement?: React.ReactNode;
  classes?: HvFilterGroupLeftPanelClasses;
}

export const HvFilterGroupLeftPanel = ({
  id,
  className,
  emptyElement,
  classes,
}: HvFilterGroupLeftPanelProps) => {
  const { filterOptions, activeGroup, setActiveGroup } =
    useContext(HvFilterGroupContext);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvPanel id={setId(id, "leftPanel")} className={className}>
          {filterOptions.length > 0 ? (
            <HvListContainer
              id={setId(id, "leftPanel-list")}
              condensed
              interactive
            >
              {filterOptions.map((group, index) => {
                const ItemText = wrapperTooltip(true, group.name, group.name);

                return (
                  <HvListItem
                    id={group.id}
                    key={group.name}
                    className={cx(
                      filterGroupLeftPanelClasses.listItem,
                      css(styles.listItem),
                      classes?.listItem
                    )}
                    onClick={() => setActiveGroup(index)}
                    selected={filterOptions[activeGroup].id === group.id}
                    endAdornment={<HvFilterGroupCounter id={group.id} />}
                  >
                    <ItemText />
                  </HvListItem>
                );
              })}
            </HvListContainer>
          ) : (
            emptyElement
          )}
        </HvPanel>
      )}
    </ClassNames>
  );
};

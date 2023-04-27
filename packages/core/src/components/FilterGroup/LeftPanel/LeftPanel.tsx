import { useContext } from "react";
import { HvFilterGroupContext } from "../FilterGroupContext";
import { HvListContainer, HvListItem, HvPanel } from "@core/components";
import { setId, wrapperTooltip } from "@core/utils";
import { HvFilterGroupCounter } from "../Counter";
import { ClassNames } from "@emotion/react";
import { styles } from "./LeftPanel.styles";

export interface HvFilterGroupLeftPanelProps {
  id?: string;
  className?: string;
  emptyElement?: React.ReactNode;
}

export const HvFilterGroupLeftPanel = ({
  id,
  className,
  emptyElement,
}: HvFilterGroupLeftPanelProps) => {
  const { filterOptions, activeGroup, setActiveGroup } =
    useContext(HvFilterGroupContext);

  return (
    <ClassNames>
      {({ css }) => (
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
                    className={css(styles.listItem)}
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

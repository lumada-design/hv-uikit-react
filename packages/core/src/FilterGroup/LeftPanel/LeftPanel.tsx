import { useContext } from "react";

import { HvListContainer, HvListItem } from "../../ListContainer";
import { HvPanel } from "../../Panel";
import { ExtractNames } from "../../utils/classes";
import { setId } from "../../utils/setId";
import { wrapperTooltip } from "../../utils/wrapperTooltip";

import { HvFilterGroupCounter } from "../Counter";
import { HvFilterGroupContext } from "../FilterGroupContext";
import { staticClasses, useClasses } from "./LeftPanel.styles";

export { staticClasses as filterGroupLeftPanelClasses };

export type HvFilterGroupLeftPanelClasses = ExtractNames<typeof useClasses>;

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
  classes: classesProp,
}: HvFilterGroupLeftPanelProps) => {
  const { classes, cx } = useClasses(classesProp);
  const { filterOptions, activeGroup, setActiveGroup } =
    useContext(HvFilterGroupContext);

  return (
    <HvPanel id={setId(id, "leftPanel")} className={className}>
      {filterOptions.length > 0 ? (
        <HvListContainer id={setId(id, "leftPanel-list")} condensed interactive>
          {filterOptions.map((group, index) => {
            const ItemText = wrapperTooltip(true, group.name, group.name);

            return (
              <HvListItem
                id={group.id}
                key={group.name}
                className={cx(classes.listItem)}
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
  );
};

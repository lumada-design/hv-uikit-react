import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { HvPanel, HvListContainer, HvListItem, setId } from "../..";
import { FilterGroupContext } from "../FilterGroupContext";
import Counter from "../Counter";
import useStyles from "./styles";
import { wrapperTooltip } from "../../List/utils";

const LeftPanel = ({ id, className, emptyElement }) => {
  const classes = useStyles();
  const { filterOptions, activeGroup, setActiveGroup } = useContext(FilterGroupContext);

  return (
    <HvPanel id={setId(id, "leftPanel")} className={clsx(className, classes.root)}>
      {filterOptions.length > 0 ? (
        <HvListContainer id={setId(id, "leftPanel-list")} condensed interactive>
          {filterOptions.map((group, index) => {
            const ItemText = wrapperTooltip(true, group.name, group.name);
            return (
              <HvListItem
                id={group.id}
                className={classes.filterItem}
                key={group.name}
                onClick={() => setActiveGroup(index)}
                selected={filterOptions[activeGroup].id === group.id}
                endAdornment={<Counter id={group.id} />}
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

LeftPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  emptyElement: PropTypes.node,
};

export default LeftPanel;

import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { HvPanel, HvListContainer, HvListItem, setId } from "../..";
import { FilterGroupContext } from "../FilterGroupContext";
import Counter from "../Counter";
import useStyles from "./styles";

const LeftPanel = ({ id, className }) => {
  const classes = useStyles();
  const { filterOptions, activeGroup, setActiveGroup } = useContext(FilterGroupContext);

  return (
    <HvPanel id={setId(id, "leftPanel")} className={clsx(className, classes.root)}>
      <HvListContainer id={setId(id, "leftPanel-list")} condensed interactive>
        {filterOptions.map((group, index) => (
          <HvListItem
            id={group.id}
            key={group.name}
            onClick={() => setActiveGroup(index)}
            selected={filterOptions[activeGroup].id === group.id}
            endAdornment={<Counter id={group.id} />}
          >
            {group.name}
          </HvListItem>
        ))}
      </HvListContainer>
    </HvPanel>
  );
};

LeftPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default LeftPanel;

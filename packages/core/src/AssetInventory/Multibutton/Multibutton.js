import React, { memo } from "react";
import PropTypes from "prop-types";
import HvMultiButton from "../../MultiButton";
import HvButton from "../../Button";
import { setId } from "../../utils";

const AssetMultiButton = ({ id, views, changeView, onViewChange = null }) => {
  const onChangeViewHandler = (event, buttonId) => {
    const btn = buttonId.replace("-button", "");
    changeView(event, btn);
    onViewChange(event, btn);
  };

  return (
    <HvMultiButton id={setId(id, "multi-button")}>
      {views.map(view => (
        <HvButton
          id={view.id}
          key={view.id}
          category="icon"
          selected={view.selected}
          onClick={evt => onChangeViewHandler(evt, view.id)}
        >
          {view.icon}
        </HvButton>
      ))}
    </HvMultiButton>
  );
};

AssetMultiButton.propTypes = {
  id: PropTypes.string,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  changeView: PropTypes.func.isRequired,
  onViewChange: PropTypes.func
};

const arePropsEqual = (props, nextProps) => props.views === nextProps.views;

export default memo(AssetMultiButton, arePropsEqual);

import React from "react";
import PropTypes from "prop-types";
import { HvMultiButton, HvButton, setId } from "@hitachivantara/uikit-react-core";

const AssetMultiButton = ({ id, views, selectedView, changeView, onViewChange }) => {
  const onChangeViewHandler = (event, idx) => {
    changeView?.(event, idx);
    onViewChange?.(event, idx);
  };

  return (
    <HvMultiButton id={setId(id, "multi-button")}>
      {views.map(({ id: btnId, icon, ...others }, idx) => (
        <HvButton
          id={btnId}
          key={btnId}
          icon
          selected={selectedView === idx}
          onClick={(evt) => onChangeViewHandler(evt, idx)}
          {...others}
        >
          {icon}
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
      icon: PropTypes.node,
    })
  ).isRequired,
  selectedView: PropTypes.number,
  changeView: PropTypes.func.isRequired,
  onViewChange: PropTypes.func,
};

export default AssetMultiButton;

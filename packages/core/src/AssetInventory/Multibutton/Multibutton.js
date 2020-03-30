import React, { memo } from "react";
import PropTypes from "prop-types";
import MultiButton from "../../MultiButton";

const AssetMultiButton = ({ id, views, changeView, onViewChange = null }) => {
  const options = [];

  views.map(view =>
    options.push({
      id: view.id,
      icon: view.icon,
      selected: view.selected ? true : undefined
    })
  );

  const onChangeViewHandler = (event, buttonId) => {
    changeView(event, buttonId);
    onViewChange(event, buttonId);
  };

  return (
    <MultiButton
      id={`multi_button_${id}`}
      buttons={options}
      type="icon"
      onChange={onChangeViewHandler}
      minSelection={1}
    />
  );
};

AssetMultiButton.propTypes = {
  id: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node
    })
  ).isRequired,
  changeView: PropTypes.func.isRequired,
  onViewChange: PropTypes.func
};

const arePropsEqual = (prevProps, nextProps) => prevProps.views === nextProps.views;

export default memo(AssetMultiButton, arePropsEqual);

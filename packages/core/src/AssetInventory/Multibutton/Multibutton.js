import React, { memo } from "react";
import PropTypes from "prop-types";
import MultiButton from "../../MultiButton";
import { setId } from "../../utils/setId";

const AssetMultiButton = ({ id, views, changeView, onViewChange = null }) => {
  const onChangeViewHandler = (event, buttonId) => {
    const ids = buttonId;
    ids[0] = buttonId[0].replace("-button", "");
    changeView(event, ids);
    onViewChange(event, ids);
  };

  return (
    <MultiButton
      id={setId(id, "multi-button")}
      buttons={views}
      type="icon"
      onChange={onChangeViewHandler}
      minSelection={1}
    />
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

const arePropsEqual = (prevProps, nextProps) => prevProps.views === nextProps.views;

export default memo(AssetMultiButton, arePropsEqual);

/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import EmptyStateIconComp from "@hv/uikit-react-icons/dist/Caution.L";
import Grid from '@material-ui/core/Grid';
import ListIcon from "@hv/uikit-react-icons/dist/List.S";
import CardsIcon from "@hv/uikit-react-icons/dist/Cards.S";
import CardsIconSelected from "@hv/uikit-react-icons/dist/CardsSelected.S";
import EmptySearchState from "../EmptyState";
import ListIconSelected from "./res/ListSelected.S.svg";

/**
 * Assets Inventory component.
 */
export class HvAssetInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: props.initialViewMode || HvAssetInventory.assetInventoryMode.CARDS
    };
  }

  changeViewMode(value, viewChangedHandler) {
    this.setState({
      viewMode: value
    });
    if(viewChangedHandler) {
      viewChangedHandler(value);
    }
  }

  render() {
    const { classes, assetsTitle, searchHandler, viewChangedHandler, renderEmptyState, listRenderComponent, cardRenderComponent, toolsScreenGridSize } = this.props;
    const { viewMode } = this.state;
    const viewModeCards = (viewMode === HvAssetInventory.assetInventoryMode.CARDS);
    const viewModeList = (viewMode === HvAssetInventory.assetInventoryMode.LIST);

    return (
      <div className={classes.container}>
        <div className={classes.title}>{assetsTitle}</div>
        <Grid container spacing={24} direction="row" justify="space-between" alignItems="stretch">
          <Grid
            item
            xs={toolsScreenGridSize.xs}
            sm={toolsScreenGridSize.sm}
            md={toolsScreenGridSize.md}
            lg={toolsScreenGridSize.lg}
            xl={toolsScreenGridSize.xl}
            className={classes.searchBoxContainer}
          >
            {searchHandler && <SearchBox onChange={e => searchHandler(e)} />}
          </Grid>
          <Grid item className={classes.viewModeContainer}>
            {viewModeCards && (
              <div>
                <span onClick={() => this.changeViewMode(HvAssetInventory.assetInventoryMode.LIST, viewChangedHandler)}>
                  <ListIcon className={classes.iconChangeView} />
                </span>
                <CardsIconSelected className={classes.icon} />
              </div>
            )}
            {viewModeList && (
              <div>
                <ListIconSelected className={classes.icon} />
                <span onClick={() => this.changeViewMode(HvAssetInventory.assetInventoryMode.CARDS, viewChangedHandler)}>
                  <CardsIcon className={classes.iconChangeView} />
                </span>
              </div>
            )}
          </Grid>
          {renderEmptyState && (
            <Grid item className={classes.emptyStateContainer}>
              <EmptySearchState
                title="There are no matching results."
                message="Please refine your search criteria."
                icon={<EmptyStateIconComp />}
              />
            </Grid>
          )}
          <Grid item className={classes.childrenListContainer}>
            {viewModeList ? listRenderComponent : cardRenderComponent}
          </Grid>
        </Grid>
      </div>
    );
  };
};

HvAssetInventory.assetInventoryMode = {
  LIST: "LIST",
  CARDS: "CARDS"
};

HvAssetInventory.propTypes = {
  /**
   * The start view mode to apply to the assets inventory.
   */
  initialViewMode: PropTypes.oneOf(Object.keys(HvAssetInventory.assetInventoryMode)),
  /**
   * Title to show in the top of the component
   */
  assetsTitle: PropTypes.string.isRequired,
  /**
   * Indicates that we want to render an empty search state
   */
  renderEmptyState: PropTypes.bool,
  /**
   * The handler that will be called with the search new value.
   */
  searchHandler: PropTypes.func,
  /**
   * The handler that will be called with the new view mode when it's changed.
   */
  viewChangedHandler: PropTypes.func,
  /**
   * The component node that should be used to render as a list.
   */
  listRenderComponent: PropTypes.node,
  /**
   * The component node that should be used to render as cards.
   */
  cardRenderComponent: PropTypes.node,
  /**
   * The Grid screen sizes for the 'tools' between the title and the items list.
   */
  toolsScreenGridSize: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  /**
   * A Jss Object used to override or extend the styles applied to the banner.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the component title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the search box.
     */
    searchBoxContainer: PropTypes.string,
    /**
     * Styles applied to the view mode toggle.
     */
    viewModeContainer: PropTypes.string,
    /**
     * Styles applied to component shown when the renderEmptyState prop is true.
     */
    emptyStateContainer: PropTypes.string,
    /**
     * Styles applied to the items rendered (applies to card or list).
     */
    childrenListContainer: PropTypes.string,
    /**
     * Styles applied to change view mode icon when that mode is selected.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to change view mode icon when that mode is not selected.
     */
    iconChangeView: PropTypes.string
  }).isRequired
};

HvAssetInventory.defaultProps = {
  initialViewMode: HvAssetInventory.assetInventoryMode.CARDS,
  searchHandler: undefined,
  viewChangedHandler: undefined,
  listRenderComponent: undefined,
  cardRenderComponent: undefined,
  renderEmptyState: false,
  toolsScreenGridSize: {xs: 12, sm: 6, md: 4, lg: 3, xl: 2}
};

export default HvAssetInventory;

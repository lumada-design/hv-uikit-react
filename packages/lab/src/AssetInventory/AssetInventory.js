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
import classNames from "classnames";
import PropTypes from "prop-types";
import EmptyStateIconComp from "@hv/uikit-react-icons/dist/Caution.L";
import Grid from "@material-ui/core/Grid";
import ListIcon from "@hv/uikit-react-icons/dist/List.S";
import CardsIcon from "@hv/uikit-react-icons/dist/Cards.S";
import CardsIconSelected from "@hv/uikit-react-icons/dist/CardsSelected.S";
import EmptySearchState from "../EmptyState";

/*  TODO: Review accessibility */

/*  eslint-disable  jsx-a11y/click-events-have-key-events */

/*  eslint-disable jsx-a11y/no-static-element-interactions */

/**
 * Assets Inventory component.
 */
export class HvAssetInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode:
        props.initialViewMode || HvAssetInventory.assetInventoryMode.CARDS
    };
  }

  changeViewMode(value) {
    const { viewChangedHandler } = this.props;

    this.setState({
      viewMode: value
    });
    if (viewChangedHandler) {
      viewChangedHandler(value);
    }
  }

  render() {
    const {
      theme,
      classes,
      assetsTitle,
      searchComponent,
      sortComponent,
      renderEmptyState,
      listRenderComponent,
      cardRenderComponent,
      filterComponents,
      cardViewButtonId,
      listViewButtonId
    } = this.props;
    const { viewMode } = this.state;
    const viewModeCards =
      viewMode === HvAssetInventory.assetInventoryMode.CARDS;
    const viewModeList = viewMode === HvAssetInventory.assetInventoryMode.LIST;

    const viewModeCardsButton = (
      <>
        {viewModeCards && <CardsIconSelected className={classes.icon} />}
        {viewModeList && <CardsIcon className={classes.iconChangeView} />}
      </>
    );

    const viewModeViewButton = (
      <>
        {viewModeCards && <ListIcon className={classes.iconChangeView} />}
        {viewModeList && (
          <ListIcon
            className={classes.icon}
            color={[
              theme.hv.palette.accent.acce1,
              theme.hv.palette.atmosphere.atmo2
            ]}
          />
        )}
      </>
    );

    const ViewModeButton = ({id, children, view}) => (
      <div
        {...id && { id }}
        role="presentation"
        onClick={() =>
          this.changeViewMode(view)
        }
      >
        {children}
      </div>
    );


    return (
      <div className={classes.container}>
        {assetsTitle && <div className={classes.title}>{assetsTitle}</div>}
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          className={classes.gridContainer}
        >
          <Grid item className={classNames(classes.clearPadding)}>
            <Grid container>
              {searchComponent}
            </Grid>
          </Grid>

          <Grid item className={classNames(classes.clearPadding)}>
            <Grid container>
              {sortComponent && <Grid item>{sortComponent}</Grid>}
              <Grid item className={classes.viewModeContainer}>
                <div className={classes.iconsWrapper}>
                  <ViewModeButton
                    {...listViewButtonId && { id: listViewButtonId }}
                    view={HvAssetInventory.assetInventoryMode.LIST}
                  >
                    {viewModeViewButton}
                  </ViewModeButton>
                  <ViewModeButton
                    {...cardViewButtonId && { id: cardViewButtonId }}
                    view={HvAssetInventory.assetInventoryMode.CARDS}
                  >
                    {viewModeCardsButton}
                  </ViewModeButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          {filterComponents}
        </Grid>
        {renderEmptyState && (
          <Grid container>
            <Grid item className={classes.emptyStateContainer}>
              <EmptySearchState
                title="There are no matching results."
                message="Please refine your search criteria."
                icon={<EmptyStateIconComp />}
              />
            </Grid>
          </Grid>
        )}
        <Grid container className={classes.childrenListContainer}>
          {viewModeList ? listRenderComponent : cardRenderComponent}
        </Grid>
      </div>
    );
  }
}

HvAssetInventory.assetInventoryMode = {
  LIST: "LIST",
  CARDS: "CARDS"
};

HvAssetInventory.propTypes = {
  /**
   * The start view mode to apply to the assets inventory.
   */
  initialViewMode: PropTypes.oneOf(["LIST", "CARDS"]),
  /**
   * Title to show in the top of the component
   */
  assetsTitle: PropTypes.string,
  /**
   * Indicates that we want to render an empty search state
   */
  renderEmptyState: PropTypes.bool,
  /**
   * The handler that will be called with the search new value.
   */
  searchComponent: PropTypes.node,
  /**
   * The initial value to be passed to the search box.
   */
  sortComponent: PropTypes.node,
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
  filterComponents: PropTypes.node,

  toolsScreenGridSize: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  /*

   */
  cardViewButtonId: PropTypes.string,
  /*

   */
  listViewButtonId: PropTypes.string,
  /**
   * JSS theme object.
   */
  theme: PropTypes.instanceOf(Object),
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
  assetsTitle: undefined,
  initialViewMode: "CARDS",
  theme: null,
  searchComponent: undefined,
  viewChangedHandler: undefined,
  listRenderComponent: undefined,
  cardRenderComponent: undefined,
  filterComponents: undefined,
  renderEmptyState: false,
  sortComponent: undefined,
  cardViewButtonId: undefined,
  listViewButtonId: undefined,
  toolsScreenGridSize: { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
};

export default HvAssetInventory;

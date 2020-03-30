import React from "react";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import { isNil, last } from "lodash";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import isBrowser from "../utils/browser";
import Title from "./Title";
import SearchBox from "../SearchBox";
import List from "../List";
import styles from "./styles";

const ANIMATION_DURATION = 200;

/**
 * Vertical navigation.
 *
 * @param classes
 * @param values
 * @returns {*}
 * @constructor
 */

class VerticalNavigation extends React.Component {
  constructor(props) {
    super(props);
    const { values, noAnimation } = this.props;
    const nValues = isNil(values) ? [] : [values];

    this.state = {
      /**
       * Arrays used to maintain a history to be possible to navigate through several sub-levels.
       */
      title: [],
      list: nValues,
      /**
       * Search string always set to "" in each level change.
       */
      searchStr: "",
      /**
       * Used to control the direction of the animation.
       */
      mirror: true,
      /**
       *  Used to control when to open the list with animation.
       */
      show: true,
      /**
       * Should use animation.If browser is IE, don't use animation.
       */
      showAnimation: isBrowser("ie") ? false : !noAnimation
    };
  }

  /**
   * Reset hidden property so the list doesn't maintain any filtered value.
   *
   * @returns {*[]}
   */
  resetHidden = list => {
    const newList = last(list).data.map(elem => {
      const newElem = { ...elem };
      newElem.isHidden = false;
      return newElem;
    });
    last(list).data = newList;
    return list;
  };

  /**
   * Sets the correct states.
   *
   * @param title
   * @param list
   * @param mirror
   * @param show
   */
  setStateProps = (title, list, mirror, show) => {
    this.setState({
      mirror,
      title,
      list,
      searchStr: "",
      show
    });
  };

  /**
   * When selecting a element. If the list as a sub-level defined, the navigation
   * advances to that sub-level.
   *
   * @param elem
   */
  onSelection = (event, elem) => {
    if (elem.subData) {
      const { list, title, showAnimation } = this.state;
      const newList = this.resetHidden(list);
      title.push(elem.label);
      newList.push(elem.subData);
      this.setState({
        mirror: true,
        show: false
      });
      if (showAnimation) {
        setTimeout(() => {
          this.setStateProps(title, newList, false, true);
        }, ANIMATION_DURATION);
      } else {
        this.setStateProps(title, newList, false, true);
      }
    } else {
      const { onClick } = this.props;
      onClick(elem);
    }
  };

  /**
   * Set the previous level of the list.
   */
  onReturn = () => {
    const { list, title, showAnimation } = this.state;
    const newList = this.resetHidden(list);
    title.pop();
    newList.pop();
    this.setState({
      mirror: false,
      show: false
    });
    if (showAnimation) {
      setTimeout(() => {
        this.setStateProps(title, newList, true, true);
      }, ANIMATION_DURATION);
    } else {
      this.setStateProps(title, newList, true, true);
    }
  };

  /**
   * Handler for the search.
   *
   * @param str
   */
  handleSearch = (event, str) => {
    const { list } = this.state;
    const { data } = last(list);
    const results = data
      ? data.filter(value => {
          const valNormalized = value.label.toLowerCase();
          const strNormalized = str.toLowerCase();
          return valNormalized.indexOf(strNormalized) >= 0;
        })
      : null;

    if (!isNil(results)) {
      const newData = data.map(elem => {
        const newElem = { ...elem };
        newElem.isHidden = results.find(result => result.label === elem.label) === undefined;
        return newElem;
      });
      last(list).data = newData;
      this.setState({ list });
    }
    this.setState({ searchStr: str });

    return str;
  };

  /**
   * Vertical navigation render.
   *
   * @returns {*}
   */
  renderVerticalNavigation = () => {
    const { classes, actionValues, onClickAction } = this.props;
    const { title, list, searchStr } = this.state;

    const currentTitle = last(title);
    const currentList = last(list);
    const isFirstLevel = list.length === 1;
    const showSearchBox = currentList.showSearch;
    const noValues =
      !isNil(currentList.data) && Array.isArray(currentList.data) && currentList.data.length > 0;

    return (
      <div className={classes.innerContainer}>
        {noValues && (
          <div className={classes.listContainer}>
            {currentTitle && <Title title={currentTitle} onClick={this.onReturn} />}
            {showSearchBox && (
              <div className={classes.searchBoxContainer}>
                <SearchBox onChange={this.handleSearch} value={searchStr} />
              </div>
            )}
            <div
              className={clsx(classes.scrollContainer, {
                [classes.withSearch]: showSearchBox && isFirstLevel,
                [classes.withTitle]: !showSearchBox && currentTitle,
                [classes.withTitleAndSearch]: showSearchBox && currentTitle
              })}
            >
              <List values={currentList.data} onClick={this.onSelection} selectDefault={false} />
            </div>
          </div>
        )}
        {isFirstLevel && actionValues && (
          <div
            className={clsx(classes.actionContainer, {
              [classes.soloActionContainer]: !noValues
            })}
          >
            <List values={actionValues} selectDefault={false} onClick={onClickAction} />
          </div>
        )}
      </div>
    );
  };

  render() {
    const { mirror, show, showAnimation } = this.state;
    const { classes, className } = this.props;

    return (
      <div className={clsx(classes.verticalContainer, className)}>
        {showAnimation && (
          <Fade right mirror={mirror} when={show} duration={ANIMATION_DURATION}>
            {this.renderVerticalNavigation()}
          </Fade>
        )}
        {!showAnimation && this.renderVerticalNavigation()}
      </div>
    );
  }
}

VerticalNavigation.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Styles applied to the element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     *  Styles applied to the root container.
     */
    verticalContainer: PropTypes.string,
    /**
     *  Styles applied to the inner container.
     */
    innerContainer: PropTypes.string,
    /**
     *  Styles applied to the list container.
     */
    listContainer: PropTypes.string,
    /**
     *  Styles applied to the search box container.
     */
    searchBoxContainer: PropTypes.string,
    /**
     *  Styles applied to the list container when the search exists.
     */
    withSearch: PropTypes.string,
    /**
     *  Styles applied to the list container when the title exists.
     */
    withTitle: PropTypes.string,
    /**
     *  Styles applied to the list container when the title and search exists.
     */
    withTitleAndSearch: PropTypes.string,
    /**
     *  Styles applied to the list container for scroll.
     */
    scrollContainer: PropTypes.string,
    /**
     *  Styles applied to the action container.
     */
    actionContainer: PropTypes.string,
    /**
     *  Styles applied to the action container when it is empty
     */
    soloActionContainer: PropTypes.string
  }).isRequired,
  values: PropTypes.shape({
    showSearch: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        isHidden: PropTypes.bool,
        iconCallback: PropTypes.func,
        showNavIcon: PropTypes.bool,
        subData: PropTypes.obj,
        path: PropTypes.string,
        params: PropTypes.instanceOf(Object)
      })
    )
  }),
  /**
   * Action list.
   */
  actionValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      isHidden: PropTypes.bool,
      iconCallback: PropTypes.func,
      showNavIcon: PropTypes.bool,
      subData: PropTypes.object,
      path: PropTypes.string,
      params: PropTypes.instanceOf(Object)
    })
  ),
  /**
   * Defines if the slide animation should be used. (Animation doesn't work in IE).
   */
  noAnimation: PropTypes.bool,
  /**
   * Function triggered with the selection in main list.
   */
  onClick: PropTypes.func,
  /**
   * Function triggered with the selection in action list.
   */
  onClickAction: PropTypes.func
};

VerticalNavigation.defaultProps = {
  values: [],
  actionValues: null,
  className: "",
  onClick: undefined,
  onClickAction: undefined,
  noAnimation: false
};

export default withStyles(styles, { name: "HvVerticalNavigation" })(VerticalNavigation);

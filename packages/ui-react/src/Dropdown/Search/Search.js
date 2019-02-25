/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@hv-ui/icons/core/S-icons/Search16";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (value !== prevProps.value) {
      this.handleSearch(value);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        ...state,
        value: props.value
      };
    }
    return state;
  }

  /**
   * filters the values based on the provided string.
   *
   * @param {String} str - The value that is being looked.
   * @memberof List
   */
  handleSearch(str) {
    const { values, onChange } = this.props;

    const filtered = values
      ? values.filter(value => {
          const valNormalized = value.label.toLowerCase();
          const strNormalized = str.toLowerCase();
          return valNormalized.indexOf(strNormalized) >= 0;
        })
      : null;

    this.setState({ value: str });

    onChange(str, filtered);
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <input
          className={classes.input}
          type="text"
          value={value}
          onChange={evt => this.handleSearch(evt.target.value)}
        />
        <SearchIcon className={classes.icon} />
      </div>
    );
  }
}

Search.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The list values to search on.
   */
  values: PropTypes.instanceOf(Array).isRequired,
  /**
   * The value to search for on the list.
   */
  value: PropTypes.string,
  /**
   * A function to be executed whenever a search is executed, the function receives the results filtered.
   */
  onChange: PropTypes.func
};

Search.defaultProps = {
  value: "",
  onChange() {}
};

export default Search;

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

import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@hv/uikit-react-icons/dist/Search.S";

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

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
import classNames from "classnames";
import Select, { components, defaultTheme } from "react-select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class HvDropdown extends React.Component {
  state = {
    dropdownExpanded: false
  };

  styles = {
    dropdownIndicator: (base, theme) => {
      const {
        palette: { grey: { inspire: greyInspire } } = { grey: {} }
      } = theme || {};

      return {
        ...base,
        padding: "5px",
        color: greyInspire
      };
    },
    control: (base, state, theme, dropdownExpanded) => {
      const {
        palette: {
          primary: { main: primaryMain },
          grey: { plain: greyPlain, inspire: greyInspire }
        } = { primary: {}, grey: {} }
      } = theme || {};

      return {
        ...base,
        borderColor: dropdownExpanded ? greyInspire : greyPlain,
        borderBottomColor: dropdownExpanded ? "transparent" : "inherit",
        boxShadow: "none",
        "&:hover": {
          borderColor: dropdownExpanded ? greyInspire : primaryMain,
          borderBottomColor: dropdownExpanded ? "transparent" : primaryMain,
          cursor: "pointer"
        }
      };
    },
    menu: (base, theme) => {
      const {
        palette: { grey: { inspire: greyInspire } } = { grey: {} }
      } = theme || {};

      return {
        ...base,
        marginTop: "-1px",
        boxShadow: "none",
        border: `solid 1px ${greyInspire}`,
        borderTop: "transparent"
      };
    },
    menuList: (base, theme) => {
      const {
        spacing: { xs: spacingXs } = {}
      } = theme || {};

      return {
        ...base,
        margin: spacingXs,
        padding: "0px"
      };
    },
    option: (base, state, theme) => {
      const {
        palette: {
          grey: { clear: greyClear, rainy: greyRainy, inspire: greyInspire },
          common: { white: commonWhite }
        } = { grey: {}, common: {} },
        spacing: { xs: spacingXs } = {}
      } = theme || {};

      return {
        ...base,
        padding: spacingXs,
        lineHeight: "12px",
        background: state.isSelected ? greyRainy : commonWhite,
        color: greyInspire,
        "&:hover": {
          background: greyClear,
          cursor: "pointer"
        }
      };
    }
  };

  render() {
    const {
      theme,
      classes,
      label,
      options,
      defaultValue,
      disabled,
      onChange
    } = this.props;
    const { dropdownExpanded } = this.state;

    const reactSelectTheme = {
      ...defaultTheme,
      borderRadius: 0,
      spacing: {
        controlHeight: 32,
        baseUnit: 4,
        menuGutter: 0
      }
    };

    const reactSelectStyles = {
      dropdownIndicator: base => this.styles.dropdownIndicator(base, theme),
      control: (base, state) =>
        this.styles.control(base, state, theme, dropdownExpanded),
      menu: base => this.styles.menu(base, theme),
      menuList: base => this.styles.menuList(base, theme),
      option: (base, state) => this.styles.option(base, state, theme)
    };

    const getLabelText = l => (
      <Grid item xs={12} className={classes.selectGridLabel}>
        <Typography variant="subtitle2" className={classes.selectGridLabelText}>
          {l}
        </Typography>
      </Grid>
    );

    const HvChevron = () => (
      <div
        className={classNames(classes.chevron, {
          [classes.chevronUp]: dropdownExpanded,
          [classes.chevronDown]: !dropdownExpanded
        })}
      />
    );

    const IndicatorSeparator = null;
    const DropdownIndicator = props =>
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <HvChevron />
        </components.DropdownIndicator>
      );

    const selectGridContentStyles = classNames({
      [classes.selectGridContent]: label !== null
    });

    return (
      <Grid container>
        {label !== null ? getLabelText(label) : null}
        <Grid item xs={12} className={selectGridContentStyles}>
          <Select
            defaultValue={defaultValue ? defaultValue : options[0]}
            className={classes.selectGridContentElement}
            components={{ IndicatorSeparator, DropdownIndicator }}
            options={options}
            menuIsOpen={dropdownExpanded}
            onMenuOpen={() => this.setState({ dropdownExpanded: true })}
            onMenuClose={() => this.setState({ dropdownExpanded: false })}
            theme={reactSelectTheme}
            styles={reactSelectStyles}
            isDisabled={disabled}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    );
  }
}

HvDropdown.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Array),
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.instanceOf(Function)
};

HvDropdown.defaultProps = {
  label: null,
  options: [],
  defaultValue: null,
  disabled: false,
  onChange: () => {}
};

export default HvDropdown;

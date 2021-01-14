/* eslint-disable */
/**
 * This file was taken from https://github.com/tannerlinsley/react-table/blob/v6/src/hoc/selectTable/index.js
 *
 * The select table HOC presented a bug in the checkbox.
 * When the checkbox was selected using a keyboard it lost the focus.
 * To solve this the default checkbox was substituted with the UI-KIT checkbox.
 *
 */
import React from "react";
import HvCheckBox from "../CheckBox";
import { setId } from "../utils";

const defaultSelectInputComponent = (props) => {
  return (
    <HvCheckBox
      id={props.id}
      inputProps={{
        id: setId(props.id, "input"),
        "aria-label": setId(props.id, "select"),
      }}
      checked={props.checked}
      onChange={() => {}}
      onClick={(e) => {
        const { shiftKey } = e;
        e.stopPropagation();
        props.onClick?.(props.id, shiftKey, props.row);
      }}
      {...props.row?.checkboxProps}
    />
  );
};

export default (Component, options) => {
  const wrapper = class RTSelectTable extends React.Component {
    constructor(props) {
      super(props);
    }

    rowSelector(row) {
      if (!row || !row.hasOwnProperty(this.props.keyField)) return null;
      const { toggleSelection, selectType, keyField, id } = this.props;
      const checked = this.props.isSelected(row[this.props.keyField]);
      const inputProps = {
        checked,
        onClick: toggleSelection,
        selectType,
        row,
        id: setId("select", row[keyField]),
      };
      return React.createElement(this.props.SelectInputComponent, inputProps);
    }

    headSelector(row) {
      const { selectType } = this.props;
      if (selectType === "radio") return null;

      const { toggleAll, selectAll: checked, SelectAllInputComponent } = this.props;
      const inputProps = {
        checked,
        onClick: toggleAll,
        selectType,
        id: "select-all",
      };

      return React.createElement(SelectAllInputComponent, inputProps);
    }

    // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll
    getWrappedInstance() {
      if (!this.wrappedInstance) console.warn("RTSelectTable - No wrapped instance");
      if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();
      else return this.wrappedInstance;
    }

    render() {
      const {
        columns: originalCols,
        isSelected,
        toggleSelection,
        toggleAll,
        keyField,
        selectAll,
        selectType,
        selectWidth,
        SelectAllInputComponent,
        SelectInputComponent,
        ...rest
      } = this.props;
      const select = {
        id: "_selector",
        accessor: () => "x", // this value is not important
        Header: this.headSelector.bind(this),
        Cell: (ci) => {
          return this.rowSelector.bind(this)(ci.original);
        },
        width: selectWidth || 30,
        filterable: false,
        sortable: false,
        resizable: false,
        style: { textAlign: "center" },
      };

      const columns =
        options !== undefined && options.floatingLeft === true
          ? [...originalCols, select]
          : [select, ...originalCols];
      const extra = {
        columns,
      };
      return <Component {...rest} {...extra} ref={(r) => (this.wrappedInstance = r)} />;
    }
  };

  wrapper.displayName = "RTSelectTable";
  wrapper.defaultProps = {
    keyField: "_id",
    isSelected: (key) => {
      console.log("No isSelected handler provided:", { key });
    },
    selectAll: false,
    toggleSelection: (key, shift, row) => {
      console.log("No toggleSelection handler provided:", { key, shift, row });
    },
    toggleAll: () => {
      console.log("No toggleAll handler provided.");
    },
    selectType: "checkbox",
    SelectInputComponent: defaultSelectInputComponent,
    SelectAllInputComponent: defaultSelectInputComponent,
  };

  return wrapper;
};

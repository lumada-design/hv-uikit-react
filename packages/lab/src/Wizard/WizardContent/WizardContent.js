import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import { HvDialogContent } from "@hitachivantara/uikit-react-core";
import HvWizardContext from "../WizardContext";
import LoadingContainer from "./LoadingContainer";

import styles from "./styles";

const HvWizardContent = ({ classes, fixedHeight = false, loading = false, children, tab }) => {
  const arrayChildren = React.Children.toArray(children);
  const initialContext = arrayChildren.reduce((acc, child, index) => {
    const invalid = child.props.mustValidate === true ? false : null;
    const valid = invalid ?? (index === 0 || null);
    return {
      ...acc,
      [index]: { ...child.props, form: {}, valid, touched: index === 0 },
    };
  }, {});

  const { context, setContext } = React.useContext(HvWizardContext);

  React.useEffect(() => {
    setContext(initialContext);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (tab && !context[tab]?.touched) {
      const updatedContext = Object.entries(context).reduce(
        (acc, [key, childState]) => ({
          ...acc,
          ...(+key <= tab
            ? { [key]: { ...childState, touched: true, valid: childState.valid ?? true } }
            : { [key]: childState }),
        }),
        {}
      );

      setContext(updatedContext);
    }
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HvDialogContent
      className={clsx(classes.contentContainer, {
        [classes.fixedHeight]: fixedHeight,
      })}
      indentContent
    >
      <LoadingContainer hidden={!loading}>
        {React.Children.map(arrayChildren, (child, index) => {
          if (index === tab) {
            return React.cloneElement(child, { tab });
          }
          return null;
        })}
      </LoadingContainer>
    </HvDialogContent>
  );
};

HvWizardContent.propTypes = {
  /**
   * Current tab to show.
   */
  tab: PropTypes.number.isRequired,
  /**
   * Tabs to show on the Wizard.
   */
  children: PropTypes.node.isRequired,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the Wizard content container
     */
    contentContainer: PropTypes.string,
    /**
     * Style applied to the Wizard to fix its height.
     */
    fixedHeight: PropTypes.string,
  }).isRequired,
  /**
   * Forces minimum height to the component.
   */
  fixedHeight: PropTypes.bool,
  /**
   * Whether the loading animation is shown.
   */
  loading: PropTypes.bool,
};

export default withStyles(styles, { name: "HvWizardContent" })(HvWizardContent);

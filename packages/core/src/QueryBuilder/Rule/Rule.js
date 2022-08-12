import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { Delete } from "@hitachivantara/uikit-react-icons";

import { HvGrid, HvButton, withTooltip } from "../..";

import Context from "../Context";
import Attribute from "./Attribute";
import Operator from "./Operator";
import Value from "./Value";
import useStyles from "./styles";

const Rule = ({ id, combinator, attribute, operator, value, disabled, isInvalid }) => {
  const classes = useStyles();
  const context = useContext(Context);

  const { askAction, attributes, operators, labels } = context;

  const availableOperators = useMemo(() => {
    const attributeSpec = attribute != null ? attributes[attribute] : null;
    if (attributeSpec != null) {
      const typeOperators = operators[attributeSpec.type];
      if (typeOperators != null) {
        return typeOperators.reduce(
          (count, item) => count + (item.combinators.includes(combinator) ? 1 : 0),
          0
        );
      }
    }

    return -1;
  }, [attribute, attributes, combinator, operators]);

  const shouldShowValueInput = operator !== "Empty" && operator !== "IsNotEmpty";

  const DeleteIcon = withTooltip(() => <Delete />, labels.rule.delete.tooltip, "bottom");

  return (
    <HvGrid container className={classes.root} spacing={0} wrap="nowrap">
      <HvGrid item xs={2} lg={3}>
        <Attribute attribute={attribute} id={id} disabled={disabled} isInvalid={isInvalid} />
      </HvGrid>
      {attribute != null && availableOperators > 0 && (
        <HvGrid item xs={2} lg={3}>
          <Operator id={id} combinator={combinator} attribute={attribute} operator={operator} />
        </HvGrid>
      )}
      {attribute != null && (operator != null || availableOperators === 0) && (
        <HvGrid item xs>
          {shouldShowValueInput && (
            <Value attribute={attribute} id={id} operator={operator} value={value} />
          )}
        </HvGrid>
      )}
      <HvGrid item className={classes.actionsContainer}>
        <HvButton
          icon
          aria-label={labels.rule.delete.ariaLabel}
          onClick={() => {
            askAction({
              actions: [{ type: "remove-node", id }],
              dialog: labels.rule.delete,
            });
          }}
        >
          <DeleteIcon />
        </HvButton>
      </HvGrid>
    </HvGrid>
  );
};

Rule.propTypes = {
  id: PropTypes.number,
  combinator: PropTypes.string,
  attribute: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

export default Rule;

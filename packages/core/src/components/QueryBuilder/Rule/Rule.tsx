import { HvButton, HvGrid } from "@core/components";
import { withTooltip } from "@core/hocs";

import { Delete } from "@hitachivantara/uikit-react-icons";

import { useMediaQuery, useTheme } from "@mui/material";

import { useContext, useMemo } from "react";

import { QueryBuilderContext } from "../Context";
import { Attribute } from "./Attribute";
import { Operator } from "./Operator";
import { Value } from "./Value";
import { useClasses } from "./Rule.styles";

export interface RuleProps {
  id: number;
  combinator: string;
  attribute: string;
  operator: string;
  value: any;
  disabled: boolean;
  isInvalid: boolean;
}

export const Rule = ({
  id,
  combinator,
  attribute,
  operator,
  value,
  disabled,
  isInvalid,
}: RuleProps) => {
  const { classes, cx } = useClasses();

  const context = useContext(QueryBuilderContext);

  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { askAction, attributes, operators, labels, readOnly } = context;

  const availableOperators = useMemo(() => {
    const attributeSpec =
      attribute != null && attributes ? attributes[attribute] : null;
    if (attributeSpec != null) {
      const typeOperators = operators[attributeSpec.type];
      if (typeOperators != null) {
        return typeOperators.reduce(
          (count, item) =>
            count + (item.combinators.includes(combinator) ? 1 : 0),
          0
        );
      }
    }

    return -1;
  }, [attribute, attributes, combinator, operators]);

  const shouldShowValueInput =
    operator !== "Empty" && operator !== "IsNotEmpty";

  const DeleteIcon = withTooltip(
    () => <Delete />,
    labels.rule.delete.tooltip,
    "bottom"
  );

  return (
    <HvGrid
      container
      className={cx(classes.root, { [classes.isMdDown]: isMdDown })}
      spacing={0}
      wrap="nowrap"
    >
      <HvGrid item xs={2} lg={3}>
        <Attribute
          attribute={attribute}
          id={id}
          disabled={disabled}
          isInvalid={isInvalid}
        />
      </HvGrid>
      {attribute != null && availableOperators > 0 && (
        <HvGrid item xs={2} lg={3}>
          <Operator
            id={id}
            combinator={combinator}
            attribute={attribute}
            operator={operator}
          />
        </HvGrid>
      )}
      {attribute != null && (operator != null || availableOperators === 0) && (
        <HvGrid item xs>
          {shouldShowValueInput && (
            <Value
              attribute={attribute}
              id={id}
              operator={operator}
              value={value}
            />
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
          disabled={readOnly}
          variant="secondaryGhost"
        >
          <DeleteIcon />
        </HvButton>
      </HvGrid>
    </HvGrid>
  );
};

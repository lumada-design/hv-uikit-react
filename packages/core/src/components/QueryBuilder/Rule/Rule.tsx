import { useMemo } from "react";
import { Delete } from "@hitachivantara/uikit-react-icons";
import { useMediaQuery, useTheme } from "@mui/material";

import { HvGrid } from "@core/components/Grid";
import { IconButton } from "@core/utils/IconButton";
import { useDefaultProps } from "@core/hooks";
import { ExtractNames } from "@core/utils";

import { useQueryBuilderContext } from "../Context";
import { Attribute } from "./Attribute";
import { Operator } from "./Operator";
import { Value } from "./Value";
import { staticClasses, useClasses } from "./Rule.styles";

export { staticClasses as queryBuilderRuleClasses };

export type HvQueryBuilderRuleClasses = ExtractNames<typeof useClasses>;

export interface RuleProps {
  id: React.Key;
  combinator: string;
  attribute?: string;
  operator?: string;
  value?: any;
  disabled?: boolean;
  isInvalid: boolean;
  classes?: HvQueryBuilderRuleClasses;
}

export const Rule = (props: RuleProps) => {
  const {
    id,
    combinator,
    attribute,
    operator,
    value,
    disabled,
    isInvalid,
    classes: classesProp,
  } = useDefaultProps("HvQueryBuilderRule", props);

  const { classes, cx } = useClasses(classesProp);

  const {
    askAction,
    dispatchAction,
    attributes,
    operators,
    labels,
    readOnly,
    disableConfirmation,
  } = useQueryBuilderContext();

  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

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

  return (
    <HvGrid
      container
      className={cx(classes.root, { [classes.isMdDown]: isMdDown })}
      spacing={0}
    >
      <HvGrid item xs={12} md={3}>
        <Attribute
          attribute={attribute}
          id={id}
          disabled={disabled}
          isInvalid={isInvalid}
        />
      </HvGrid>
      {attribute != null && availableOperators > 0 && (
        <HvGrid item xs={12} md={3}>
          <Operator
            id={id}
            combinator={combinator}
            attribute={attribute}
            operator={operator}
          />
        </HvGrid>
      )}
      {attribute != null && (operator != null || availableOperators === 0) && (
        <HvGrid item xs={12} md>
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
        <IconButton
          placement="bottom"
          title={labels.rule.delete.tooltip || labels.rule.delete.ariaLabel}
          onClick={() =>
            disableConfirmation
              ? dispatchAction({ type: "remove-node", id })
              : askAction({
                  actions: [{ type: "remove-node", id }],
                  dialog: labels.rule.delete,
                })
          }
          disabled={readOnly}
        >
          <Delete role="none" />
        </IconButton>
      </HvGrid>
    </HvGrid>
  );
};

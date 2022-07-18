import * as React from "react";
import { StandardProps } from "@mui/material";

import { Attribute, Query, QueryBuilderLabels, QueryCombinator, QueryOperator } from "./types";

export type HvQueryBuilderClassKey =
  | "root"
  | "topGroup"
  | "subGroup"
  | "combinator"
  | "topCombinator"
  | "combinatorButton"
  | "removeButton"
  | "topRemoveButton"
  | "rulesContainer"
  | "subRulesContainer"
  | "actionButtonContainer"
  | "topActionButtonContainer";

export interface HvQueryBuilderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvQueryBuilderClassKey, "onChange"> {
  /**
   * The query rules attributes.
   */
  attributes: Record<string, Attribute>;
  /**
   * The query rules operators by attribute type and combinator.
   */
  operators?: Record<string, QueryOperator[]>;
  /**
   * The query combinators operands.
   */
  combinators?: QueryCombinator[];
  /**
   * The initial query representation.
   */
  query?: Query;
  /**
   * Callback fired when query changes.
   * @param {Query} value - the query representation.
   */
  onChange?: (value: Query) => void;
  /**
   * Max depth of nested query groups.
   */
  maxDepth?: number;
  /**
   * An object containing all the labels.
   */
  labels?: QueryBuilderLabels;
}

export default function HvQueryBuilder(props: HvQueryBuilderProps): JSX.Element | null;

/*
 * Copyright 2020 Hitachi Vantara Corporation
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

import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import OptionsContext from "./OptionsContext";

const Options = ({
  classes,
  className,
  onClick,
  theme,
  children,
  ...others
}) => {
  const [selected, setSelected] = useState();

  const onSelection = useCallback(
    (event, payload) => {
      setSelected(payload.id);
      if (onClick) onClick(event, payload);
    },
    [onClick]
  );

  const optionsStateContext = useMemo(
    () => ({
      selected,
      onSelection
    }),
    [selected, onSelection]
  );

  return (
    <div className={classNames(className, classes.optionsRoot)} {...others}>
      <OptionsContext.Provider value={optionsStateContext}>
        {children}
      </OptionsContext.Provider>
    </div>
  );
};

Options.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    optionsRoot: PropTypes.string
  }).isRequired,
  /**
   * Function call when a option is chosen.
   */
  onClick: PropTypes.func,
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired
};

Options.defaultProps = {
  theme: undefined,
  className: undefined,
  onClick: undefined
};

export default Options;

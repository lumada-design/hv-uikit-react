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
import classNames from "classnames";
import Tabs from "../Tabs";
import Examples from "../Examples";
import HvLink from "@hv/uikit-react-core/dist/Link";

const getPropsMetadata = children => {
  const nodes = React.Children.map(children, element => {
    if (!React.isValidElement(element)) return;
    return element;
  });

  const metadata = nodes[0].type.Naked
    ? nodes[0].type.Naked.__docgenInfo.props
    : nodes[0].type.__docgenInfo.props;

  return metadata;
};

const Main = ({ classes, children, context }) => {
  const { kind, story, parameters } = context;
  const { examples, title, description, designSystemLink } = parameters;

  const isCore = kind.startsWith("Core");
  const isLab = kind.startsWith("Lab");

  return (
    <>
      <div
        className={classNames([
          classes.header,
          {
            [classes.core]: isCore,
            [classes.lab]: isLab
          }
        ])}
      >
        {kind} - <span className={classes.name}>{story}</span>
      </div>
      <div className={classes.content}>
        {title ? (
          <>
            <div className={classes.title}>
              {title}
              <span className={classes.link}>
                {designSystemLink && (
                  <HvLink route={designSystemLink}>
                    &nbsp;&nbsp;[DS Pattern]
                  </HvLink>
                )}
              </span>
            </div>

            <div className={classes.description}>{description}</div>
            <Tabs
              parameters={parameters}
              propsMetaData={getPropsMetadata(children)}
            />
            {examples && <Examples examples={examples} />}
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default Main;

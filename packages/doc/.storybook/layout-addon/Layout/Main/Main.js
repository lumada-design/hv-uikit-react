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
import classNames from "classnames";
import HvLink from "@hv/uikit-react-core/dist/Link";
import Examples from "../Examples";
import Tabs from "../Tabs";
import withConfig from "@hv/uikit-react-core/dist/config/withConfig";
import Button from "@hv/uikit-react-core/dist/Button";

const getComponentsMetadata = children => {

  const nodes = React.Children.map(children, element => {
    if (!React.isValidElement(element)) return;
    return element;
  });

  const propsMetaData = nodes[0].type.Naked
    ? nodes[0].type.Naked.__docgenInfo.props
    : nodes[0].type.__docgenInfo.props;

  const descriptionMetadata = nodes[0].type.Naked
  ? nodes[0].type.Naked.__docgenInfo.description
  : nodes[0].type.__docgenInfo.description;

  return {
    propsMetaData,
    descriptionMetadata,
  }
};

const Main = ({ classes, children, context, config }) => {
  const { kind, story, parameters } = context;
  const { examples, title, description, designSystemLink } = parameters;

  const isCore = kind.startsWith("Core");
  const isLab = kind.startsWith("Lab");

  const metadata = getComponentsMetadata(children);
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
        <div>
          {kind} - <span className={classes.name}>{story}</span>
        </div>
        <Button colorType="secondary" onClick={() => config.changeTheme()}>
          Change theme
        </Button>
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

            <div
              className={classes.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <Tabs
              parameters={parameters}
              propsMetaData={metadata.propsMetaData}
              descriptionMetadata={metadata.descriptionMetadata}
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

export default withConfig(Main);

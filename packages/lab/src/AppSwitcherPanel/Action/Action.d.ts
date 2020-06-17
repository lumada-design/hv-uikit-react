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

import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvAppSwitcherPanelApplication } from "../../AppSwitcherPanel";

export interface HvAppSwitcherPanelActionProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>> {
  /**
   * Id of the application.
   */
  id: string;
  /**
   * Name of the application, this is the value that will be displayed on the component.
   */
  name: string;
  /**
   * URL with the icon location to be used to represent the application.
   * iconUrl will only be used if no iconElement is provided.
   */
  iconUrl?: string;
  /**
   * Element to be added as the icon representing the application.
   * The iconElement will be the primary option to be displayed.
   */
  iconElement?: React.ReactHTMLElement;
  /**
   * Small description of the application.
   */
  description?: string;
  /**
   *  URL where the application is accesible.
   */
  url: string;
  /**
   * Defines if the application should be opened in the same tab or in a new one.
   */
  target?: "_top" | "_blank";
  /**
   * Callback triggered when the action is clicked
   */
  onClickCallback?: (application?: HvAppSwitcherPanelApplication) => void;
}

export default function HvAppSwitcherPanelAction(
  props: HvAppSwitcherPanelActionProps
): JSX.Element | null;

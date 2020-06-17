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

import { HvAppSwitcherPanelActionProps } from "./Action";

export interface HvAppSwitcherPanelProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>> {
  /**
   * Flag stating if the panel is opened or closed.
   */
  isOpen?: boolean;
  /**
   * Title to be displayed on the header of the component.
   */
  title?: string;
  /**
   * The list of applications to be used to render the actions on the component.
   */
  applications: HvAppSwitcherPanelActionProps[];
  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header?: React.ReactHTMLElement;
  /**
   * Element to be added to the footer container.
   */
  footer?: React.ReactHTMLElement;
  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback?: (application?: HvAppSwitcherApplication) => void;
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback?: (application?: HvAppSwitcherApplication) => void;
}

export interface HvAppSwitcherPanelApplication {
  /**
   * Id of the application.
   */
  id: string;
  /**
   * Name of the application.
   */
  name: string;
  /**
   * Small description of the application.
   */
  description: string;
  /**
   * URL where the application is accesible.
   */
  url: string;
  /**
   * States if the application is selected.
   */
  isSelected: boolean;
}

export default function HvAppSwitcherPanel(
  props: HvAppSwitcherPanelProps
): JSX.Element | null;

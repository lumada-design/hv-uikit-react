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

import HvBadge from "@hv/uikit-react-lab/dist/Badge";
import {AlertS} from "@hv/uikit-react-icons/bin/DawnTheme"

const exampleStyles = {
	display: "flex",
	width: "800px",
	justifyContent: "space-between"
}

const fontStyles = {
	fontSize: "22px",
	color: "#414141",
	lineHeight: "20px"
}

export default (
	<div style={exampleStyles}>
		<HvBadge count={0}>
			<AlertS />
		</HvBadge>
		<HvBadge count={1}>
			<AlertS />
		</HvBadge>
		<HvBadge showCount count={8}>
			<AlertS />
		</HvBadge>
		<HvBadge showCount count={12}>
			<div style={fontStyles}>
				Track events
			</div>
		</HvBadge>
		<HvBadge showCount count={100}>
			<div style={fontStyles}>
				Vehicle events
			</div>
		</HvBadge>
	</div>
);

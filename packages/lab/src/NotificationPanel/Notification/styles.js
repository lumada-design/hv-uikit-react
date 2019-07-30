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

const styles = (theme) => ({
		root: {
			display: "flex",
			minHeight: "68px",
			backgroundColor: theme.palette.common.white,
			color: theme.hv.palette.accent.acce1,
			padding: `${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px`,

			'&$read': {
				backgroundColor: theme.hv.palette.atmosphere.atmo2
			}
		},
		read: {},
		iconContainer: {
			width: "32px",
			marginRight: `${theme.hv.spacing.sm}px`,
		},
		title: {
			...theme.hv.typography.highlightText,
			marginBottom: "5px",

			'&$read': {
				...theme.hv.typography.normalText
			}
		},
		timeContainer: {
			...theme.hv.typography.vizText,
			display: "flex",
			alignItems: "center"
		},
		bullet: {
			width: "6px",
			height: "6px",
			borderRadius: "50%",
			marginRight: "6px",
			backgroundColor: theme.palette.common.black,

			"&$hide": {
				display: "none"
			}
		},
		hide: {}
	});

export default styles;

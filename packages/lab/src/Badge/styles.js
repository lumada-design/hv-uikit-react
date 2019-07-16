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
		badgeBorder: {
			position: "absolute",
			minHeight: "16px",
			minWidth: "30px",
			display: "flex",
			alignItems: "center",
			top: "-10px",
			right: "-30px"
		},
		badge: {
			borderRadius: "10px",
			backgroundColor: theme.hv.palette.accent.acce1,
			marginTop: "2px",
			height: "fit-content",
			width: "fit-content",
			minHeight: "6px",
			minWidth: "6px"
		},
		count: {
			...theme.hv.typography.labelText,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "16px",
			width: "fit-content",
			padding: "4px 5px",
			letterSpacing: "0", // this change is to center the numbers within the badge
			lineHeight: "0",
			color: theme.hv.palette.atmosphere.atmo1
		},
		iconContainer: {
			position: "relative",
			display: "flex",
			alignItems: "flex-end",
			height: "fit-content",
			width: "fit-content",
		},
	})

export default styles

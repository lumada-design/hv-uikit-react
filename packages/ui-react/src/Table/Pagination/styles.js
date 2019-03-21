/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
import DownArrow from "../assets/ChevronDown.svg";
import ArrowFirst from "../assets/ArrowFirst.svg";
import ArrowLeft from "../assets/ArrowLeft.svg";
import ArrowRight from "../assets/ArrowRight.svg";
import ArrowLast from "../assets/ArrowLast.svg";
import ArrowFirstDisabled from "../assets/ArrowFirstDisabled.svg";
import ArrowLeftDisabled from "../assets/ArrowLeftDisabled.svg";
import ArrowRightDisabled from "../assets/ArrowRightDisabled.svg";
import ArrowLastDisabled from "../assets/ArrowLastDisabled.svg";

const styles = theme => ({
  paginationContainer: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    padding: "3px",
    margin: `${theme.hv.spacing.md}px 0 0 0`
  },
  paginationBtn: {
    width: "32px",
    padding: "0",
    height: "100%"
  },
  pageSizeOptions: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "0"
  },
  pageSizeOptionsSelect: {
    "-webkit-appearance": "none",
    "-webkit-border-radius": "0px",
    padding: "2px 7px",
    fontSize: "14px",
    fontWeight: "normal",
    outline: "none",
    height: "32px",
    textIndent: `${theme.hv.spacing.xs}px`,
    width: `${theme.hv.spacing.lg}px`,
    textAlign: "center",
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
    background: `url(${DownArrow}) no-repeat right white`
  },
  pageNavigator: {
    display: "flex",
    alignItems: "stretch",
    height: "32px"
  },
  pageInfo: {
    display: "inline-block",
    margin: `0 ${theme.hv.spacing.xs}px`,
    whiteSpace: "nowrap",
    height: "32px"
  },
  pageJump: {
    display: "inline-block"
  },
  rowText: {
    ...theme.typography.normalText,
    marginLeft: `${theme.hv.spacing.xs}px`
  },
  pageJumpInput: {
    ...theme.typography.normalText,
    width: "50px",
    textAlign: "right",
    fontSize: "14px",
    margin: `-1px ${theme.hv.spacing.xs}px`,
    padding: "2px 5px",
    borderRadius: "0",
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
    height: "32px"
  },
  arrowFirst: {
    background: `url(${ArrowFirst})`,
    cursor: "pointer"
  },
  arrowLeft: {
    background: `url(${ArrowLeft})`,
    cursor: "pointer"
  },
  arrowRight: {
    background: `url(${ArrowRight})`,
    cursor: "pointer"
  },
  arrowLast: {
    background: `url(${ArrowLast})`,
    cursor: "pointer"
  },
  arrowFirstDisabled: {
    background: `url(${ArrowFirstDisabled})`
  },
  arrowLeftDisabled: {
    background: `url(${ArrowLeftDisabled})`
  },
  arrowRightDisabled: {
    background: `url(${ArrowRightDisabled})`
  },
  arrowLastDisabled: {
    background: `url(${ArrowLastDisabled})`
  }
});

export default styles;

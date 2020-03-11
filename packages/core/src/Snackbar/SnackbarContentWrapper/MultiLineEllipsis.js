/* eslint-disable */
/* istanbul ignore file */

/**
 Based on the code https://github.com/ShinyChang/react-text-truncate

 The MIT License (MIT)

 Copyright (c) 2015 Shiny Chang

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import React, { Component, createElement } from "react";
import PropTypes from "prop-types";

export default class TextTruncate extends Component {
  static propTypes = {
    containerClassName: PropTypes.string,
    element: PropTypes.string,
    line: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    onCalculated: PropTypes.func,
    onTruncated: PropTypes.func,
    onToggled: PropTypes.func,
    text: PropTypes.string,
    textElement: PropTypes.node,
    textTruncateChild: PropTypes.node,
    truncateText: PropTypes.string,
    maxCalculateTimes: PropTypes.number
  };

  static defaultProps = {
    element: "div",
    line: 1,
    text: "",
    textElement: "span",
    truncateText: "…",
    maxCalculateTimes: 10
  };

  componentDidMount() {
    const canvas = document.createElement("canvas");
    const docFragment = document.createDocumentFragment();
    const style = window.getComputedStyle(this.scope);
    const font = [
      style["font-weight"],
      style["font-style"],
      style["font-size"],
      style["font-family"]
    ].join(" ");

    docFragment.appendChild(canvas);
    this.canvas = canvas.getContext("2d");
    if (this.canvas) this.canvas.font = font;
    this.forceUpdate();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  onResize = () => {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
    this.rafId = window.requestAnimationFrame(this.update.bind(this));
  };

  onToggled = truncated => {
    typeof this.props.onToggled === "function" &&
      setTimeout(() => this.props.onToggled(truncated), 0);
  };

  onTruncated = () => {
    typeof this.props.onTruncated === "function" && setTimeout(() => this.props.onTruncated(), 0);
  };

  onCalculated = () => {
    typeof this.props.onCalculated === "function" && setTimeout(() => this.props.onCalculated(), 0);
  };

  update = () => {
    const style = window.getComputedStyle(this.scope);
    const font = [
      style["font-weight"],
      style["font-style"],
      style["font-size"],
      style["font-family"],
      style["letter-spacing"]
    ].join(" ");
    this.canvas.font = font;
    this.forceUpdate();
  };

  measureWidth(text) {
    return Math.ceil(this.canvas.measureText(text).width);
  }

  removePxText(text) {
    return parseInt(text.replace("px", ""));
  }

  getPaddingAndMargin() {
    const style = window.getComputedStyle(this.scope);
    return (
      this.removePxText(style.paddingLeft) +
      this.removePxText(style.paddingRight) +
      this.removePxText(style.marginRight) +
      this.removePxText(style.marginLeft)
    );
  }

  getRenderText() {
    const {
      containerClassName,
      element,
      line,
      onCalculated,
      onTruncated,
      onToggled,
      text,
      textElement,
      textTruncateChild,
      truncateText,
      maxCalculateTimes,
      ...props
    } = this.props;

    // const scopeWidth = this.scope.getBoundingClientRect().width;

    const scopeWidth = this.scope.clientWidth - this.getPaddingAndMargin() - 6;

    // return if display:none
    if (scopeWidth === 0) {
      return null;
    }

    // return if all of text can be displayed
    if (scopeWidth >= this.measureWidth(text)) {
      this.onToggled(false);
      return createElement(textElement, props, text);
    }

    let childText = "";
    if (textTruncateChild && typeof textTruncateChild.type === "string") {
      const { type } = textTruncateChild;
      if (type.indexOf("span") >= 0 || type.indexOf("a") >= 0) {
        childText = textTruncateChild.props.children;
      }
    }

    let currentPos = 1;
    const maxTextLength = text.length;
    let truncatedText = "";
    let splitPos = 0;
    let startPos = 0;
    let displayLine = line;
    let width = 0;
    let lastIsEng = false;
    let isPrevLineWithoutSpace = false;
    let lastPos = 0;
    let lastSpaceIndex = -1;
    let ext = "";
    let loopCnt = 0;

    while (displayLine-- > 0) {
      ext = displayLine ? "" : truncateText + (childText ? ` ${childText}` : "");
      while (currentPos <= maxTextLength) {
        truncatedText = text.substr(startPos, currentPos);
        width = this.measureWidth(truncatedText + ext);
        if (width < scopeWidth) {
          splitPos = text.indexOf(" ", currentPos + 1);
          if (splitPos === -1) {
            currentPos += 1;
            lastIsEng = false;
          } else {
            lastIsEng = true;
            currentPos = splitPos;
          }
        } else {
          do {
            if (loopCnt++ >= maxCalculateTimes) {
              break;
            }
            truncatedText = text.substr(startPos, currentPos);
            if (!displayLine) {
              currentPos--;
            }
            if (truncatedText[truncatedText.length - 1] === " ") {
              truncatedText = text.substr(startPos, currentPos - 1);
            }
            if (lastIsEng) {
              lastSpaceIndex = truncatedText.lastIndexOf(" ");
              if (lastSpaceIndex > -1) {
                currentPos = lastSpaceIndex;
                if (displayLine) {
                  currentPos++;
                }
                truncatedText = text.substr(startPos, currentPos);
              } else {
                currentPos--;
                truncatedText = text.substr(startPos, currentPos);
              }
            } else {
              currentPos--;
              truncatedText = text.substr(startPos, currentPos);
            }
            width = this.measureWidth(truncatedText + ext);
          } while (width >= scopeWidth && truncatedText.length > 0);
          startPos += currentPos;
          break;
        }
      }

      if (currentPos >= maxTextLength) {
        startPos = maxTextLength;
        break;
      }

      if (
        lastIsEng &&
        !isPrevLineWithoutSpace &&
        text.substr(lastPos, currentPos).indexOf(" ") === -1
      ) {
        isPrevLineWithoutSpace = text.substr(lastPos, currentPos).indexOf(" ") === -1;
        displayLine--;
      }
      lastPos = currentPos + 1;
    }

    if (startPos === maxTextLength) {
      this.onToggled(false);
      return createElement(textElement, props, text);
    }

    this.onTruncated();
    this.onToggled(true);
    return (
      <div {...props}>
        {createElement(textElement, props, `${text.substr(0, startPos) + truncateText} `)}
        {textTruncateChild}
      </div>
    );
  }

  render() {
    const {
      element,
      text,
      style = {},
      containerClassName,
      line,
      onCalculated,
      onTruncated,
      onToggled,
      textElement,
      textTruncateChild,
      truncateText,
      maxCalculateTimes,
      ...props
    } = this.props;

    const { fontWeight, fontStyle, fontSize, fontFamily } = style;

    const renderText =
      this.scope && line ? this.getRenderText() : createElement(textElement, props, text);
    const rootProps = {
      ref: el => {
        this.scope = el;
      },
      className: containerClassName,
      style: { overflow: "hidden", fontWeight, fontStyle, fontSize, fontFamily }
    };

    this.scope && this.onCalculated();
    return createElement(element, rootProps, renderText);
  }
}

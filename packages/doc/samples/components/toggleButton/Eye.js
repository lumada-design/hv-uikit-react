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
import PropTypes from "prop-types";

const Eye = props => {
  const { color, className, ...other } = props;

  return (
    <svg
      id="previewOff"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 14.71"
      height={30}
      width={30}
      className={className}
      {...other}
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".cls-1 {\n        fill: none;\n      }\n\n      .cls-2 {\n        fill: #414141;\n      }\n\n\t  .default > rect{\n\t    fill: #414141\n\t  }\n\n      .selected > rect{\n\t    fill: none;\n        animation: dash_out .2s ease-in-out;\n      }\n\t  \n\t  .notSelected >      rect{\n\t    fill: #414141;\n        animation: dash_in .2s ease-in-out;\n      }\n\n      @keyframes dash_in {\n        from {\n          width: 0;\n          }\n        to {\n          width: 19.8;\n        }\n      }\n\t \n\t @keyframes dash_out {\n        from {\n          width: 19.8;\n\t\t  fill: #414141;\n\n          }\n        to {\n          width: 0;\n\t\t  fill: #414141;\n        }\n\t\t\n      }\n    "
          }}
        />
      </defs>
      <g id="eye">
        <path
          id="fc623adc-be5e-469d-9072-f0580ca88767"
          className="cls-1"
          d="M8,2c4,0,8,6,8,6s-3.58,6-8,6S0,8,0,8,4,2,8,2Z"
          transform="translate(0 -0.65)"
        />
        <g id="a15f14a7-dffe-4c64-9428-aba4924f7fde">
          <path
            id="e12ad8e9-7d4f-4e83-ab6f-123ea22afc18"
            className="cls-2"
            d="M8,5a3,3,0,1,0,3,3A3,3,0,0,0,8,5Zm0,5a2,2,0,1,1,2-2A2,2,0,0,1,8,10Z"
            transform="translate(0 -0.65)"
          />
          <path
            id="a3bcdec7-1431-4292-be4a-511c1ac2729c"
            className="cls-2"
            d="M8,2C4,2,0,8,0,8s3.58,6,8,6,8-6,8-6S12,2,8,2Zm4.91,8.33C11.73,11.55,9.92,13,8,13s-3.75-1.47-4.94-2.69A17.83,17.83,0,0,1,1.21,8a22.36,22.36,0,0,1,2-2.35C5,3.93,6.64,3,8,3s3,.94,4.79,2.71a21.07,21.07,0,0,1,2,2.32A17.31,17.31,0,0,1,12.91,10.33Z"
            transform="translate(0 -0.65)"
          />
        </g>
      </g>
      <rect
        id="dash"
        x="-1.9"
        y="7.5"
        width="19.8"
        height={1}
        transform="translate(-3.31 7.36) rotate(-45)"
      />
    </svg>
  );
};

Eye.propTypes = {
  color: PropTypes.instanceOf(Array),
  className: PropTypes.string
};

Eye.defaultProps = {
  color: [],
  className: "notSelected"
};

export default Eye;

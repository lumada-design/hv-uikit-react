module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "header"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "header/header": [
      2,
      "block",
      [
        '',
        {"pattern": ' * Copyright 20\\d{2}([-–]20\\d{2})? Hitachi Vantara Corporation', "template": ' * Copyright 2020 Hitachi Vantara Corporation'},
        ' *',
        ' * Licensed under the Apache License, Version 2.0 (the "License");',
        ' * you may not use this file except in compliance with the License.',
        ' * You may obtain a copy of the License at',
        ' *',
        ' *     http://www.apache.org/licenses/LICENSE-2.0',
        ' *',
        ' * Unless required by applicable law or agreed to in writing, software',
        ' * distributed under the License is distributed on an "AS IS" BASIS,',
        ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
        ' * See the License for the specific language governing permissions and',
        ' * limitations under the License.',
        ' '
      ]
    ],
    "react/jsx-wrap-multilines": ["error", {"declaration": false, "assignment": false}],
    "no-underscore-dangle": ["error", { "allow": ["_offset"] }]
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};

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

const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const findBestUnit = (bytes, base = 1000) => {
  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const si = Math.min(i, units.length - 1); // safe index
  return { unit: units[si], value: bytes / base ** si };
};

export const convertUnits = (bytes, base = 1000) => {
  const { unit, value } = findBestUnit(bytes, base);
  return value.toFixed(2) + unit;
};

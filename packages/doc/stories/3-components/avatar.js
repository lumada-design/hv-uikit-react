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
import { storiesOf } from "@storybook/react";
import { HvAvatar } from "@hv/uikit-react-core/dist";

storiesOf("Components", module).add("Avatar", () => <HvAvatar />, {
  title: "Avatar",
  description: "Avatars can be used to represent a user or a brand. They can show an image, an icon or the initial letters of a name, for example.",
  usage: "import { HvAvatar } from '@hv/uikit-react-core/dist'",
  examples: [
    {
      title: "1. Main",
      src: "components/avatar/main.js",
    },
    {
      title: "2. Image Avatars",
      description: "Image avatars can be created by passing standard img props src or srcSet to the component.",
      src: "components/avatar/imageAvatars.js",
    },
    {
      title: "3. Letter Avatars",
      description: "Avatars containing simple characters can be created by passing a string as children.",
      src: "components/avatar/letterAvatars.js",
    },
    {
      title: "4. Icon Avatars",
      description: "Icon avatars are created by passing an icon as children. Its size and color aren't Avatar's responsibility.",
      src: "components/avatar/iconAvatars.js",
    },
    {
      title: "5. Fallbacks",
      description: "If there is an error loading the avatar image, the component falls back to an alternative in the following order: the provided children, the first letter of the alt text and finally the generic User icon.",
      src: "components/avatar/fallbacks.js",
    },
    {
      title: "6. Sizes",
      description: "You can change the size of the avatar with the size property (XS, S, M, L). When using an icon avatar, preferably use as iconSize the size immediately below the avatar size.",
      src: "components/avatar/sizes.js",
    },
    {
      title: "7. Buttons",
      description: "You can change the component used for the root node, for instance for rendering a HvButton. All other properties are spread in the root node, such as event callbacks.",
      src: "components/avatar/buttons.js",
    },
  ],
});

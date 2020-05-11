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
import { useState, useEffect } from "react";

const useImageLoaded = (src, srcSet) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setImageLoaded(false);

    let active = true;
    const image = new Image();
    image.src = src;
    image.srcSet = srcSet;
    image.onload = () => {
      if (!active) {
        return;
      }

      setImageLoaded("loaded");
    };
    image.onerror = () => {
      if (!active) {
        return;
      }

      setImageLoaded("error");
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return imageLoaded;
};

export default useImageLoaded;

import { useMemo } from "react";
import type { EmotionCache } from "@emotion/cache";
import { css as emotionCss } from "@emotion/css";
import { RegisteredCache, serializeStyles } from "@emotion/serialize";
import { getRegisteredStyles, insertStyles } from "@emotion/utils";
import clsx from "clsx";

import { useEmotionCache } from "./useEmotionCache";

type CSS = typeof emotionCss;

function getRef(args: any[]) {
  if (args.length !== 1) {
    return { args, ref: undefined };
  }

  const [arg] = args;

  if (!(arg instanceof Object)) {
    return { args, ref: undefined };
  }

  if (!("ref" in arg)) {
    return { args, ref: undefined };
  }

  const { ref, ...argCopy } = arg;
  return { args: [argCopy], ref };
}

const cssFactory = (() => {
  function merge(registered: RegisteredCache, css: CSS, className: string) {
    const registeredStyles: string[] = [];

    const rawClassName = getRegisteredStyles(
      registered,
      registeredStyles,
      className,
    );

    if (registeredStyles.length < 2) {
      return className;
    }

    return rawClassName + css(registeredStyles);
  }

  function innerCssFactory(cache: EmotionCache) {
    const css: CSS = (...styles: any) => {
      const { ref, args } = getRef(styles);
      const serialized = serializeStyles(args, cache.registered);
      insertStyles(cache, serialized, false);
      return `${cache.key}-${serialized.name}${
        ref === undefined ? "" : ` ${ref}`
      }`;
    };

    const cx = (...args: any) => merge(cache.registered, css, clsx(args));

    return { css, cx };
  }

  return innerCssFactory;
})();

export function useCss() {
  const cache = useEmotionCache();
  return useMemo(() => cssFactory(cache), [cache]);
}

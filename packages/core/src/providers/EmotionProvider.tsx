import { useMemo } from "react";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider, ClassNames, css, Global } from "@emotion/react";
import {
  defaultCacheKey,
  defaultEmotionCache,
  EmotionContext,
} from "@hitachivantara/uikit-react-shared";
import { CssBaseline, CssScopedBaseline } from "@hitachivantara/uikit-styles";

import { getElementById } from "../utils/document";

export type EmotionProviderProps = {
  rootId?: string;
  themesVars: Record<string, any>;
  children: React.ReactNode;
  cssBaseline?: "global" | "scoped" | "none";
  cssTheme?: "global" | "scoped";
  emotionCache?: EmotionCache;
  classNameKey?: string;
};

const resolveEmotionCache = (
  emotionCache: EmotionCache | undefined,
  classNameKey: string,
) => {
  if (emotionCache) return emotionCache;
  return classNameKey === defaultCacheKey
    ? defaultEmotionCache
    : createCache({ key: classNameKey, prepend: true });
};

/**
 * Sets up Emotion cache and global/scoped baseline styles.
 */
export const EmotionProvider = ({
  rootId,
  themesVars,
  children,
  cssBaseline = "global",
  cssTheme = "global",
  emotionCache,
  classNameKey = defaultCacheKey,
}: EmotionProviderProps) => {
  const isScopedBaseline = cssBaseline === "scoped";
  const isScopedTheme = cssTheme === "scoped";
  const shouldWrap = (isScopedBaseline || isScopedTheme) && !rootId;

  const resolvedEmotionCache = useMemo(() => {
    return resolveEmotionCache(emotionCache, classNameKey);
  }, [classNameKey, emotionCache]);

  return (
    <CacheProvider value={resolvedEmotionCache}>
      <Global
        styles={css`
          ${cssBaseline === "global" && {
            [`@layer hv-uikit-baseline`]: {
              ...CssBaseline,
            },
          }}
          ${themesVars}
        `}
      />
      <EmotionContext.Provider value={{ cache: resolvedEmotionCache }}>
        <ClassNames>
          {({ css }) => {
            if (isScopedBaseline && rootId) {
              const el = getElementById(rootId);
              if (el) {
                el.classList.add(
                  css({
                    [`@layer ${rootId}-baseline`]: CssScopedBaseline,
                  }),
                );
              }
            }

            return shouldWrap ? (
              <div
                id={rootId}
                className={
                  isScopedBaseline
                    ? css({
                        [`@layer ${rootId}-baseline`]: CssScopedBaseline,
                      })
                    : undefined
                }
              >
                {children}
              </div>
            ) : (
              children
            );
          }}
        </ClassNames>
      </EmotionContext.Provider>
    </CacheProvider>
  );
};

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
  scopedId?: string;
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
  scopedId,
  themesVars,
  children,
  cssBaseline,
  cssTheme,
  emotionCache,
  classNameKey = defaultCacheKey,
}: EmotionProviderProps) => {
  // Moves UI Kit styles to the top of the <head> so they're loaded first
  // This enables users to override the UI Kit styles if necessary
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
            if (cssBaseline === "scoped") {
              const rootElement = getElementById(rootId);

              if (rootElement) {
                rootElement.classList.add(
                  css({
                    [`@layer ${rootId}-baseline`]: {
                      ...CssScopedBaseline,
                    },
                  }),
                );
              }
            }

            return (cssTheme === "scoped" || cssBaseline === "scoped") &&
              !rootId ? (
              <div
                id={scopedId}
                className={
                  cssBaseline === "scoped"
                    ? css({
                        [`@layer ${rootId}-baseline`]: {
                          ...CssScopedBaseline,
                        },
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

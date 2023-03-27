import { CSSInterpolation, ClassNamesArg, EmotionCache } from "@emotion/css";
import { EmotionCache } from "@emotion/cache";

// Fixes createEmotion has no call signature
declare module "@emotion/css/create-instance" {
  export default function createEmotion(options): {
    css(
      template: TemplateStringsArray,
      ...args: Array<CSSInterpolation>
    ): string;
    css(...args: Array<CSSInterpolation>): string;
    cx(...classNames: Array<ClassNamesArg>): string;
    flush(): void;
    hydrate(ids: Array<string>): void;
    injectGlobal(
      template: TemplateStringsArray,
      ...args: Array<CSSInterpolation>
    ): void;
    injectGlobal(...args: Array<CSSInterpolation>): void;
    keyframes(
      template: TemplateStringsArray,
      ...args: Array<CSSInterpolation>
    ): string;
    keyframes(...args: Array<CSSInterpolation>): string;
    merge(className: string): string;
    getRegisteredStyles(
      registeredStyles: Array<string>,
      className: string
    ): string;
    sheet: {
      isSpeedy: boolean;
      ctr: number;
      tags: Array<HTMLStyleElement>;
      container: Node;
      key: string;
      nonce?: string;
      before?: ChildNode | null;
      constructor(options?: Options);
      insert(rule: string): void;
      flush(): void;
      hydrate(nodes: Array<HTMLStyleElement>): void;
      speedy(value: boolean): void;
    };
    cache: EmotionCache;
  };
}

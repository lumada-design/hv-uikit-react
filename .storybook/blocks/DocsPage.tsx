import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
  useOf,
} from "@storybook/blocks";

/** @see https://github.com/storybookjs/storybook/blob/v8.0.10/code/ui/blocks/src/blocks/DocsPage.tsx */
export function DocsPage() {
  const resolvedOf = useOf("meta", ["meta"]);
  const { stories } = resolvedOf.csfFile;
  const isSingleStory = Object.keys(stories).length === 1;

  return (
    <>
      <Title />
      <Subtitle />
      <Description of="meta" />
      {isSingleStory ? <Description of="story" /> : null}
      <Primary />
      <Controls />
      {isSingleStory ? null : <Stories includePrimary={false} />}
    </>
  );
}

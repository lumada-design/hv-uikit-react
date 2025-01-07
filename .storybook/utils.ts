export const renderStory = (story: any, ctx: any) => {
  return story.render?.(story.args, ctx);
};

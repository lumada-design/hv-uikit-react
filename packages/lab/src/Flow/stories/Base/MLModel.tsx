export const MLModel = (props) => {
  const {
    data: { component: Component },
  } = props;

  return <Component {...props} />;
};

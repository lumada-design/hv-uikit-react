// eslint-disable-next-line react/prop-types
const ConditionalRenderer = ({ condition, children }) => (condition ? children : null);

export default ConditionalRenderer;

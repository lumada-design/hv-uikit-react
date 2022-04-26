import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";


const SimpleGrid = ({
    children,
    breakpoints,
    spacing,
    cols
}) => {
    const classes = useStyles({breakpoints, cols, spacing})();
    return (
        <div
            className={classes.container}
        >
            {children}
        </div>
    )
}


SimpleGrid.propTypes = {
    children: PropTypes.node,
    spacing: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    breakpoints: PropTypes.shape({
        maxWidth: PropTypes.number,
        cols: PropTypes.number,
        spacing: PropTypes.oneOf(["sm", "md", "lg", "xl"])
    }),
    cols: PropTypes.number
}
SimpleGrid.defaultProps = {
    cols: 3,
    spacing: "sm"
}

export default SimpleGrid;
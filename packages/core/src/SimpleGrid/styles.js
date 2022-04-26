
import { makeStyles } from "@material-ui/core";

function size(props) {
  if (typeof props.size === 'number') {
    return props.size;
  }

  return props.sizes[props.size] || props.size || props.sizes.md;
}

function getSortedBreakpoints(theme, breakpoints) {
    if (breakpoints.length === 0) {
      return breakpoints;
    }
  
    const property = 'maxWidth' in breakpoints[0] ? 'maxWidth' : 'minWidth';
    const sorted = [...breakpoints].sort(
      (a, b) =>
        size({ size: b[property], sizes: theme.breakpoints }) -
        size({ size: a[property], sizes: theme.breakpoints })
    );
  
    return property === 'minWidth' ? sorted.reverse() : sorted;
  }

const styles = props => makeStyles(theme => {
    const {
      breakpoints,
      spacing,
      cols
    } = props;

    const gridBreakpoints = getSortedBreakpoints(theme, breakpoints).reduce((acc, breakpoint) => {
        const property = 'maxWidth' in breakpoint ? 'max-width' : 'min-width';
        const breakpointSize = size({
          size: property === 'max-width' ? breakpoint.maxWidth : breakpoint.minWidth,
          sizes: theme.breakpoints,
        });
    
        acc[`@media (${property}: ${breakpointSize + (property === 'max-width' ? 0 : 1)}px)`] = {
          gridTemplateColumns: `repeat(${breakpoint.cols}, minmax(0, 1fr))`,
          gap: theme.hv.spacing[spacing]
        };
    
        return acc;
      }, {});

    return {
        container: {
            boxSizing: 'border-box',
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: theme.hv.spacing[spacing],
            ...gridBreakpoints,
        }
    }   
})

export default styles;
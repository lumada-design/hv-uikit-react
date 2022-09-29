import React from "react";
import { themeVars } from "theme";

// import { themeVars, spacingFn } from "theme";

export interface BoxProps<C extends React.ElementType> {
    as? : C;
    children: React.ReactNode;
    style?: React.CSSProperties;
    sx?: Sx;
}

type Sx = React.CSSProperties | ((themeVars) => React.CSSProperties)

type UIkitTheme = {
    primarycolor: string
    padding: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractSx(sx: Sx, theme: UIkitTheme) {
    return typeof sx === 'function' ? sx(themeVars) : sx;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSx = (sx : Sx, systemStyles: UIkitTheme, className: string) => {

    console.log(extractSx(sx, systemStyles))
    return extractSx(sx, systemStyles)
}  //transformar em css


const Box: React.FC<BoxProps<any>> = <C extends React.ElementType>({
    as,
    children,
    style,
    sx,

} : BoxProps<C>) => {

    const Component = as || "div";

    const systemStyles = {
        primarycolor : "blue",
        padding : "20px"
    }


    const className = "teste"

    return (
        <Component style={sx ? useSx(sx, systemStyles, className) : style}>
            {children}
        </Component>
    )
}

export default Box;
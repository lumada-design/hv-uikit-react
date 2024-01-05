import { useTheme } from "nextra-theme-docs";

export const Logo = () => {
  const { resolvedTheme } = useTheme();
  const color = resolvedTheme === "dark" ? "#FFF" : "#000";

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      viewBox="0 0 260 50"
      height={25}
    >
      <g>
        <path
          fill={color}
          d="m0,48.6V.53h13.22l24.42,29.39V.53h13.15v48.07h-13.15L13.22,19.21v29.39H0Z"
        />
        <path
          fill={color}
          d="m90.39,11.11h-15.72v8.03h14.84v10.58h-14.84v8.29h15.72v10.58h-28.94V.53h28.94v10.58Z"
        />
        <path
          fill={color}
          d="m114.48,22.97L98.62.53h16.33l6.88,12.43,8.5-12.43h16.33l-16.8,22.44,18.96,25.63h-16.12l-10.19-15.68-11.94,15.68h-15.99l19.9-25.63Z"
        />
        <path
          fill={color}
          d="m173.43,11.11v37.49h-13.22V11.11h-10.86V.53h34.94v10.58h-10.86Z"
        />
        <path
          fill={color}
          d="m210.99.16v28.95c0,4.13.71,7.15,2.14,9.06,2.13,2.76,5.13,4.14,8.99,4.14s6.9-1.38,9.03-4.14c1.43-1.85,2.14-4.87,2.14-9.06V.16h7.67v30.94c0,5.06-1.67,9.23-5.01,12.51-3.75,3.65-8.37,5.48-13.83,5.48s-10.07-1.83-13.8-5.48c-3.34-3.28-5.01-7.45-5.01-12.51V.16h7.67Z"
        />
        <path fill={color} d="m260.82.16v48.06h-7.67V.16h7.67Z" />
      </g>
    </svg>
  );
};

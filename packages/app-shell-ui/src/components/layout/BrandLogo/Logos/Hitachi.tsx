import { theme } from "@hitachivantara/uikit-react-core";

export type HitachiProps = {
  description?: string;
  letteringColor?: string;
};

const Hitachi = ({
  description = "Hitachi logo",
  letteringColor,
}: HitachiProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      width="72px"
      height="20px"
      viewBox="0 0 80.5 16.9"
      xmlSpace="preserve"
      aria-label={description}
    >
      <path
        fill={letteringColor ?? theme.colors.secondary}
        d="M63.6 2.5v4.7H70V2.5h3.1v11.9H70V9.2h-6.3v5.2h-3.1V2.5h3zM33.9 2.5v2h-4.8v9.8H26V4.5h-4.8v-2h12.7zM46 14.3h-3.5l-1-2.6h-5.9l-1 2.6h-3.5l5.5-11.9h3.8L46 14.3zm-7.4-9.8-2.2 5.4h4.4l-2.2-5.4M75.6 2.5h3.1v11.9h-3.1zM4.9 2.5v4.7h6.3V2.5h3.1v11.9h-3.1V9.2H4.9v5.2H1.7V2.5h3.2zM16.9 2.5H20v11.9h-3.1zM45.9 11c-.3-.8-.4-1.6-.4-2.5 0-1.2.2-2.4.8-3.4.6-1 1.5-1.8 2.7-2.2 1.1-.4 2.2-.6 3.5-.6 1.4 0 2.7.3 4 .8 1.1.5 2 1.5 2.2 2.7.1.3.1.5.1.8h-3.3c0-.3-.1-.6-.2-.9-.3-.6-.8-1.2-1.5-1.4-.4-.1-.9-.2-1.4-.2-.5 0-1.1.1-1.5.3-.8.3-1.4.9-1.7 1.7-.3.8-.4 1.6-.4 2.5 0 .7.1 1.4.3 2.1.2.9.9 1.6 1.7 1.9.5.2 1.1.3 1.7.3.5 0 1-.1 1.5-.2.6-.2 1.1-.6 1.4-1.2.2-.4.3-.8.3-1.3H59c0 .4-.1.8-.2 1.1-.3 1.2-1.1 2.2-2.2 2.6-1.2.5-2.6.8-4 .8-1.1 0-2.2-.2-3.2-.5-1.6-.6-2.9-1.7-3.5-3.2z"
      />
    </svg>
  );
};

export default Hitachi;

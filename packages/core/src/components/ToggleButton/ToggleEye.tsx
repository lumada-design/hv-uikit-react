import styled from "@emotion/styled";

const StyledBox = styled("div")({
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  "&>svg": {
    margin: "auto",
    "& .dash": {
      transition: "width .2s ease-in-out",
    },
  },
});

export const ToggleEye = ({ selected }: { selected?: boolean }) => {
  return (
    <StyledBox>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height={16}
        width={16}
        fill="currentColor"
      >
        <path
          d="M8,5a3,3,0,1,0,3,3A3,3,0,0,0,8,5Zm0,5a2,2,0,1,1,2-2A2,2,0,0,1,8,10Z"
          transform="translate(0 -0.65)"
        />
        <path
          d="M8,2C4,2,0,8,0,8s3.58,6,8,6,8-6,8-6S12,2,8,2Zm4.91,8.33C11.73,11.55,9.92,13,8,13s-3.75-1.47-4.94-2.69A17.83,17.83,0,0,1,1.21,8a22.36,22.36,0,0,1,2-2.35C5,3.93,6.64,3,8,3s3,.94,4.79,2.71a21.07,21.07,0,0,1,2,2.32A17.31,17.31,0,0,1,12.91,10.33Z"
          transform="translate(0 -0.65)"
        />
        <rect
          className="dash"
          width={selected ? 19.8 : 0}
          x="-1.9"
          y="7.5"
          height="1"
          transform="translate(-3.31 7.36) rotate(-45)"
        />
      </svg>
    </StyledBox>
  );
};

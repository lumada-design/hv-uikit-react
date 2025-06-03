import {
  HvButton,
  HvInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function LoginFull() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <LoginContainer
      title={
        <>
          <span className="text-32px md:text-48px">Welcome to</span>
          <br />
          <strong className="text-64px md:text-96px">Pentaho+</strong>
        </>
      }
      subtitle="Pentaho User Console"
    >
      <form
        autoComplete="on"
        className="grid gap-32px max-w-lg"
        onSubmit={handleSubmit}
      >
        <HvTypography variant="title3" className="text-center">
          Log in to your Pentaho+ account
        </HvTypography>
        <div className="grid gap-md">
          <div className="grid gap-xs">
            <HvInput
              required
              name="username"
              label="Username"
              placeholder="Your username..."
            />
            <HvInput
              required
              name="password"
              type="password"
              label="Password"
              placeholder="Your password..."
            />
          </div>
          <div className="grid gap-sm">
            <HvButton type="submit" variant="primary">
              Log In
            </HvButton>
            <HvButton startIcon={<MsLogo />} variant="secondarySubtle">
              Sign in with Microsoft
            </HvButton>
          </div>
        </div>
        <HvButton
          variant="secondaryGhost"
          endIcon={<div className="i-ph-caret-down" />}
        >
          Log in as evaluator
        </HvButton>
      </form>
    </LoginContainer>
  );
}

const LoginContainer = ({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="grid min-h-600px grid-cols-2 md:grid-cols-[8fr_4fr]">
    <div
      className="flex flex-col justify-between px-lg py-md bg-cover bg-center"
      style={{ backgroundImage: "url(https://i.imgur.com/EivMdmh.jpeg)" }}
    >
      <HvTypography variant="title1" className="text-textLight leading-[1]">
        {title}
      </HvTypography>
      <HvTypography variant="title2" className="text-textLight">
        {subtitle}
      </HvTypography>
    </div>
    <div className="grid p-md bg-bgPage place-items-center">{children}</div>
  </div>
);

const MsLogo = () => (
  <svg viewBox="0 0 20 20">
    <path fill="#F25022" d="M9.52.95H.95v8.57h8.57z" />
    <path fill="#00A4EF" d="M9.52 10.48H.95v8.57h8.57z" />
    <path fill="#7FBA00" d="M19.05.95h-8.57v8.57h8.57z" />
    <path fill="#FFB900" d="M19.05 10.48h-8.57v8.57h8.57z" />
  </svg>
);

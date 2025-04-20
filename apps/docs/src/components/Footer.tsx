import { UIKitLogo } from "./logo/uikit";

const footerLinks = [
  {
    title: "Project",
    links: [
      { label: "Get Started", href: "/documentation/get-started" },
      { label: "Contribute", href: "/documentation/contribute/" },
      { label: "Changelog", href: "/documentation/changelog/" },
      {
        label: "Releases",
        href: "https://github.com/lumada-design/hv-uikit-react/releases",
      },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Docs", href: "/documentation/" },
      { label: "Components", href: "/components" },
      { label: "Charts", href: "/charts" },
      { label: "Examples", href: "/examples" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Team", href: "/" },
      {
        label: "Slack",
        href: "https://hitachivantara-eng.slack.com/archives/CFY74GK6G",
      },
      {
        label: "GitHub",
        href: "https://github.com/lumada-design/hv-uikit-react",
      },
      { label: "License", href: "/" },
    ],
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-lg border-t border-bgPage">
      <div className="max-w-1400px mx-auto px-md">
        <div className="flex flex-col md:flex-row md:justify-between space-y-md md:space-y-0">
          {/* Logo Section with More Space */}
          <div className="flex flex-col">
            <a
              aria-label="UIKit"
              href="/"
              className="flex items-center space-x-sm"
            >
              <UIKitLogo />
            </a>
            <p className="text-sm mt-sm">by Hitachi Vantara © {year}</p>
          </div>

          {/* Link Groups Right-Aligned */}
          <div className="grid grid-cols-3 text-md gap-lg md:gap-xl">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col">
                <p className="font-semibold text-primary mb-xs">
                  {group.title}
                </p>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-primary pb-xs"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

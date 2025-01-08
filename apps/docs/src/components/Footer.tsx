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
  return (
    <footer className="py-6 border-t border-[var(--uikit-colors-atmo2)]">
      <div className="max-w-[44rem] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          {/* Logo Section with More Space */}
          <div className="flex flex-col md:mb-0 flex-grow">
            <a
              aria-label="UIKit"
              href="/"
              className="flex items-center space-x-2"
            >
              <UIKitLogo />
            </a>
            <p className="text-sm mt-2">by Hitachi Vantara © 2024</p>
          </div>

          {/* Link Groups Right-Aligned */}
          <div className="grid grid-cols-3 text-md gap-5 md:gap-20">
            {footerLinks.map((group) => (
              <div key={group.title} className="flex flex-col">
                <p className="font-semibold text-[var(--uikit-colors-primary)] mb-1">
                  {group.title}
                </p>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-[var(--uikit-colors-primary)] pb-1"
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

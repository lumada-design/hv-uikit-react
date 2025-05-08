import { UIKitLogo } from "./logo/uikit";

const footerLinks = [
  {
    title: "Project",
    links: [
      { label: "Get Started", href: "/docs/get-started" },
      { label: "Project Status", href: "/docs/project-status" },
      { label: "Contributing", href: "/docs/contributing" },
      { label: "Releases", href: "/docs/releases" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Docs", href: "/docs/introduction" },
      { label: "Components", href: "/components/accordion" },
      { label: "Charts", href: "/charts/get-started" },
      { label: "Examples", href: "/examples" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Team",
        href: "https://github.com/lumada-design/hv-uikit-react?tab=readme-ov-file#team-",
      },
      {
        label: "Slack",
        href: "https://hitachivantara-eng.slack.com/archives/CFY74GK6G",
      },
      {
        label: "GitHub",
        href: "https://github.com/lumada-design/hv-uikit-react",
      },
      {
        label: "License",
        href: "https://github.com/lumada-design/hv-uikit-react/?tab=Apache-2.0-1-ov-file#readme",
      },
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
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
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

import appShellMeta from "../../content/app-shell/_meta";
import chartsMeta from "../../content/charts/_meta";
import componentsMeta from "../../content/components/_meta";
import docsMeta from "../../content/docs/_meta";

const entries = [
  ["docs", docsMeta],
  ["components", componentsMeta],
  ["charts", chartsMeta],
  ["app-shell", appShellMeta],
].map(([path, meta]) => {
  const metaKeys = Object.keys(meta as any).filter((k) => !k.startsWith("-- "));
  const listEntries = metaKeys.map((key) => {
    return `- [${key}](./${path}/${key === "index" ? "" : key})`;
  });

  return `## ${path}\n\n${listEntries.join("\n")}`;
});

export async function generateStaticParams() {
  return [];
}

export async function GET() {
  return new Response(`# LLMs.txt\n\n${entries.join("\n\n")}`);
}

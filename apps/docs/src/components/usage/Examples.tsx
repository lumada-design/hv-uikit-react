import {
  HvEmptyState,
  HvIconContainer,
} from "@hitachivantara/uikit-react-core";

import { CodeBlock } from "../code/CodeBlock";

// Simple helper to extract the first /** ... */ comment block
const extractDescription = (code: string): string => {
  const match = code.match(/\/\*\*([\s\S]*?)\*\//);
  if (!match) return "";

  const description = match[1]
    .split("\n")
    .map((line) => line.replace(/^\s*\* ?/, "").trim()) // remove leading "*"
    .join(" ")
    .trim();

  return description;
};

export const Examples = ({
  component,
  examples,
}: {
  component: string;
  examples: Record<string, string>;
}) => {
  if (!examples || Object.keys(examples).length === 0) {
    return (
      <HvEmptyState
        icon={
          <HvIconContainer>
            <div className="i-ph-info" />
          </HvIconContainer>
        }
        message={`No examples available for ${component}.`}
      />
    );
  }
  return (
    <div className="grid gap-md [grid-template-columns:repeat(auto-fit,minmax(360px,1fr))] auto-rows-min">
      {Object.entries(examples).map(([name, code]) => (
        <div key={name}>
          <CodeBlock
            code={code}
            description={extractDescription(code)}
            layout="popup"
          />
        </div>
      ))}
    </div>
  );
};

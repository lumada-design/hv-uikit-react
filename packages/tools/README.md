# @pentaho/uikit-tools

Lets people and agents look up UI Kit components and design rules in the
**installed** version of `@pentaho/uikit-react-core`, check code against those
rules, and point agents at the UI Kit guide.

Everything reads `@pentaho/uikit-react-core/agents/metadata.json`, built with
the components (see `docs/adr/0001-design-rules-and-metadata.md`). The CLI and
the MCP server share one core, so they return the same result.

```bash
npx uikit-tools info HvTable            # props, variant meanings, states, rules
npx uikit-tools info                    # components with guidance
npx uikit-tools rule destructive/confirm
npx uikit-tools rule HvButton/variant   # component rules use <Component>/<id>
npx uikit-tools rule                    # all design rules
npx uikit-tools validate "src/**/*.tsx" # failures reported by rule id
```

Add `--json` to `info`, `rule` or `validate` for JSON.

## Set up agents in a project

```bash
npx uikit-tools init --host claude      # or --host copilot (default)
```

Run it in the folder your editor or agent opens. It writes a marked block in
`AGENTS.md` pointing at the guide in the installed UI Kit (the nearest
`node_modules/@pentaho/uikit-react-core`, so a UI Kit hoisted to a workspace
root works), a `CLAUDE.md` block importing it for Claude Code, and registers the
`hv-uikit` MCP server (`.mcp.json` or `.vscode/mcp.json`). The guide is not
copied: upgrading the UI Kit updates it, with no need to run `init` again.
Re-running `init` replaces its own block and keeps the rest of the files; an MCP
config that is not plain JSON (e.g. with comments) is left alone and `init`
prints the entry to add.

## MCP tools

`get_component`, `get_rule`, `list_components`, `list_rules` — each takes an
optional `format` (`text`, the default, or `json`) and returns exactly what the
CLI prints.

## Skills

`skills/build-list-page` is an example workflow skill: it uses the lookups and
checks and never copies rule text. `init` does not install skills; to use it,
copy `node_modules/@pentaho/uikit-tools/skills/build-list-page` into your
agent's skills folder (e.g. `.claude/skills/`).

## Developing

```bash
npm run build:agents -w packages/core   # build the metadata the tools read
npm run build -w packages/tools
npm test -w packages/tools -- --run     # builds the CLI first
```

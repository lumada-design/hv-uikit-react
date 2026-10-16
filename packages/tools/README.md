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
npx uikit-tools check                   # every checked rule over src: file, line, rule id, fix
```

Add `--json` to `info`, `rule` or `check` for JSON.

## Checks

`check` enforces every rule the installed UI Kit marks `checked`: design rules
(e.g. `destructive/confirm`) and component rules (e.g. `HvButton/variant`). It
refuses to run (exit 3) if a checked rule has no check or a check has no checked
rule. Modes:

- default: prints `file:line rule: detail` and the fix; exits 1 on violations;
- `--report <file>`: writes the JSON report (violations, counts per rule, and the
  choice made for each rule) and exits 0, for scoring a run;
- `--gate`: for an agent host's stop hook. On violations it prints them to
  stderr and exits 2, so the agent keeps working; it lets the agent stop when
  the checks pass or after `--max-rounds` (default 3) correction rounds. For
  Claude Code, in `.claude/settings.json`:

  ```json
  {
    "hooks": {
      "Stop": [
        {
          "hooks": [
            {
              "type": "command",
              "command": "npx --no-install uikit-tools check --gate"
            }
          ]
        }
      ]
    }
  }
  ```

Checks live one per file in `src/checks/rules/<rule id>.ts` and are found by
path, so adding a checked rule takes its metadata entry (`enforcement: checked`
and a `fix`) and one check file. Checks parse each file with the TypeScript
compiler and look at one file at a time, so they judge only what that file
makes explicit:

- `destructive/confirm` flags a delete/remove call (or a delete hook's
  `mutate`/`trigger`, or `fetch` with `DELETE`) that a handler in the same file
  reaches outside a confirmation. Handlers inside an `HvDialog`, or passed to a
  `*Dialog`/`*Confirm*`/`*Modal` component, count as confirmed; calls no
  handler in the file reaches (hooks, API modules) are not judged.
- `date/format` flags date-like values (`createdAt`, `…Date`, `…Timestamp`)
  rendered as is, cut by hand or built from `getDate()`; table columns from
  `hv*Column` helpers or spread-in parts are trusted to format themselves.
- `tokens/color` looks at color contexts only (style and CSS properties, color
  props, CSS text, color-named variables) and at class names, where it also
  flags the default palette (`bg-gray-100`); `tokens/space` also flags
  numeric spacing classes (`p-4`), which work but are not the UI Kit scale.
- `layout/page` judges route modules only: files exporting a `…Page`
  component, or `pages/**/index.*` and `pages/**/*Page.*`.

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

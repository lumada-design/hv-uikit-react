# Evaluation report

Generated from 72 runs (72 valid, 0 invalid) in `evals/results` by `node evals/run.ts report`. Raw per-run numbers: `runs.json`.

**n** counts valid runs only; every mean is over them. A run is **invalid** when the agent failed or timed out, the check could not report, the agent changed no UI file, or a gated setup's gate did not run or errored. Invalid runs are listed at the end, not averaged.

Scores: **violations** are `uikit-tools check --report` findings on the finished code (never shown to the agent), per run.
**Gate rounds** are correction rounds the gate returned (max 3); **gate passed** means the checks were clean when the agent stopped.
**Review** columns are blind 0–2 scores (reviewer: –) with the number of reviewed runs in brackets.
Cost is the agent's own cost per run (list price), excluding the review.
**UI Kit tool use** is what the agent did by itself, from its transcript: `uikit-tools` lookups (cli), MCP tool calls, skill uses, and `uikit-tools check` runs (self-check; the gate's own runs are not counted).

## Setups × models (all scenarios)

| Setup | Model | n | Invalid | Violations | HvAvatar/alt | HvAvatar/variant | HvButton/icon-name | HvButton/variant | HvTable/section | prefer | date/format | confirm | layout/page | tok/color | tok/space | Gate rounds | Gate passed | Cost/run | Turns | Data states (n) | Status color (n) | Layout (n) | tsc ok | UI Kit tool use / run |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Baseline | haiku | 9 | 0 | 2.4 | 0.0 | 0.0 | 0.0 | 0.0 | 0.3 | 0.0 | 0.6 | 0.1 | 0.3 | 1.1 | 0.0 | n/a | n/a | $0.03 | 28 | – (0) | – (0) | – (0) | 100% | cli 0.0, mcp 0.0, skill 0.0, self-check 0.0 |
| Baseline | sonnet | 9 | 0 | 4.2 | 0.0 | 0.0 | 0.0 | 0.0 | 0.3 | 0.0 | 0.4 | 0.4 | 0.3 | 2.3 | 0.3 | n/a | n/a | $0.17 | 11 | – (0) | – (0) | – (0) | 100% | cli 0.0, mcp 0.0, skill 0.0, self-check 0.0 |
| Context only (guide + lookups) | haiku | 8 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.18 | 41 | – (0) | – (0) | – (0) | 100% | cli 8.5, mcp 0.0, skill 0.0, self-check 3.3 |
| Context only (guide + lookups) | sonnet | 9 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.20 | 9 | – (0) | – (0) | – (0) | 100% | cli 8.4, mcp 0.0, skill 0.0, self-check 2.2 |
| Checks only (gate) | haiku | 6 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 100% (6) | $0.19 | 45 | – (0) | – (0) | – (0) | 100% | cli 4.2, mcp 0.0, skill 0.0, self-check 3.3 |
| Checks only (gate) | sonnet | 7 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.3 | 100% (7) | $0.23 | 13 | – (0) | – (0) | – (0) | 100% | cli 2.9, mcp 0.0, skill 0.0, self-check 1.6 |
| Both (guide + lookups + gate) | haiku | 6 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 100% (6) | $0.20 | 50 | – (0) | – (0) | – (0) | 100% | cli 8.3, mcp 0.0, skill 0.0, self-check 4.2 |
| Both (guide + lookups + gate) | sonnet | 6 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 100% (6) | $0.22 | 10 | – (0) | – (0) | – (0) | 100% | cli 8.8, mcp 0.0, skill 0.0, self-check 2.2 |

## Consistency of rule choices

Within each scenario, the share of runs that made the most common decision for a rule, averaged over scenarios (runs with a decision in brackets).

| Setup | Model | destructive/confirm | date/format | layout/page | HvTable/section |
| --- | --- | --- | --- | --- | --- |
| Baseline | haiku | 67% (3) | 100% (3) | – (0) | 100% (3) |
| Baseline | sonnet | 67% (3) | 67% (3) | 100% (2) | 100% (3) |
| Context only (guide + lookups) | haiku | 100% (3) | 83% (6) | 100% (2) | 100% (3) |
| Context only (guide + lookups) | sonnet | 67% (3) | 100% (6) | – (0) | 100% (3) |
| Checks only (gate) | haiku | 67% (3) | 80% (5) | – (0) | 100% (3) |
| Checks only (gate) | sonnet | 67% (3) | 67% (3) | 100% (3) | 100% (3) |
| Both (guide + lookups + gate) | haiku | 100% (3) | 100% (6) | 100% (3) | 100% (3) |
| Both (guide + lookups + gate) | sonnet | 67% (3) | 100% (6) | 100% (2) | 100% (3) |

Most common decisions per setup (all models and scenarios):

**destructive/confirm**
- **Baseline:** HvDialog ×3; HvDialog + confirm button: primary + dialog variant: warning ×2; HvDialog + dialog variant: error ×1
- **Context only (guide + lookups):** HvDialog + dialog variant: none ×5; HvDialog + confirm button: negativeGhost + dialog variant: none ×1
- **Checks only (gate):** HvDialog ×2; HvDialog + dialog variant: none ×2; HvDialog + confirm button: negativeGhost + dialog variant: none ×2
- **Both (guide + lookups + gate):** HvDialog + dialog variant: none ×3; HvDialog + confirm button: negativeGhost + dialog variant: none ×2; HvDialog ×1

**layout/page**
- **Baseline:** no HvGlobalActions ×5
- **Context only (guide + lookups):** HvGlobalActions first, token padding ×3
- **Checks only (gate):** HvGlobalActions first, token padding ×6
- **Both (guide + lookups + gate):** HvGlobalActions first, token padding ×5

## Violations per scenario

| Scenario | baseline · haiku | baseline · sonnet | context · haiku | context · sonnet | checks · haiku | checks · sonnet | both · haiku | both · sonnet |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s1-crud | 3.0 (3) | 5.3 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) |
| s2-cardview | 1.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) | 0.0 (3) |
| s3-landing | 3.3 (3) | 7.3 (3) | 0.0 (2) | 0.0 (3) | – | 0.0 (1) | – | – |

## Deliveries on the CRUD scenario (s1-crud)

"Guide only" is the Context-only setup's s1-crud runs.

| Setup | Model | n | Invalid | Violations | HvAvatar/alt | HvAvatar/variant | HvButton/icon-name | HvButton/variant | HvTable/section | prefer | date/format | confirm | layout/page | tok/color | tok/space | Gate rounds | Gate passed | Cost/run | Turns | Data states (n) | Status color (n) | Layout (n) | tsc ok | UI Kit tool use / run |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Guide only | haiku | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.41 | 59 | – (0) | – (0) | – (0) | 100% | cli 10.7, mcp 0.0, skill 0.0, self-check 3.3 |
| Guide only | sonnet | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.36 | 15 | – (0) | – (0) | – (0) | 100% | cli 9.3, mcp 0.0, skill 0.0, self-check 4.0 |
| Guide + MCP | haiku | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.20 | 47 | – (0) | – (0) | – (0) | 100% | cli 5.7, mcp 0.0, skill 0.0, self-check 4.3 |
| Guide + MCP | sonnet | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.27 | 10 | – (0) | – (0) | – (0) | 100% | cli 7.0, mcp 0.0, skill 0.0, self-check 2.3 |
| Guide + skill | haiku | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.32 | 59 | – (0) | – (0) | – (0) | 100% | cli 4.0, mcp 0.0, skill 0.0, self-check 4.3 |
| Guide + skill | sonnet | 3 | 0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | n/a | n/a | $0.24 | 13 | – (0) | – (0) | – (0) | 100% | cli 6.0, mcp 0.0, skill 1.0, self-check 1.0 |

## Invalid runs

None.

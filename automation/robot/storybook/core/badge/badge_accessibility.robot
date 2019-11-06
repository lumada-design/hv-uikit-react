*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify badge accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | already fixed | WCAG2AA.Principle4.Guideline4_1.4_1_1.F77    | Alert icon with id fixed in <clipPath id="Alert_S_svg__a">    (note: the new version of icons should fix it just waiting for merge) |

*** Variables ***
${root-element}           --root-element "\#root > div.Component-content-4"
${ignore-duplicate-id}    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77 --ignore duplicate-id

*** Keywords ***
verify badge accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corebadge--${sample}    ${standard}    ${optional}

*** Test Cases ***                                     #sample          #options
storybook sample badgesimple against standard          badgesimple
storybook sample badgewithicon against standard        badgewithicon    ${root-element} ${ignore-duplicate-id}
    [Tags]    issue
storybook sample badgewithtext against standard        badgewithtext    ${root-element} ${ignore-duplicate-id}
    [Tags]    issue
*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify breadcrumb accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 576 | WCAG2AA.Principle4.Guideline4_1.4_1_1.F77    | icon with <clipPath id="Alert_S_svg__a"> worked on [Themes] Review icon usage across components #576 |
...              | 678 | WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Div.Name\; AXE button-name | Buttons must have discernible text (case "..." as button text) |

*** Variables ***
${root-element}            --root-element "\#root > div.Component-content-4"
${ignore-duplicate-id}     --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77 --ignore duplicate-id    # issue 576
${ignore-button-name}      --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Div.Name --ignore button-name    # issue 678


*** Keywords ***
verify breadcrumb accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--${sample}    ${standard}    ${optional}

*** Test Cases ***                                  #sample        #options
storybook sample breadcrumb1 against standard       breadcrumb1    ${root-element} ${ignore-duplicate-id}
    [Tags]    issue
storybook sample breadcrumb2 against standard       breadcrumb2    ${root-element} ${ignore-duplicate-id} ${ignore-button-name}
    [Tags]    issue
storybook sample breadcrumb3 against standard       breadcrumb3    ${root-element} ${ignore-duplicate-id} ${ignore-button-name}
    [Tags]    issue
storybook sample breadcrumb4 against standard       breadcrumb4    ${root-element} ${ignore-duplicate-id}
    [Tags]    issue
storybook sample breadcrumb5 against standard       breadcrumb5    ${root-element} ${ignore-duplicate-id} ${ignore-button-name}
    [Tags]    issue

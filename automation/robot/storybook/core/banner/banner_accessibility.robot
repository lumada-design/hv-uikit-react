*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify banner accessibility as standard
Force Tags      pa11y
Documentation
...              | issue | ignore | description |
...              | 576 | WCAG2AA.Principle4.Guideline4_1.4_1_1.F77    | icon with <clipPath id="Alert_S_svg__a"> worked on [Themes] Review icon usage across components #576 |
...              | 708 | WCAG2AA.Principle4.Guideline4_1.4_1_1.F77    | banner - WCAG2AA "Duplicate id attribute value" on (<span id="client-snackbar"...)    |
...              | 678 | WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Div.Name\; AXE button-name | This element has role of button but does not have a name available to an accessibility API |
...              | 711 | WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail\; AXE color-contrast | Actions link - This element has insufficient contrast |
...

*** Variables ***
${root-element}           --root-element "\#root > div.Component-content-4"
${ignore-duplicate-id}    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77 --ignore duplicate-id    # issue 708 & 576
${ignore-button-name}     --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Div.Name --ignore button-name    # issue 678
${ignore-contrast}        --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail --ignore color-contrast    # issue 711

*** Keywords ***
verify banner accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corebanner--${sample}    ${standard}    ${optional}

*** Test Cases ***                             #sample    #options
storybook sample banner6 against standard      banner6    ${root-element} ${ignore-duplicate-id} ${ignore-button-name} ${ignore-contrast}
    [Tags]    issue

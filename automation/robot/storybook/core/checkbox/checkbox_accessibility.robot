*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify checkbox accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 718 | label | WCAG: (1.3.1, 3.3.2) AXE  input must have labels https://dequeuniversity.com/rules/axe/3.3/label?application=axeAPI |
...              | 681 | WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail | insufficient contrast |

*** Variables ***
${root-element}       --root-element "\#root > div.Component-content-4"
${ignore-contrast}    --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail   # 681

*** Keywords ***
verify checkbox accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corecheckbox--${sample}    ${standard}    ${optional}

*** Test Cases ***                                               #sample                     #options
storybook sample checkboxdisabled against standard               checkboxdisabled            ${root-element} --ignore label
    [Tags]    issue    
storybook sample checkboxlabel against standard                  checkboxlabel
storybook sample checkboxlabeldisabled against standard          checkboxlabeldisabled       ${root-element} ${ignore-contrast}
    [Tags]    issue    
storybook sample checkboxonchange against standard               checkboxonchange
storybook sample checkboxonchangedisabled against standard       checkboxonchangedisabled    ${root-element} ${ignore-contrast}
    [Tags]    issue    
storybook sample checkboxsimple against standard                 checkboxsimple              ${root-element} --ignore label
    [Tags]    issue    
storybook sample checkboxstate against standard                  checkboxstate

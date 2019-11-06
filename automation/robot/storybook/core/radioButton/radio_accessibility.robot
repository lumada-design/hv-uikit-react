*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify radio accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 718 | label | WCAG: (1.3.1, 3.3.2) AXE  input must have labels https://dequeuniversity.com/rules/axe/3.3/label?application=axeAPI |
...              | 681 | WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail | insufficient contrast |

*** Variables ***
${root-element}       --root-element "\#root > div.Component-content-4"
${ignore-contrast}    --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail   # 681

*** Keywords ***
verify radio accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--${sample}    ${standard}    ${optional}

*** Test Cases ***                                                  #sample                        #options
storybook sample radiobuttondisabled against standard               radiobuttondisabled            ${root-element} --ignore label
storybook sample radiobuttonlabel against standard                  radiobuttonlabel
storybook sample radiobuttonlabeldisabled against standard          radiobuttonlabeldisabled       ${root-element} --ignore label ${ignore-contrast}
    [Tags]    issue
storybook sample radiobuttononchange against standard               radiobuttononchange
storybook sample radiobuttononchangedisabled against standard       radiobuttononchangedisabled    ${root-element} --ignore label ${ignore-contrast}    
    [Tags]    issue
storybook sample radiobuttonsimple against standard                 radiobuttonsimple              ${root-element} --ignore label
storybook sample radiobuttonstate against standard                  radiobuttonstate

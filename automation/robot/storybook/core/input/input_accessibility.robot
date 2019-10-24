*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify input accessibility as standard
Force Tags       pa11y
Documentation    
...              | issue | ignore | description |
...              | 248 | many | [Input] Review Accessibility (enhancement) |

*** Variables ***
${root-element}                 --root-element "\#root > div.Component-content-4"
${ignore-name}                  --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name
${ignore-label}                 --ignore WCAG2AA.Principle1.Guideline1_3.1_3_1.F68 --ignore label
${ignore-contrast}              --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail --ignore color-contrast
${ignore-InputPassword.Name}    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputPassword.Name

*** Keywords ***
verify input accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coreinput--${sample}    ${standard}    ${optional} ${root-element} ${ignore-name} ${ignore-label} ${ignore-contrast} ${ignore-InputPassword.Name}

*** Test Cases ***                                           #sample                    #options
storybook sample InputCustomProps against standard           inputcustomprops
storybook sample InputCustomValidation against standard      inputcustomvalidation
storybook sample InputDefaultValue against standard          inputdefaultvalue
storybook sample InputEmail against standard                 inputemail
storybook sample InputEvents against standard                inputevents
storybook sample InputInitialState against standard          inputinitialstate
storybook sample InputLeftIcon against standard              inputlefticon
storybook sample InputMax against standard                   inputmax
storybook sample InputMaxNumeric against standard            inputmaxnumeric
storybook sample InputNoValidation against standard          inputnovalidation
storybook sample InputPassword against standard              inputpassword
storybook sample InputRequiredMaxNumeric against standard    inputrequiredmaxnumeric
storybook sample InputSimple against standard                inputsimple
storybook sample InputSimpleDisable against standard         inputsimpledisable
storybook sample InputSimpleWithIconInfo against standard    inputsimplewithiconinfo
storybook sample InputSuggestions against standard           inputsuggestions
storybook sample InputUncontrolledValue against standard     inputuncontrolledvalue

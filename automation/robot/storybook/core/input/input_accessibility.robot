*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify input accessibility as standard
Default Tags     smoke    pa11y    issue-WCAG2AA    issue-Section508
Documentation    this component is now under maintenance be re-factory by team

*** Keywords ***
verify input accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coreinput--${sample}    ${standard}    ${optional} ${ignore_option}

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

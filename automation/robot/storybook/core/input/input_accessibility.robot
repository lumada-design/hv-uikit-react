*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y    issue


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coreinput--


*** Test Cases ***
storybook sample InputCustomValidation against standard      ${url}inputcustomvalidation
storybook sample InputInitialState against standard          ${url}inputinitialstate
storybook sample InputLeftIcon against standard              ${url}inputlefticon
storybook sample InputNoValidation against standard          ${url}inputnovalidation
storybook sample InputSimpleWithIconInfo against standard    ${url}inputsimplewithiconinfo
storybook sample InputCustomProps against standard
    [Template]    NONE
    [Documentation]
    ...    = ATTENTION! =
    ...    - *2 errors* "insufficient contrast" are waiting "Design System Team feedback"
    ...    related issue: https://github.com/pentaho/hv-uikit-react/issues/1286
    pa11y result should be equal as file    ${url}inputcustomprops    ${CURDIR}/WCAG2AA_inputcustomprops.json

*** Comments ***
the below samples have "insufficient contrast" issue that is waiting "Design System Team feedback"
storybook sample InputDefaultValue against standard          inputdefaultvalue
storybook sample InputEmail against standard                 inputemail
storybook sample InputEvents against standard                inputevents
storybook sample InputMax against standard                   inputmax
storybook sample InputMaxNumeric against standard            inputmaxnumeric
storybook sample InputPassword against standard              inputpassword
storybook sample InputRequiredMaxNumeric against standard    inputrequiredmaxnumeric
storybook sample InputSimple against standard                inputsimple
storybook sample InputSimpleDisable against standard         inputsimpledisable
storybook sample InputSuggestions against standard           inputsuggestions
storybook sample InputUncontrolledValue against standard     inputuncontrolledvalue

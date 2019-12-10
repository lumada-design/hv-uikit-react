*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coreinput--

*** Test Cases ***
storybook sample InputCustomValidation against standard      ${pa11y_script}inputcustomvalidation
storybook sample InputInitialState against standard          ${pa11y_script}inputinitialstate
storybook sample InputLeftIcon against standard              ${pa11y_script}inputlefticon
storybook sample InputNoValidation against standard          ${pa11y_script}inputnovalidation
storybook sample InputSimpleWithIconInfo against standard    ${pa11y_script}inputsimplewithiconinfo
storybook sample InputCustomProps against standard
    [Template]    NONE
    [Documentation]
    ...    = ATTENTION! =
    ...     - the *2 errors* expected errors related "insufficient contrast" are waiting "Design System Team feedback"
    ...
    ...    == NOTE! ==
    ...     - uncomment/enable the below disabled Test Case after "Design System Team feedback" feedback
    ...
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}inputcustomprops    ${CURDIR}/WCAG2AA_inputcustomprops.json


# storybook sample InputDefaultValue against standard          inputdefaultvalue
# storybook sample InputEmail against standard                 inputemail
# storybook sample InputEvents against standard                inputevents
# storybook sample InputMax against standard                   inputmax
# storybook sample InputMaxNumeric against standard            inputmaxnumeric
# storybook sample InputPassword against standard              inputpassword
# storybook sample InputRequiredMaxNumeric against standard    inputrequiredmaxnumeric
# storybook sample InputSimple against standard                inputsimple
# storybook sample InputSimpleDisable against standard         inputsimpledisable
# storybook sample InputSuggestions against standard           inputsuggestions
# storybook sample InputUncontrolledValue against standard     inputuncontrolledvalue

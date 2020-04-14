*** Setting ***
Variables        ../../_resources/storybook_variables.yaml
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coremultibutton--


*** Test Cases ***
storybook sample fixedToggleHorizontalMultipleSelection against standard         ${url}fixedtogglehorizontalmultipleselection
storybook sample inputControlledValue against standard                           ${url}inputcontrolledvalue
storybook sample labelOnlyHorizontalMultipleSelection against standard           ${url}labelonlyhorizontalmultipleselection
storybook sample labelOnlyHorizontalSingleSelection against standard             ${url}labelonlyhorizontalsingleselection
storybook sample labelWithIconHorizontalMultipleSelection against standard       ${url}labelwithiconhorizontalmultipleselection
storybook sample labelWithIconHorizontalSingleSelection against standard         ${url}labelwithiconhorizontalsingleselection
storybook sample minimumSelectionHorizontalMultipleSelection against standard    ${url}minimumselectionhorizontalmultipleselection
storybook sample maximumSelectionHorizontalMultipleSelection against standard    ${url}maximumselectionhorizontalmultipleselection
storybook sample labelOnlyVerticalMultipleSelection against standard             ${url}labelonlyverticalmultipleselection
storybook sample labelOnlyVerticalSingleSelection against standard               ${url}labelonlyverticalsingleselection
storybook sample labelWithIconVerticalMultipleSelection against standard         ${url}labelwithiconverticalmultipleselection
storybook sample labelWithIconVerticalSingleSelection against standard           ${url}labelwithiconverticalsingleselection
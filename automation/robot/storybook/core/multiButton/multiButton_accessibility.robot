*** Setting ***
Variables        ../../_resources/storybook_variables.yaml
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coremultibutton--


*** Test Cases ***
storybook sample fixedToggleHorizontalMultipleSelection against standard         ${pa11y_script}fixedtogglehorizontalmultipleselection
storybook sample inputControlledValue against standard                           ${pa11y_script}inputcontrolledvalue
storybook sample labelOnlyHorizontalMultipleSelection against standard           ${pa11y_script}labelonlyhorizontalmultipleselection
storybook sample labelOnlyHorizontalSingleSelection against standard             ${pa11y_script}labelonlyhorizontalsingleselection
storybook sample labelWithIconHorizontalMultipleSelection against standard       ${pa11y_script}labelwithiconhorizontalmultipleselection
storybook sample labelWithIconHorizontalSingleSelection against standard         ${pa11y_script}labelwithiconhorizontalsingleselection
storybook sample minimumSelectionHorizontalMultipleSelection against standard    ${pa11y_script}minimumselectionhorizontalmultipleselection
storybook sample maximumSelectionHorizontalMultipleSelection against standard    ${pa11y_script}maximumselectionhorizontalmultipleselection
storybook sample labelOnlyVerticalMultipleSelection against standard             ${pa11y_script}labelonlyverticalmultipleselection
storybook sample labelOnlyVerticalSingleSelection against standard               ${pa11y_script}labelonlyverticalsingleselection
storybook sample labelWithIconVerticalMultipleSelection against standard         ${pa11y_script}labelwithiconverticalmultipleselection
storybook sample labelWithIconVerticalSingleSelection against standard           ${pa11y_script}labelwithiconverticalsingleselection
storybook sample iconOnlyHorizontalMultipleSelection against standard            ${pa11y_script}icononlyhorizontalmultipleselection


#storybook sample iconOnlyHorizontalSingleSelection against standard              icononlyhorizontalsingleselection
#storybook sample iconOnlyVerticalMultipleSelection against standard              icononlyverticalmultipleselection
#storybook sample iconOnlyVerticalSingleSelection against standard                icononlyverticalsingleselection

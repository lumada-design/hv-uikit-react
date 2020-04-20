*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-input--


*** Test Cases ***
storybook sample InputCustomValidation against standard      ${url}custom-validation
storybook sample InputInitialState against standard          ${url}invalid-state
storybook sample InputNoValidation against standard          ${url}no-validation
storybook sample InputSimpleWithIconInfo against standard    ${url}with-icon-info
storybook sample InputCustomProps against standard           ${url}custom-props
storybook sample InputDefaultValue against standard          ${url}default-value
storybook sample InputEmail against standard                 ${url}email
storybook sample InputEvents against standard                ${url}event-demostration
storybook sample InputMax against standard                   ${url}limited
storybook sample InputMaxNumeric against standard            ${url}numeric-limited
storybook sample InputPassword against standard              ${url}password
storybook sample InputRequiredMaxNumeric against standard    ${url}numeric-required
storybook sample InputSimple against standard                ${url}main
storybook sample InputSuggestions against standard           ${url}suggestion
storybook sample InputUncontrolledValue against standard     ${url}controlled-with-buttons

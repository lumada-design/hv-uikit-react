*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/accessibility.robot
Test Template      verify element accessibility as standard
Default Tags       smoke    pa11y    Section508

*** Variables ***
${storybook_iframe}    ${STORYBOOK_URL}/iframe.html?id=coremultibutton--

*** Test Cases ***                                                                         url                                                               standard   
storybook sample fixedToggleHorizontalMultipleSelectionagainst standard Section508         ${storybook_iframe}fixedToggleHorizontalMultipleSelection         Section508
storybook sample iconOnlyHorizontalMultipleSelectionagainst standard Section508            ${storybook_iframe}iconOnlyHorizontalMultipleSelection            Section508
storybook sample iconOnlyHorizontalSingleSelectionagainst standard Section508              ${storybook_iframe}iconOnlyHorizontalSingleSelection              Section508
storybook sample inputControlledValueagainst standard Section508                           ${storybook_iframe}inputControlledValue                           Section508
storybook sample labelOnlyHorizontalMultipleSelectionagainst standard Section508           ${storybook_iframe}labelOnlyHorizontalMultipleSelection           Section508
storybook sample labelOnlyHorizontalSingleSelectionagainst standard Section508             ${storybook_iframe}labelOnlyHorizontalSingleSelection             Section508
storybook sample labelWithIconHorizontalMultipleSelectionagainst standard Section508       ${storybook_iframe}labelWithIconHorizontalMultipleSelection       Section508
storybook sample labelWithIconHorizontalSingleSelectionagainst standard Section508         ${storybook_iframe}labelWithIconHorizontalSingleSelection         Section508
storybook sample minimumSelectionHorizontalMultipleSelectionagainst standard Section508    ${storybook_iframe}minimumSelectionHorizontalMultipleSelection    Section508
storybook sample maximumSelectionHorizontalMultipleSelectionagainst standard Section508    ${storybook_iframe}maximumSelectionHorizontalMultipleSelection    Section508
storybook sample iconOnlyVerticalMultipleSelectionagainst standard Section508              ${storybook_iframe}iconOnlyVerticalMultipleSelection              Section508
storybook sample iconOnlyVerticalSingleSelectionagainst standard Section508                ${storybook_iframe}iconOnlyVerticalSingleSelection                Section508
storybook sample labelOnlyVerticalMultipleSelectionagainst standard Section508             ${storybook_iframe}labelOnlyVerticalMultipleSelection             Section508
storybook sample labelOnlyVerticalSingleSelectionagainst standard Section508               ${storybook_iframe}labelOnlyVerticalSingleSelection               Section508
storybook sample labelWithIconVerticalMultipleSelectionagainst standard Section508         ${storybook_iframe}labelWithIconVerticalMultipleSelection         Section508
storybook sample labelWithIconVerticalSingleSelectionagainst standard Section508           ${storybook_iframe}labelWithIconVerticalSingleSelection           Section508
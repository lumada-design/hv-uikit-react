*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/accessibility.robot
Test Template      verify element accessibility as standard
Default Tags       smoke    pa11y    WCAG2AA

*** Variables ***
${storybook_iframe}    ${STORYBOOK_URL}/iframe.html?id=coremultibutton--
${pa11y_options}       --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2    #ignore lang on <html><head>

*** Test Cases ***                                                                      url                                                               standard   options
storybook sample fixedToggleHorizontalMultipleSelectionagainst standard WCAG2AA         ${storybook_iframe}fixedToggleHorizontalMultipleSelection         WCAG2AA    ${pa11y_options}    
storybook sample iconOnlyHorizontalMultipleSelectionagainst standard WCAG2AA            ${storybook_iframe}iconOnlyHorizontalMultipleSelection            WCAG2AA    ${pa11y_options}
storybook sample iconOnlyHorizontalSingleSelectionagainst standard WCAG2AA              ${storybook_iframe}iconOnlyHorizontalSingleSelection              WCAG2AA    ${pa11y_options}
storybook sample inputControlledValueagainst standard WCAG2AA                           ${storybook_iframe}inputControlledValue                           WCAG2AA    ${pa11y_options}
storybook sample labelOnlyHorizontalMultipleSelectionagainst standard WCAG2AA           ${storybook_iframe}labelOnlyHorizontalMultipleSelection           WCAG2AA    ${pa11y_options}
storybook sample labelOnlyHorizontalSingleSelectionagainst standard WCAG2AA             ${storybook_iframe}labelOnlyHorizontalSingleSelection             WCAG2AA    ${pa11y_options}
storybook sample labelWithIconHorizontalMultipleSelectionagainst standard WCAG2AA       ${storybook_iframe}labelWithIconHorizontalMultipleSelection       WCAG2AA    ${pa11y_options}
storybook sample labelWithIconHorizontalSingleSelectionagainst standard WCAG2AA         ${storybook_iframe}labelWithIconHorizontalSingleSelection         WCAG2AA    ${pa11y_options}
storybook sample minimumSelectionHorizontalMultipleSelectionagainst standard WCAG2AA    ${storybook_iframe}minimumSelectionHorizontalMultipleSelection    WCAG2AA    ${pa11y_options}
storybook sample maximumSelectionHorizontalMultipleSelectionagainst standard WCAG2AA    ${storybook_iframe}maximumSelectionHorizontalMultipleSelection    WCAG2AA    ${pa11y_options}
storybook sample iconOnlyVerticalMultipleSelectionagainst standard WCAG2AA              ${storybook_iframe}iconOnlyVerticalMultipleSelection              WCAG2AA    ${pa11y_options}
storybook sample iconOnlyVerticalSingleSelectionagainst standard WCAG2AA                ${storybook_iframe}iconOnlyVerticalSingleSelection                WCAG2AA    ${pa11y_options}
storybook sample labelOnlyVerticalMultipleSelectionagainst standard WCAG2AA             ${storybook_iframe}labelOnlyVerticalMultipleSelection             WCAG2AA    ${pa11y_options}
storybook sample labelOnlyVerticalSingleSelectionagainst standard WCAG2AA               ${storybook_iframe}labelOnlyVerticalSingleSelection               WCAG2AA    ${pa11y_options}
storybook sample labelWithIconVerticalMultipleSelectionagainst standard WCAG2AA         ${storybook_iframe}labelWithIconVerticalMultipleSelection         WCAG2AA    ${pa11y_options}
storybook sample labelWithIconVerticalSingleSelectionagainst standard WCAG2AA           ${storybook_iframe}labelWithIconVerticalSingleSelection           WCAG2AA    ${pa11y_options}

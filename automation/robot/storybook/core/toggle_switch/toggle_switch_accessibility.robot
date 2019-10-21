*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify element accessibility as standard
Default Tags    smoke    pa11y

*** Variables ***
${smoke_toggle_page}       ${STORYBOOK_URL}/${TOGGLE_PAGE}

*** Test Cases ***                                                                                     url                          standard
usual toggle switch scenarios against accessibility standard WCAG2AA                                   ${smoke_toggle_page}	        WCAG2AA
        [Tags]    issue
        [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/604 
usual toggle switch scenarios against accessibility standard Section508                                ${smoke_toggle_page}	        Section508
#wicked theme on usual toggle switch scenarios against accessibility standard WCAG2AA                  ${smoke_toggle_page}/?	    WCAG2AA
#wicked theme on usual toggle switch scenarios against accessibility standard Section508               ${smoke_toggle_page}/?	    Section508
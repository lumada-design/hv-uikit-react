*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify element accessibility as standard
Default Tags    smoke    pa11y

*** Variables ***
${smoke_button_page}       ${STORYBOOK_URL}/${BUTTON_PAGE}
${negative_button_page}    ${STORYBOOK_URL}/iframe.html?id=corebutton--negative
    
*** Test Cases ***                                                                               url                        standard
usual button scenarios against accessibility standard WCAG2AA                                   ${smoke_button_page}	    WCAG2AA
usual button scenarios against accessibility standard Section508                                ${smoke_button_page}	    Section508
#wicked theme on usual button scenarios against accessibility standard WCAG2AA                  ${smoke_button_page}/?	    WCAG2AA
#wicked theme on usual button scenarios against accessibility standard Section508               ${smoke_button_page}/?	    Section508

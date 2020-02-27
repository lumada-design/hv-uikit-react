*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        wait until template is opened
Force Tags        smoke    
Documentation     Test Cases based on: Design System Version 1.2.0 


*** Keywords ***
wait until template is opened
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template--navigationsystem
    Wait Until Element Is Visible        ${horizontalItems}        10s
    
    
*** Test Cases ***
change vertical items when select other horizontal item
    Click Element                    ${verticalBurger}
    Element Text Should Be           ${verticalItems}      SCPodF\nCompute\nStorage\nEthernet\nFiber Channel
    Click Element                    ${horizontalItem3}
    Wait Until Keyword Succeeds      3x                    300ms    Element Text Should Be    ${verticalItems}    Model Effectiveness

does not show vertical bar when horizontal item does not have child
    Click Element                        ${horizontalItem4}
    Wait Until Element Is Not Visible    ${verticalBurger}       4s
    Element Should Not Be Visible        ${verticalAnchorBar}



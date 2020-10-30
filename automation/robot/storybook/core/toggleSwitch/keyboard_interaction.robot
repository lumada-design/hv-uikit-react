*** Setting ***
Resource          _toggleSwitch.resource
Suite Setup       reduce Selenium Speed for ie keyboard events    1s
Test Setup        open toggle switch sample    main
Suite Teardown    Set Selenium Speed  0s
Force Tags        keyboard


*** Test Cases ***
TAB sequence
    set focus and press keys     css:body    TAB
    Element Should Be Focused    ${switch}(1) input
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${switch}(2) input

switch when is pressed SPACE
    Checkbox Should not Be Selected             ${switch}(1) input
    set focus and press keys                    ${switch}(1) input    SPACE
    Wait Until Page Contains Element            ${switch}(1) input:checked
    Press Keys                                  NONE    SPACE
    Wait Until Page Does Not Contain Element    ${switch}(1) input:checked
    # selenium kw "Checkbox Should Be Selected" fails in IE synchronous

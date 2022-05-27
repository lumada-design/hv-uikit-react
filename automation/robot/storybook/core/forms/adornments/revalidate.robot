*** Setting ***
Resource          _adornments.resource
Suite Setup       Set Selenium Speed    0.1 seconds
Test Setup        open adornment sample    ${howto}    main
Suite Teardown    Set Selenium Speed    0 seconds
Documentation
...    was verified a firefox webdriver error!!
...    - Was opened https://github.com/mozilla/geckodriver/issues/1742
...    work around :
...    - used locator of label that redirects to input
...    - Set Selenium Speed    0.1 seconds


*** Test Cases ***
does not show validation adornment icons when input was cleaned
    Press Keys                           ${input}    Joao    TAB
    wait until element is Visible        ${adornment_accepted}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE
    Press Keys                           ${label}    TAB
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited
    Press Keys                           ${input}    Joao    TAB
    wait until element is Visible        ${adornment_accepted}
    click Element                        ${label}
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited by clicking in label
    Input Text                       ${input}    Joao
    Click Element                    ${input}
    Wait Until Element Is Visible    ${input}:focus
    Element Should Not Be Visible    ${adornment_accepted}

revalidate adornments when input value is changed - failed to accepted
    Press Keys                       ${input}    a1b2    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE   Joao
    Press Keys                       ${label}    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate adornments when input value is changed - accepted to accepted
    Press Keys                       ${input}    Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE
    Press Keys                       ${input}    Goncalves    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate input when focus goes out - failed to failed
    Press Keys                       ${input}    a1    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE
    Press Keys                       ${input}    1a    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - accepted to failed
    Press Keys                       ${input}    Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE
    Press Keys                       ${label}    1a    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

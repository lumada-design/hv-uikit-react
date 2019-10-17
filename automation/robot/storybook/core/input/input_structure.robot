*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook
Suite Teardown     Close Browser
Default Tags       smoke

*** Test Cases ***
input clear text
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimplewithiconinfo
    Wait Until Element Is Enabled       //input[@type='text']    10s
    Input Text                          //input[@type='text']    test insert and delete text
    Element Attribute Value Should Be       //input[@type='text']    value                          test insert and delete text
    Wait Until Page Contains Element    //*[@role='button']      2s
    Click Element                       //*[@role='button']
    Element Attribute Value Should Be       //input[@type='text']    value                          ${EMPTY}

input static labels
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreinput--inputsimplewithiconinfo
    Wait Until Element Is Enabled    //input[@type='text']                  10s
    Element Text Should Be           (//*[@id='test']//p)[1]                Label
    Element Text Should Be           (//*[@id='test']//p)[2]                Info
    Page Should Contain Element      //*[@id='test']//div[@title='Info']

*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke              

*** Test Cases ***
close a toggle button and open it again
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--sample1
    Wait Until Element Is Visible    //div[@role='checkbox' and @aria-checked='false' and @title='Open']
    Click Element                    //div[@role='checkbox' and @aria-checked='false' and @title='Open']
    Wait Until Element Is Visible    //div[@role='checkbox' and @aria-checked='true' and @title='Closed']
    Click Element                    //div[@role='checkbox' and @aria-checked='true' and @title='Closed']
    Wait Until Element Is Visible    //div[@role='checkbox' and @aria-checked='false' and @title='Open']
 
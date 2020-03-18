*** Setting ***
Library     SeleniumLibrary
Resource    ../../../_resources/storybook_keywords.robot


*** Keywords ***
open storybook button page
    open storybook
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke
    Wait Until Element Is Visible    css:button    2s    error message: The page don't was visible in 2 seconds

*** Setting ***
Library    SeleniumLibrary
Suite Setup    Open Browser    ${url_react}    browser=edge
Suite Teardown    Close Browser

*** Variables ***
${url_react}    http://172.20.43.239:9001/?selectedKind=Core&selectedStory=TextArea&full=0&addons=0&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

*** Test Cases ***
Test all browsers
    [Tags]    TTT
    Maximize Browser Window
    Wait Until Page Contains    Basic text area usage    timeout=3s

className Property don't declared / default
    log    to do 
className Property without value
    log    to do
className Property value empty
    log    to do
className Property value alpha numeric Camel case and special chars
    log    to do
className Property value unusual special chars
    log    to do
id Property DOM Localization
    log    to do
id Property don't declared / default
    log    to do
id Property without value
    log    to do
id Property value empty
    log    to do
id Property value alpha numeric Camel case and special chars
    log    to do
id Property value unusual special chars
    log    to do
labels Property DOM Localization
    log    to do
labels Property don't declared / default
    log    to do
labels Property without value
    log    to do
labels Property value empty
    log    to do
labels Property value alpha numeric Camel case and special chars
    log    to do
labels Property value unusual special chars
    log    to do
rows Property DOM Localization
    log    to do
rows Property don't declared
    log    to do
rows Property without value
    log    to do
rows Property value empty
    log    to do
rows Property minimal allowed value
    log    to do
rows Property maximal allowed value
    log    to do
rows Property out allowed value (minimal)
    log    to do
maxCharQuantity Property DOM Localization
    log    to do
maxCharQuantity Property don't declared
    log    to do
maxCharQuantity Property without value
    log    to do
maxCharQuantity Property value empty
    log    to do    
maxCharQuantity Property minimal allowed value
    log    to do
maxCharQuantity Property maximal allowed value
    log    to do
maxCharQuantity Property out allowed value (minimal)
    log    to do
disabled Property don't declared
    log    to do
disabled Property without value
    log    to do
disabled Property value empty
    log    to do
disabled Property value as true
    log    to do
disabled Property value as false
    log    to do
user is unable insert text on disabled textarea
    log    to do
user insert text the count label are updated/increased
    log    to do
user delete text the count label are updated/decreased
    log    to do
user try insert more text then that is allowed
    log    to do
user insert "enter" commands
    log    to do
user press keyboard combination "enter" and "delete"
    log    to do
user press keyboard combination "up","down","right","left"
    log    to do
user press keyboard "tab"
    log    to do
user select all text
    log    to do
    

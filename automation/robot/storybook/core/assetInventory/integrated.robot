*** Setting ***
Resource          _keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        Run Keywords
...               Go To    ${components}asset-inventory--configurations
...               AND      Wait Until Element Is Visible    hv-assetinventory
Force Tags        smoke


*** Test Cases ***
select, search and sort
    Select Checkbox                ${checkBox4}
    Input Text                     ${searchBox}    Track
    Click Element                  ${dropdownHeader}
    Click Element                  ${sortTitleDesc}
    Checkbox Should Be Selected    ${checkBox4}

search, select, list view, select, paginate and card view
    Input Text                         ${searchBox}    Track
    Select Checkbox                    ${checkBox4}
    Click Element                      ${listViewButton}
    Select Checkbox                    ${checkBox1}
    Click Element                      ${pageNext}
    Checkbox Should Not Be Selected    ${checkBox1}
    Click Element                      ${cardViewButton}
    Click Element                      ${pagePrevious}
    Checkbox Should Be Selected        ${checkBox1}
    Checkbox Should Be Selected        ${checkBox4}

pageSize, select, sort and paginate
    Select Checkbox                ${checkBox1}
    Click Element                  ${dropdownHeader}
    Click Element                  ${sortTitleDesc}
    Select From List By Label      ${pageSize}    2
    Click Element                  ${pageLast}
    Checkbox Should Be Selected    ${checkBox2}

*** Setting ***
Resource    ../_table.resource


*** Keywords ***
should sort column by ascending
    [Documentation]
    ...   sort column by ascending when column is not sorted and her header is clicked
    Click Element                                  ${header}(4)
    Wait Until Page Contains Element               ${header}(4)\[aria-sort=ascending]
    Wait Until Keyword Succeeds                    2x     1.5s
    ...   column should be sorted by ascending     ${column}(4)

should sort column by descending
    [Documentation]
    ...   sort column by descending when column is sorted by ascending and her header is clicked
    Click Element                                  ${header}(4)
    Wait Until Page Contains Element               ${header}(4)\[aria-sort=ascending]
    Click Element                                  ${header}(4)
    Wait Until Page Contains Element               ${header}(4)\[aria-sort=descending]
    Wait Until Keyword Succeeds                    2x     1.5s
    ...   column should be sorted by descending    ${column}(4)

should not be sortable
    # bug-infrastructure-firefox 
    # fails sporadically because the values in severity column are not present initially
    # cannot be reproduced outside of automation. 
    [Tags]    bug-infrastructure-firefox
    [Documentation]     does nothing when column is not sortable
    ${before}          get column values    ${column}(6)
    Click Element      ${header}(6)
    ${after}           get column values    ${column}(6)
    Should Be Equal    ${before}    ${after}

column should be sorted by ascending
    [Arguments]    ${csslocator}
    ${csslocator}    Replace String       ${csslocator}    css:    ${EMPTY}
    ${ascending}    Execute Javascript    ${js1}${csslocator}${js2}.sort();
    ${actual}    Execute Javascript       ${js1}${csslocator}${js2};
    Should Be Equal                       ${actual}  ${ascending}

column should be sorted by descending
    [Arguments]    ${csslocator}
    ${csslocator}    Replace String        ${csslocator}    css:    ${EMPTY}
    ${descending}    Execute Javascript    ${js1}${csslocator}${js2}.sort().reverse();
    ${actual}    Execute Javascript        ${js1}${csslocator}${js2};
    Should Be Equal                        ${actual}  ${descending}

get column values
    [Arguments]    ${csslocator}
    ${csslocator}    Replace String    ${csslocator}    css:    ${EMPTY}
    ${values}    Execute Javascript    ${js1}${csslocator}${js2};
    [Return]    ${values}


*** variables ***
${js1}    return Array.from(document.querySelectorAll("
${js2}    ")).map(function(el){return el.innerText.trim();})

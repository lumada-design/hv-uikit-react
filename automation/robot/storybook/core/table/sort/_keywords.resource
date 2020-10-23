*** Setting ***
Resource    ../_table.resource


*** Keywords ***
column should be sorted by ascending
    [Arguments]    ${csslocator}
    ${csslocator}=     Replace String     ${csslocator}    css:    ${EMPTY}
    ${ascending}       Execute Javascript   ${block_1}${csslocator}${block_2}.sort();
    ${actual}          Execute Javascript   ${block_1}${csslocator}${block_2};
    Should Be Equal    ${actual}  ${ascending}

column should be sorted by descending
    [Arguments]    ${csslocator}
    ${csslocator}=     Replace String        ${csslocator}    css:    ${EMPTY}
    ${descending}      Execute Javascript    ${block_1}${csslocator}${block_2}.sort().reverse();
    ${actual}          Execute Javascript    ${block_1}${csslocator}${block_2};
    Should Be Equal    ${actual}  ${descending}

get column values
    [Arguments]    ${csslocator}
    ${csslocator}=    Replace String    ${csslocator}    css:    ${EMPTY}
    ${values}         Execute Javascript    ${block_1}${csslocator}${block_2};
    [Return]          ${values}


*** variables ***
${column}             css:[id*=priority][role=cell]
${header}             css:[id*=priority][role=columnheader]
${block_1}            return Array.from(document.querySelectorAll("
${block_2}            ")).map(function(el){return el.innerText.trim();})
${severity column}    css:[id*=severity][role=cell]
${severity header}    css:[id*=severity][role=columnheader]

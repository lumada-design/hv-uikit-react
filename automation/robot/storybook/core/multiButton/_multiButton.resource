*** Setting ***
Resource    ../_keywords.resource
Library     String


*** Keywords ***
Open multiButton sample
    [Arguments]    ${sample}
    Go To                            ${inputs}multi-button--${sample}
    Wait Until Element Is Enabled    ${multiButton}

multiButton selection should be
    [Arguments]    ${selections}
    [Documentation]
    ...  which order multibutton has buttons pressed
    ...  ${selections} should be True or false and separated by a space
    ...  example "True False True"
    @{values}    Split String    ${selections}
    FOR   ${index}   ${val}    IN ENUMERATE    @{values}
    Run Keyword If  '${val.lower()}'=='true'
    ...    Element Attribute Value Should Be    ${button}(${${index}+1})    aria-pressed    true
    ...    ELSE
    ...    Element Attribute Value Should Be    ${button}(${${index}+1})    aria-pressed    false
    END


*** Variables ***
${multiButton}    css:\.HvMultiButton-root
${button}         css:\.HvMultiButton-root>button:nth-child

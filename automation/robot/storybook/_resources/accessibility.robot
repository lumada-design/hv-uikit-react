*** Setting ***
Library            Process

*** Keywords ***
verify element accessibility as standard
    [Arguments]    ${url}    ${standard}    ${optional}=--root-element "\#root > div.Component-content-4"
    [Documentation]   
    ...    note: the pa11y MUST be configured on the "path environment variable"  (ex: C:\\Users\\...userName...\\AppData\\Roaming\\npm\\pa11y)
    ...     
    ...   | Arguments: | Description | Default Value |
    ...   | url        |   url page |  |
    ...   | standard   |   the accessibility standard to use: Section508, WCAG2A, WCAG2AA (default), WCAG2AAA – only used by htmlcs runner | WCAG2AA |
    ...   | optional   |   available options on https://github.com/pa11y/pa11y | --root-element "\#root > div.Component-content-4"  | 
    ...    
    ${script}         Set Variable        pa11y --runner htmlcs --runner axe --reporter json --standard ${standard} ${optional} ${url}
    ${result}=        Run Process         ${script}       shell=True    timeout=120s    alias=${url}${optional}${standard}
    Run Keyword If    ${result.rc} > 0    report error   ${url}${optional}${standard}
    
report error
    [Arguments]    ${alias}
    ${stdout}         ${stderr}=           Get Process Result    ${alias}    stdout=yes    stderr=yes
    Log To Console    accessibility errors was found:
    Log To Console    result: ${stdout}
    Log To Console    errors: ${stderr}
    fail              accessibility errors please check previous log messages.
    

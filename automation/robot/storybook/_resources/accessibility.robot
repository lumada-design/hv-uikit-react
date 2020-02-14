*** Setting ***
Library    Process
Library    OperatingSystem


*** Keywords ***
files should be equal
    [Arguments]    ${AfilePath}    ${BfilePath}
    [Documentation]
    ...    ignores:
    ...     - blank lines
    ...     - space at end of line
    ...     - cr at end of file
    ...
    @{args}                        Set Variable           diff           --ignore-blank-lines    --ignore-space-at-eol    --ignore-cr-at-eol    --no-index      --word-diff
    ${gitResult}=                  Run Process            git            @{args}                ${AfilePath}             ${BfilePath}          timeout=180s
    Should Be Empty                ${gitResult.stdout}
    Should Be Equal As Integers    ${gitResult.rc}        0       ${gitResult.stderr}

pa11y result should be equal as file
    [Arguments]    ${pa11yScript}    ${expectedFile}
    [Documentation]
     ...   | Arguments:   | Description                                            |
     ...   | pa11yScript  | pa11y cmd instruction (https://github.com/pa11y/pa11y) |
     ...   | expectedFile | file path with expected results                        |
     ...    
     ...    - Run pa11y script and then compared saved results file with a given file. 
     ...    - Fails if files don't are compared/exists or if files don't are equivalent.
     ...
    run process and save results    ${pa11yScript}           ${expectedFile}Delete
    create json formated file       ${expectedFile}Delete    ${expectedFile}2
    files should be equal           ${expectedFile}          ${expectedFile}2
    Remove File                     ${expectedFile}Delete
    Remove File                     ${expectedFile}2

pa11y should not find errors
    [Arguments]    ${pa11yScript}
    [Documentation]
     ...   | Arguments:      | Description                                            |
     ...   | pa11yScript     | pa11y cmd instruction (https://github.com/pa11y/pa11y) |
     ...   - Fails if pa11y return any error
     ...
    ${pa11yResult}=                Run Process          ${pa11yScript}    shell=True    timeout=180s
    Should Be Equal As Integers    ${pa11yResult.rc}    0                 ${pa11yResult.stderr} ${pa11yResult.stdout}

run process and save results
    [Arguments]    ${script}    ${file}
    [Documentation]
    ...    - Save process results to a given file path 
    ...    - fails if is process return any error 
    ...       
    ${result}=         Run Process         ${script}      stdout=${file}    shell=True    timeout=180s    on_timeout=continue
    Should Be Empty    ${result.stderr}    ${result.stderr}

create json formated file
    [Arguments]    ${stringFile}    ${jsonFile}    
    [Documentation]    
    ...    | Arguments:    | Description           |
    ...    | stringFile    | path of existent string file |
    ...    | jsonFile      | path to new file with string formated as json |
     ...   - Fails if pa11y return any error
     ...    
    ${result}=         Run Process         python -m json.tool ${stringFile}    stdout=${jsonFile}    shell=True    timeout=180s
    Should Be Empty    ${result.stderr}    ${result.stderr}
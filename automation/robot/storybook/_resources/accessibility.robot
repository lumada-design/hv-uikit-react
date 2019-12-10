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
    @{args}                        Set Variable           diff           --ignore-blank-line    --ignore-space-at-eol    --ignore-cr-at-eol    --no-index      --word-diff
    ${gitResult}=                  Run Process            git            @{args}                ${AfilePath}             ${BfilePath}          timeout=120s
    Should Be Empty                ${gitResult.stdout}
    Should Be Equal As Integers    ${gitResult.rc}        0              ${gitResult.stderr}

pa11y result should be equal as file
    [Arguments]    ${pa11yScript}    ${expectedFile}
    [Documentation]
     ...   | Arguments:   | Description                                            |
     ...   | pa11yScript  | pa11y cmd instruction (https://github.com/pa11y/pa11y) |
     ...   | expectedFile | file path with expected results                        |
     ...
     ...   Run pa11y script and then compared saved results file with a given file. \n
     ...   Fails if files don't are compared/exists or if files don't are equivalent.
     ...
    ${pa11yResult}=          Run Process               ${pa11yScript}      stdout=${expectedFile}Delete    shell=True    timeout=120s
    Should Be Empty          ${pa11yResult.stderr}
    ${prettyJson}=           Run Process               python -m json.tool ${expectedFile}Delete    stdout=${expectedFile}2    shell=True    timeout=120s
    files should be equal    ${expectedFile}        ${expectedFile}2
    Remove File              ${expectedFile}Delete

pa11y should not find errors
    [Arguments]    ${pa11yScript}
    [Documentation]
     ...   | Arguments:      | Description                                            |
     ...   | pa11yScript     | pa11y cmd instruction (https://github.com/pa11y/pa11y) |
     ...   Fails if pa11y return any error
     ...
    ${pa11yResult}=                Run Process          ${pa11yScript}    shell=True    timeout=120s
    Should Be Equal As Integers    ${pa11yResult.rc}    0                 ${pa11yResult.stderr} ${pa11yResult.stdout}

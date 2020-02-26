*** Setting ***
Library    Process
Library    OperatingSystem
Library    ${CURDIR}${/}RemoveAttributesAndIndent.py
Library    ${CURDIR}${/}DiffFiles.py

*** Keywords ***
files should be equal
    [Arguments]    ${expectedFile}
    [Documentation]
     ...   | Arguments:   | Description                                            |
     ...   | expectedFile | file path with expected results                        |
     ...
     ...   Run diff of generated files and prints both files to the output
     ...   Fails if files don't are compared/exists or if files don't are equivalent.
     ...
    ${diffResult}=                 Run Process            python         ${CURDIR}${/}DiffFiles.py        ${expectedFile}
    Should Be Empty                ${diffResult.stdout}

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
    ${pa11yResult}=              Run Process              ${pa11yScript}                               stdout=${expectedFile}Delete    shell=True    timeout=120s
    Should Be Empty              ${pa11yResult.stderr}
    ${pythonResult}=             Run Process              python                                       ${CURDIR}${/}RemoveAttributesAndIndent.py    ${expectedFile}  shell=True
    Log                          ${pythonResult.stdout}   WARN
    files should be equal        ${expectedFile}
    Remove File                  ${expectedFile}Delete
    Remove File                  ${expectedFile}2

pa11y should not find errors
    [Arguments]    ${pa11yScript}
    [Documentation]
     ...   | Arguments:      | Description                                            |
     ...   | pa11yScript     | pa11y cmd instruction (https://github.com/pa11y/pa11y) |
     ...   Fails if pa11y return any error
     ...
    ${pa11yResult}=                Run Process          ${pa11yScript}    shell=True    timeout=120s
    Should Be Equal As Integers    ${pa11yResult.rc}    0                 ${pa11yResult.stderr} ${pa11yResult.stdout}

*** Setting ***
Library      Process
Library      OperatingSystem
Library      String
Library      customLibrary.py
Variables    accessibility_variables.py
Resource     variables.Resource


*** Keywords ***
get pa11y errors
    [Arguments]    ${url}
    [Documentation]
    ...    run pa11y script against ${url} and return path of saved errors results
    ...
    ${story}                       Fetch From Right
    ...                            ${url}    id=
    ${pa11yResult}=                Run Process    @{PA11Y_JSON}    ${url}
    ...                            stdout=${OUTPUT_DIR}${/}${story}
    ...                            stderr=STDOUT    timeout=60s
    Should Be Equal As Integers    ${pa11yResult.rc}    2    ${pa11yResult.stdout}
    [Return]                       ${pa11yResult.stdout_path}

pa11y should not find errors
    [Arguments]    ${url}
    [Documentation]
     ...   run pa11y script against ${url}
     ...   fails if pa11y return error and then save a related error file on outputdir
     ...
    ${story}                       Fetch From Right
    ...                            ${url}    id=
    ${pa11yResult}=                Run Process    @{PA11Y_CONSOLE}    ${url}
    ...                            stdout=${OUTPUT_DIR}${/}${story}
    ...                            stderr=STDOUT    timeout=60s
    Should Be Equal As Integers    ${pa11yResult.rc}    0    ${pa11yResult.stdout_path}
    Remove File                    ${pa11yResult.stdout_path}

pa11y result should be equal as file
    [Arguments]    ${url}    ${expectedFile}
    [Documentation]
     ...   run pa11y script against ${url} and compare results a given file. \n
     ...   fails if pa11y return error and then save a related error file on outputdir
     ...
    ${file}=                 get pa11y errors    ${url}
    Extract Codes            ${file}             ${file}_codes
    Files Should Be Equal    ${expectedFile}     ${file}_codes
    Remove Files             ${file}             ${file}_codes

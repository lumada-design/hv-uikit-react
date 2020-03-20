*** Setting ***
Library    Process
Library    OperatingSystem
Library    customLibrary.py    
Library    String    


*** Variables ***
@{pa11y_options}    node              %{pa11y_home}/pa11y.js
...                 --runner          htmlcs                             --runner    axe
...                 --standard        WCAG2AA
...                 --root-element    div[class|='Component-content']
# pa11y options based on https://github.com/pa11y/pa11y


*** Keywords ***
get story file name from url
    [Arguments]    ${url}       
    ${story}    Fetch From Right    ${url}    id=
    [Return]    ${OUTPUT_DIR}${/}${story}

get pa11y errors
    [Arguments]    ${url}
    [Documentation]    
    ...    run pa11y script against ${url} and return path of saved errors results 
    ...
    ${story}                       get story file name from url    ${url}
    ${pa11yResult}=                Run Process                     @{pa11y_options}
    ...                            --reporter                      json                ${url}
    ...                            stdout=${story}                 stderr=STDOUT       timeout=60s
    Should Be Equal As Integers    ${pa11yResult.rc}               2                   ${pa11yResult.stdout}
    [Return]                       ${pa11yResult.stdout_path}
    
pa11y should not find errors
    [Arguments]    ${url}
    [Documentation]
     ...   run pa11y script against ${url}
     ...   fails if pa11y return errors and in this case is saved a related error file on outputdir
     ...
    ${story}                       get story file name from url    ${url}
    ${pa11yResult}=                Run Process                     @{pa11y_options}    ${url}
    ...                            stdout=${story}                 stderr=STDOUT       timeout=60s
    Should Be Equal As Integers    ${pa11yResult.rc}               0                   please look errors file: \n ${pa11yResult.stdout_path} \n
    Remove File                    ${story}

pa11y result should be equal as file
    [Arguments]    ${url}    ${expectedFile}
    [Documentation]
     ...   run pa11y script against ${url} and compare results a given file. \n
     ...   fails if files don't are equal and in this case is saved a related error file on outputdir
     ...
    ${file}=                 get pa11y errors    ${url}
    Extract Codes            ${file}             ${file}_codes
    Files Should Be Equal    ${expectedFile}     ${file}_codes
    Remove Files             ${file}             ${file}_codes

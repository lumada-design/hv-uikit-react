*** Setting ***
Library    Process        

*** Variables ***
${timeout}    100s
${url}    http://localhost:9002/?path=/story/corebutton--positive
${pa11y}    C:\\Users\\jgoncalvesx\\AppData\\Roaming\\npm\\pa11y
${standard}    --standard WCAG2A
${ignore_1}    --ignore WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2    #Error: The html element should have a lang or xml:lang attribute which describes the language of the document.
${ignore_2}    --ignore WCAG2A.Principle3.Guideline3_2.3_2_2.H32.2    #Error: This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard   
${screen}    corebutton--positive.png
${reporter}    --reporter json

*** Test Cases ***
Check accessibility standards with Run Process
    [Tags]    pa11y
    ${result} =    Run Process    ${pa11y} ${standard} ${reporter} ${ignore_1} ${ignore_2} ${url}    shell=True    timeout=${timeout}
    Run Keyword If    ${result.rc} > 0    fail    ${result.stdout} ${result.stdout}    error 

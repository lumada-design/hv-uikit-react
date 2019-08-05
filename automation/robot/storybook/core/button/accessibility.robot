*** Setting ***
Library         Process
Variables       ../../_resources/storybook_variables.yaml
Default Tags    smoke

*** Variables ***
${timeout}         100s
${url}             ${STORYBOOK_URL}/${BUTTON_PAGE}
${standard}        --standard WCAG2A
${ignore_H57.2}    --ignore ${standard}.Principle3.Guideline3_1.3_1_1.H57.2    #Error: The html element should have a lang or xml:lang attribute which describes the language of the document.
${ignore_H32.2}    --ignore ${standard}.Principle3.Guideline3_2.3_2_2.H32.2    #Error: This form does not contain a submit button, which creates issues for those who cannot submit the form using the keyboard
${screen}          corebutton--positive.png
${reporter}        --reporter json

*** Test Cases ***
Check accessibility standards with Run Process
    [Tags]            pa11y
    ${result} =       Run Process         ${PA11Y} ${standard} ${reporter} ${ignore_H57.2} ${ignore_H32.2} ${url}    shell=True    timeout=${timeout}
    Run Keyword If    ${result.rc} > 0    fail    ${result.stdout} ${result.stdout}    error message: was found ${result.rc} accessibility errors on results variable.
    #to do!
    # check accebility after actions (ex. button pressed
    # check accebility with keyboards (ex: tab to move and space to press)

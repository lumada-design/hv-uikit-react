*** Setting ***
Resource          _header.resource
Test Setup        open header sample    ${structure}    main
Force Tags        bug-infrastructure-ie
Documentation     Test Cases based on Design System Version 1.2.0


*** Comments ***
dev implementation keep items always visible and enabled although human eye it is not visible.
Because of that the below test cases just can be validated on image recognition tests
- closes/hide subheader when mouse hover out of child item
- closes/hide subheader when a child item is selected and mouse hover item that has not child items


*** Test Cases ***
maintains subheader opened and seleleted when user click on actions buttons
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}
    Click Element                     ${action1}
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}

maintains subheader opened when mouse hover on parent item
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}
    Mouse Over                        ${item3.1}
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}

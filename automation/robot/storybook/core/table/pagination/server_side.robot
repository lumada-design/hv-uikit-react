*** Setting ***
Resource         _pagination.resource
Test Setup       open table sample    ${display}    server-side-pagination
Test Template    Run Keyword
Force Tags       bug-ie-webdriver
Documentation    in all Test Cases was assumed the buttons are enabled
...              https://github.com/lumada-design/hv-uikit-react/issues/1708


*** Test Cases ***
# current page increase when is clicked next page            click next page
# current page decrease when is clicked previous page        click previous page
# current page as highest value when is clicked last page    click last page
# current page as 1 when is clicked first page               click first page
# current page change when is inserted a page number         input a page number

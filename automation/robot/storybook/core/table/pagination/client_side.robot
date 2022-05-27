*** Setting ***
Resource          _pagination.resource
Test Setup        open table sample    ${components}    main
Test Template     Run Keyword
Documentation     in all Test Cases was assumed the buttons are enabled


*** Test Cases ***
current page increase when is clicked next page            click next page
current page decrease when is clicked previous page        click previous page
current page as highest value when is clicked last page    click last page
current page as 1 when is clicked first page               click first page
current page change when is inserted a page number         input a page number

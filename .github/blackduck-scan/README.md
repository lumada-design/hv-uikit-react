# Blackduck Scan GitHub Action

GitHub Action to scan a project, upload the results to the designated Blackduck server and check if it results in unreviewed components. If so, the action will be marked as failed.

## Inputs

## `server-url`
**Required** Blackduck instance URL. This is used both for the upload of the scan and invocation of the REST API to validate the existence of unreviewed components.

## `key`
**Required** Access token to the Blackduck instance to enable to connect and consume the rest API.

## `version`
**Required** Name of the version where the results should be published on Blackduck. 

## `packages`
**Required** Packages and respective paths to be processed with the following JSON structure:
```bash
[
  {
      "name": "<NAME_OF_BLACKDUCK_PROJECT>",
      "paths": [
          {
              "path": "<PATH_WITHIN_PWD_TO_SCAN_FOR_COMPONENTS>"
          }
      ],
      "exceptions": [
        {
            "component":"<COMPONENT_NAME_TO_DESCARD_ON_VALIDATION>"
        }
      ]
  }
]
```

## Example usage

```bash
uses: ./.github/blackduck-scan
with:
    server-url: '<BLACKDUCK_HOST>'
    key: '<BLACKDUCK_TOKEN>'
    version: 'master'
    packages: '[{"name": "<NAME_OF_BLACKDUCK_PROJECT>", "paths": [{"path": "<PATH_WITHIN_PWD_TO_SCAN_FOR_COMPONENTS>"}], "exceptions": [{"component":"@hitachivantara/uikit-react-core"}, {"component":"@hitachivantara/uikit-react-lab"}]}]'
```

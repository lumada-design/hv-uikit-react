# CodeDX Scan GitHub Action

GitHub Action to upload a dependency check file to a given branch in a given project in the designated CodeDX server and check if it results in any new, unresolved or reopened issues. If so, the action will be marked as failed.

# Build
Node 16 is required.

```bash
npm ci
npm run build
```

# Inputs

## `file`
**Required** The file containing the dependencies to load

## `serverUrl`
**Required** The URL of the CodeDx server

## `projectId`
**Required** The ID of the CodeDx project 

## `projectName`
**Required** The Name of the project

## `branchName`
**Required** The name of the CodeDX project branch

## `key`
**Required** The API Key to authenticate the CodeDx calls

## Example usage

```bash
uses: ./.github/codedx-analysis
with:
    file: dependency-check-report.xml
    serverUrl: '<CODEDX_SERVER_URL>'
    projectId: '<CODEDX_SERVER_PROJECT_ID>'
    projectName: 'Test Project'
    branchName: 'master'
    key: <CODEDX_TOKEN>
```

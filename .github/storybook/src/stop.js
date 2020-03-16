const core = require('@actions/core')
const exec = require('@actions/exec')

async function main() {
  const image = core.getState('storybook-image')
  const container = core.getState('storybook-container')

  await exec.exec('docker', ['stop', container])
  await exec.exec('docker', ['rmi', image])
}

main()
  .catch((error) => {
    core.setFailed(error.message)
  })
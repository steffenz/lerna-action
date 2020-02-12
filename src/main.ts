import {spawnSync} from 'child_process'
import * as core from '@actions/core'

interface Package {
  name: string
  version: string
  private: boolean
  location: string
}

const getChangedPackages = (): Package[] => {
  const changedPackages = spawnSync('./node_modules/lerna/cli.js', [
    'changed',
    '--json'
  ]).stdout.toString()
  return changedPackages.length > 0 ? JSON.parse(changedPackages) : []
}

async function run(): Promise<void> {
  const stuff = getChangedPackages()
  core.exportVariable('test', 'data')
  core.exportVariable('changes', JSON.stringify(stuff))
  core.debug(JSON.stringify(stuff))
}

run()

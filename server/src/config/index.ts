import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
import * as fs from 'fs'
import { error } from 'console'

const configFileName = {
    development: 'dev',
    test: 'test',
    production: 'prod',
    docker: 'docker'
}

const env = process.env.NODE_ENV || 'dev'

export default () => {
    return yaml.load(
        readFileSync(join(__dirname, `../config/${configFileName[env]}.yml`), 'utf8')
    ) as Record<string, any>
}

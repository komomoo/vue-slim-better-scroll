const shell = require('shelljs')
const { version } = require('../../package.json')

shell.exec(`git checkout master`)

// build
shell.exec(`yarn build`)
shell.exec(`yarn build:page`)
shell.exec(`yarn build:docs`)

// commit
shell.exec(`git add -A`)
shell.exec(`git commit -m "build: release ${version}"`)
shell.exec(`git tag v${version}`)

// gh-pages
shell.exec(`git checkout gh-pages`)
shell.exec(`git merge master`)
shell.exec(`git checkout master`)

// push
shell.exec(`git push --tag`)
shell.exec(`git push --all origin`)

// publish
shell.exec(`npm publish --registry=https://registry.npmjs.org`)

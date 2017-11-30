const path = require('path')
const markdownlint = require('markdownlint')

const config = require('../.markdownlint.json')

const resolve = (...pathPart) => path.resolve(__dirname, '..', ...pathPart)

const options = {
  files: [
    resolve('README.md'),
    resolve('LICENSE.md'),
  ],
  config,
}

markdownlint(options, (err, result) => {
  if (!err) {
    const text = result.toString()

    if (!text) return console.log('No markdown errors found')

    console.error(result.toString())
    process.exit(1)
  }

  console.error(err)
})

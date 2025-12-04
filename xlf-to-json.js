const fs = require('fs')
const xml2js = require('xml2js')

const xlfData = fs.readFileSync('locale/messages.xlf', 'utf8')

xml2js.parseString(xlfData, (err, result) => {
  if (err) throw err

  const units = result.xliff.file[0].body[0]['trans-unit']
  const jsonOutput = {}

  units.forEach(unit => {
    const sourceRaw = unit.source?.[0]
    const targetRaw = unit.target?.[0]

    const source =
      typeof sourceRaw === 'string'
        ? sourceRaw
        : (sourceRaw?._ || '')

    const target =
      typeof targetRaw === 'string'
        ? targetRaw
        : (targetRaw?._ || '')

    if (source) {
      jsonOutput[source.trim()] = source.trim()
    }
  })

  fs.writeFileSync('en.json', JSON.stringify(jsonOutput, null, 2), 'utf8')
  console.log('✔ en.json created successfully!')
})


// convertXlfToJson('/Users/pavithraprakash/eagle-fusion/locale/messages.hi.xlf', './hi.json')
// convertXlfToJson('./messages.hi.xlf', './hi.json')

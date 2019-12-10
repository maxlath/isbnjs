#!/usr/bin/env node
const xml2js = require('xml2js')
const fs = require('fs')
const { promisify } = require('util')
const parseString = promisify(xml2js.parseString)
const writeFile = promisify(fs.writeFile)
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const domain = 'https://www.isbn-international.org'
const url = `${domain}/?q=bl_proxy/GetRangeInformations`

const params = new URLSearchParams({
  format: 1,
  language: 'en',
  translatedTexts: 'Printed;Last Change'
})

const getFileUrl = async () => {
  const res = await fetch(url, { method: 'POST', body: params })
  const body = await res.json()
  const { filename, value } = body.result
  return `${domain}/?q=download_range/${value}/${filename}`
}

const getGroups = result => {
  const prefixesData = result.ISBNRangeMessage.RegistrationGroups[0].Group
  return prefixesData
    .reduce((index, prefixData) => {
      const groupKey = prefixData.Prefix[0]
      index[groupKey] = {
        name: prefixData.Agency[0],
        ranges: groupRanges(prefixData)
      }
      return index
    }, {})
}

const groupRanges = prefixData => {
  return prefixData
    .Rules[0]
    .Rule
    .filter(rule => rule.Length[0] !== '0')
    .map(rule => {
      const length = rule.Length[0]
      const range = rule.Range[0].toString().split('-')
      const start = range[0].substring(0, length)
      const end = range[1].substring(0, length)
      return [ start, end ]
    })
}

const formatJsFile = groups => {
  // Stringify object & format string
  const content = JSON.stringify(groups, null, 2)
    .replace(/'/g, '\\\'') // replace ' with \'
    .replace(/"/g, '\'') // replace " with '
    .replace(/'(name|ranges)'/g, '$1') // replace 'name' with name

  return 'module.exports = ' + content + '\n'
}

console.log('Requesting XML ranges file...')
getFileUrl()
.then(fileUrl => {
  console.log(`Downloading ${fileUrl}...`)
  return fetch(fileUrl)
})
.then(res => res.text())
.then(parseString)
.then(getGroups)
.then(formatJsFile)
.then(fileContent => writeFile('./lib/groups.js', fileContent))
.then(() => console.log('File saved: ./lib/groups.js'))
.catch(console.error)

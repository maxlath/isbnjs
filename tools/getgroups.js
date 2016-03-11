'use strict';

const request = require('request');
const parseString = require('xml2js').parseString;
const fs = require('fs');

// Request a range file
process.stdout.write('Requesting XML ranges file...\n');
request.post('https://www.isbn-international.org/?q=bl_proxy/GetRangeInformations',
  { form: { format: 1, language: 'en', translatedTexts: 'Printed;Last Change' } },
  function(error, response, body) {
    if (error) {
      throw error;
    }

    const json = JSON.parse(body);
    const value = json.result.value;
    const fileName = json.result.filename;
    const fileUrl = `https://www.isbn-international.org/?q=download_range/${value}/${fileName}`;

    // Download the rangefile
    process.stdout.write(`Downloading ${fileUrl}...\n`);
    request.get(fileUrl,
      function(error, response, body) {
        if (error) {
          throw error;
        }

        // Parse XML response
        parseString(body, function (error, result) {
          if (error) {
            throw error;
          }

          const prefixes = result.ISBNRangeMessage.RegistrationGroups[0].Group;
          const groups = {};

          for (let i = 0, c = prefixes.length; i < c; i++) {
            const prefix = prefixes[i];
            const groupKey = prefix.Prefix[0];
            const group = {
              name: prefix.Agency[0],
              ranges: prefix.Rules[0].Rule.filter(function(rule) {
                if (rule.Length[0] === '0') {
                  return false;
                }
                return true;
              }).map(function(rule) {
                const length = rule.Length[0];
                const range = rule.Range[0].toString().split('-');
                const start = range[0].substring(0, length);
                const end = range[1].substring(0, length);
                return [start, end];
              })
            };
            groups[groupKey] = group;
          }

          // Stringify object & format string
          const content = JSON.stringify(groups, null, 2)
            .replace(/'/g,'\\\'') // replace ' with \'
            .replace(/"/g,'\'') // replace " with '
            .replace(/'(name|ranges)'/g,'$1'); // replace 'name' with name

          // Write file
          fs.writeFile('groups.js', content, (err) => {
            if (err) {
              throw err;
            }
            process.stdout.write('File saved: groups.js\n');
          });
        });
      });
  });

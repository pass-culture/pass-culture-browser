const fs = require('fs')
const path = require('path')

const htmlDir = path.join(__dirname, '../public/index.html')
let html = fs.readFileSync(htmlDir).toString()
const svgs = fs.readFileSync(path.join(__dirname, '../src/svgs.svg')).toString()

const beginString = '<!-- SVG BEGIN -->'
const beginSplits = html.split(beginString)
const endString = '<!-- SVG END -->'
const endSplits = html.split(endString)
html = beginSplits[0] + beginString + '\n\t\t' + svgs + '\n\t\t' + endString + endSplits[1]

fs.writeFileSync(htmlDir, html)

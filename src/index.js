const request = require('request')
const rehype = require('rehype')
const remark = require('remark')
const toMDAST = require('hast-util-to-mdast')
// const all = require('hast-util-to-mdast/all')
// const one = require('hast-util-to-mdast/all')
const cheerio = require('cheerio')

const uri = 'https://medium.com/@calleja.justin/getting-started-with-js-csp-232548ef94ce'

request({
  method: 'GET',
  uri
}, (err, res, body) => {
  if (err) {
    return console.error(`Error getting ${uri}:`, err)
  }
  const $ = cheerio.load(body)
  // console.log(
  //   JSON.stringify(res, null, 2)
  // )
  // console.log('body:', body)

  const x = $('.section-inner.sectionLayout--insetColumn')
  // console.log(x.html())
  const hast = rehype().parse(x.html())
  const mdast = toMDAST(hast, {
    handlers: {
      iframe: (h, node) => {
        // console.log('in iframe handler:')
        // console.log(h)
        // console.log(node)
        // console.log('----------------------------')
        // return h(node, 'heading', { depth: 2 }, one(h, node))
        // return h(node, 'heading', { depth: 2 }, one(h, node))
        return h.augment(node, { type: 'text', value: 'woo hooo...' });
      }
    }
  })
  const doc = remark().stringify(mdast)
  console.log(doc)
})

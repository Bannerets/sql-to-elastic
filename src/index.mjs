import { knex } from './knex'
import { client } from './elastic'
import through2 from 'through2'

client.ping(err => {
  if (!err) return start()

  console.error('elasticsearch cluster is down')
  process.exit(1)
})

const getAllTables = async () =>
  (await knex('sqlite_master').where('type', 'table'))
    .map(e => e.name)

const index = (indexName, body) =>
  client.index({
    index: indexName,
    type: '_doc',
    body
  })

const extractTable = tableName => {
  const indexName = tableName.toLowerCase()
  const stream = knex.select('*').from(tableName).stream()

  stream
    .pipe(through2.obj((chunk, enc, cb) => {
      console.log('chunk', chunk)
      index(indexName, chunk)
        .then(() => cb(), console.error)
    }))
    .on('end', () => console.log(`${tableName} end`))
}

async function start () {
  const tables = await getAllTables()
  console.log('tables', tables)
  tables.forEach(extractTable)
}

import Knex from 'knex'
import dbConfig from '../knex.config'

export const knex = Knex(dbConfig)

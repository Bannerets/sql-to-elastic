import Elastic from 'elasticsearch'
import config from '../elastic.config'

const { Client } = Elastic

export const client = new Client(config)

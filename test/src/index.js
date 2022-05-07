require('dotenv').config()
import { start } from './server'

/**
 * argv
 * 	0 = program_name
 *  1 = file_name
 *  2 = database_type (default = cloud, cloud, | local)
 *  3 = port_number (default = 3000)
 */

const port = isNaN(process.argv[3]) ? 3000 : process.argv[3]
const database = process.argv[2]=='local' ? 'local' : 'cloud'

start(port, database)
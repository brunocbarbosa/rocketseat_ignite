// QUERY PARAMS: URL Stateful => Filtros, paginação, não-obrogatório => http://localhost:3333/users?userId=1&name=Diego
// ROUTE PARAMS: Identificação de recurso => http://localhost:3333/users/1
// REQUEST BODY: Envioo de informações de um formulário (HTTPs)



import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './util/build-route-path.js'

const databasae = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = databasae.select('users', search ? {
        name: search,
        email: search,
      }: null) 

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const {name, email} = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }
  
      databasae.insert('users', user)
  
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body
      
      databasae.update('users', id, {
        name, 
        email
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      databasae.delete('users', id)

      return res.writeHead(204).end()
    }
  },
]
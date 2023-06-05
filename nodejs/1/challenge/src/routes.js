import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './util/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
        //completed_at: search,
        //created_at: search,
       // updated_at: search,
      }: null) 

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {title, description} = req.body

      const date = new Date()

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: date,
        updated_at: date,
      }
  
      database.insert('tasks', task)
  
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const date = new Date()
      
      database.update('tasks', id, {
        title, 
        description,
        updated_at: date,
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const date = new Date()
      
      database.updateComplete('tasks', id, {
        completed_at: date,
        updated_at: date,
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
]
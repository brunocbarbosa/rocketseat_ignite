import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { checkTransactionMethodUrl } from '../middlewares/check-transaction-method-url'

// Cookies -> Formas da gente manter contexto entre requisições

export async function transactionRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkTransactionMethodUrl)

  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const { sessionId } = req.cookies

    const transaction = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return {
      transaction,
    }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(req.params)

    const { sessionId } = req.cookies

    const transaction = await knex('transactions')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return {
      transaction,
    }
  })

  app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req) => {
    const { sessionId } = req.cookies

    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return {
      summary,
    }
  })

  app.post('/', async (req, res) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionSchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 second * 1 minute * 1 hour * 1 day * 7 days => 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}

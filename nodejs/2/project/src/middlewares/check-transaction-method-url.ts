import { FastifyRequest } from 'fastify'

export async function checkTransactionMethodUrl(req: FastifyRequest) {
  console.log(`[${req.method} ${req.url}]`)
}

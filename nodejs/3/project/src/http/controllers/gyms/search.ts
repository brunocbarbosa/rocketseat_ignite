import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(req.query)

  const searchGymsUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  return rep.status(200).send({ gyms })
}

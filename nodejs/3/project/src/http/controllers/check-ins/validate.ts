import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(req: FastifyRequest, rep: FastifyReply) {
  const createCheckInBodySchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInBodySchema.parse(req.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return rep.status(204).send()
}

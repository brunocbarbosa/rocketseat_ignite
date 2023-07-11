import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(
    prismaCheckInRepository,
    prismaGymsRepository,
  )

  return useCase
}

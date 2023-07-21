import { GetUserMetrcisUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetrcisUseCase(prismaCheckInRepository)

  return useCase
}

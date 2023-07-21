import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInHistoryUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(prismaCheckInRepository)

  return useCase
}

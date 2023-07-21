import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCases } from '../fetch-nearby_gyms'

export function makeFetchNearbyGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCases(prismaGymsRepository)

  return useCase
}

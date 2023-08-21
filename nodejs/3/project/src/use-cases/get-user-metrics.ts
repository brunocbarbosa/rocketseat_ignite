import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetrcisUseCaseRequest {
  userId: string
}

interface GetUserMetrcisUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetrcisUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetrcisUseCaseRequest): Promise<GetUserMetrcisUseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

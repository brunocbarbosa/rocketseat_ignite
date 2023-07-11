import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import jwt from '@fastify/jwt'

export const app = fastify()

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error('error')
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return rep.status(500).send({ message: 'Internal server error.' })
})

import { TOKEN } from '~/constant'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { email, password } = body

  if (email !== 'astro123@example.com' || password !== 'password') {
    throw createError({
      statusCode: 422,
      data: {
        errors: { email: ['Incorrect credentials'] },
      },
    })
  }

  const token = TOKEN

  return { token }
})

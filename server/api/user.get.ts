import { TOKEN } from '~/constant'

export default defineEventHandler(async event => {
  const token = event.headers.get('Authorization')?.replace('Bearer ', '')

  if (token !== TOKEN) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return {
    user: {
      id: 7,
      name: 'John Doe',
      email: 'astro123@example.com',
    },
  }
})

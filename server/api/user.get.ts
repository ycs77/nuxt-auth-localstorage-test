import { TOKEN } from '~/constant'

export default defineEventHandler(async event => {
  const token = event.headers.get('Authorization')?.replace('Bearer ', '')

  if (token !== TOKEN) {
    setResponseStatus(event, 401, 'Unauthorized')
    return
  }

  return {
    user: {
      id: 7,
      name: 'John Doe',
      email: 'astro123@example.com',
    },
  }
})

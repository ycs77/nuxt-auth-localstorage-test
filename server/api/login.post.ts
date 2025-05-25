import { TOKEN } from '~/constant'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { email, password } = body

  if (email === 'astro123@example.com' && password === 'password') {
    const token = TOKEN

    return { token }
  } else {
    setResponseStatus(event, 422)
    return { errors: { email: ['Incorrect credentials'] } }
  }
})

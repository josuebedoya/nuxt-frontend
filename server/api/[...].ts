import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const {token} = JSON.parse(<string>getCookie(event, 'iuser-auth') ?? '{}')
  // Get the runtime config proxy url
  const proxyUrl = useRuntimeConfig().apiBase
  // check the path
  const target = joinURL(proxyUrl, event.path)
  // Set Authorization header if token exists
  if (token && token.accessToken) {
    event.node.req.headers.authorization = `Bearer ${token.accessToken}`
  }
  // proxy it!
  return proxyRequest(event, target)
})

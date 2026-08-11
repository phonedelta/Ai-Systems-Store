export function requireBlogSecret(req, res, next) {
  const secret = String(process.env.BLOG_API_SECRET || '').trim()
  if (!secret) {
    return res.status(500).json({
      success: false,
      error: 'BLOG_API_SECRET is not configured on the server',
    })
  }

  const header = req.headers.authorization || ''
  let token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  // PowerShell / some clients may wrap the token in quotes
  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    token = token.slice(1, -1).trim()
  }

  if (!token || token !== secret) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Use header: Authorization: Bearer YOUR_SECRET',
    })
  }

  return next()
}

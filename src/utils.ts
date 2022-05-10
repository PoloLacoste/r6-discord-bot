export function formatMessage (messages: Array<string>): string {
  let str = ''
  let maxDash = 1

  messages.forEach((s) => {
    if (s.length > maxDash) {
      maxDash = s.length
    }
  })

  const dash = Array(maxDash).join('-')

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    if (i + 1 === messages.length) {
      str += `${msg}`
    } else {
      str += `${msg}\n${dash}\n`
    }
  }

  return str
}

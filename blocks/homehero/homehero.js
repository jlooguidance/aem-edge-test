export default function decorate(block) {

  const rows = [...block.children]
  const first = rows?.length ? rows[0] : null

  if (!first) return

  const [ primary, secondary ] = [...first.children]

  primary.classList.add('primary')
  secondary.classList.add('secondary')
}

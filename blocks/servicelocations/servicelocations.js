const createDiv = () => {
  return document.createElement('div')
}

export const decorate = async (block) => {
  const rows = [...block.children]
  const first = rows?.length ? rows[0] : null

  if (!first) return

  const [ primary, secondary, third ] = [...first.children]

  first.classList.add('servicelocations-container')
  primary.classList.add('servicelocations--logo')
  secondary.classList.add('servicelocations--heading')
  third.classList.add('servicelocations--locations')

  const locations = await fetch('/locations.json')
  .then(r => r.json())

  secondary.innerHTML = secondary.innerHTML.replace('{{count}}', locations.total)

  const regionHeading = `${third.innerHTML}`
  const regions = {}

  third.innerHTML = ''

  locations.data.forEach(location => {
    const region = location.Region

    regions[region] = regions[region] || []
    regions[region].push(location)
  })

  Object.keys(regions).sort().forEach(region => {
    const $reg = createDiv()
    const $head = createDiv()

    $head.classList.add('locations--heading')
    $head.innerHTML = regionHeading.replace('{{region}}', region) || region

    $reg.append($head)

    const $locs = createDiv()
    $locs.classList.add('locations--container')

    regions[region].forEach(location => {
      const $loc = createDiv()

      $loc.classList.add('locations--location')
      $loc.onclick = () => {
        window.location.href = location.Link
      }

      const $name = createDiv()
      $name.classList.add('location--name')
      $name.innerHTML = location.Name

      const $add = createDiv()
      $add.classList.add('location--address')
      $add.innerHTML = location.Address

      $loc.append($name)
      $loc.append($add)

      $locs.append($loc)
    })

    $reg.append($locs)
    third.append($reg)
  })
}

export default decorate

const e = React.createElement

const parseHandleFromPath = () => {
  const parts = window.location.pathname.split('/')

  if (parts.length < 3) {
    return
  }

  return parts[2]
}

const makeBreadcrumbs = (location) => {
  const $liHome = e('li', { className: 'crumb crumb--home' }, [
    e('a', { href: '/' }, [
      'Home'
    ])
  ])
  const $liLocations = e('li', { className: 'crumb crumb--locations' }, 'Locations')
  const $liRegion = e('li', { className: 'crumb crumb--region' }, location.Region)
  const $liStore = e('li', { className: 'crumb crumb--home' }, location.Headline)

  return e('ul', { className: 'breadcrumb' }, [
    $liHome,
    $liLocations,
    $liRegion,
    $liStore,
  ])
}

const makeInformation = (location) => {
  const $divContact = e('div', {
    className: 'information--contact, single-shop-info',
    itemscope: 'itemscope',
    itemtype: 'https://schema.org/PostalAddress'
  }, [
    e('meta', {
      itemprop: 'streetAddress',
      content: location.Address,
    }),
    e('h2', {}, location.Headline),
    e('div', { className: 'single-loc-address' }, [
      e('div', {}, location.Address),
      e('div', {}, location.Hours),
      e('a', {
        className: 'single-loc-directions',
        target: '_blank',
        rel: 'nofollow noopener',
        href: `https://www.google.com/maps?q=${location.Address}`,
        title: 'GET DIRECTIONS',
      }, [
        'Get Directions'
      ]),
      e('iframe', {
        src: `https://maps.google.com/maps?hl=en&q=${encodeURI(location.Address)}+(${encodeURI(location.Name)})&output=embed`,
        width: '100%',
        height: 450,
        allowfullscreen: '',
        loading: 'lazy',
        referrerpolicy: 'no-referrer-when-downgrade',
        frameBorder: 0,
      }),
    ]),
  ])


// {/* <span>3811 Sol Danza Dr</span> ,<span>Castle Rock, CO 80109</span></a></div><div class="single-loc-directions"><a class="get-directions" target="_blank" rel="nofollow noopener" href="https://www.google.com/maps?q=3811 Sol Danza Dr,Castle Rock, CO 80109" title="GET DIRECTIONS">Get Directions</a><span class="separator">|</span><a href="https://www.servicestreetcolorado.com" target="_blank" title="Go to website" class="go-to-website" rel="noopener">Go to website</a></div><div class="single-loc-phone"><a href="tel:+17209528320" title="Call Service Street Auto Repair - Castle Rock" class="header-phone-link"><strong>(720) 952-8320</strong></a></div><div class="single-loc-worktime"><span>Mon - Sat: 7:00 AM - 7:00 PM</span></div><a href="/appointments" class="schedule-an-appointment" title="SCHEDULE AN APPOINTMENT ">SCHEDULE AN APPOINTMENT</a></div>   */} */}

  return  e('div', { className: 'information' }, [
    $divContact
  ])
}

export const decorate = async (block) => {
  const locationHandle = parseHandleFromPath()

  // TODO: I'm sure we can pass in a query parmeter to filter the results
  // but brute forcing it for now
  const locations = await fetch('/locations.json')
  .then(r => r.json())

  const location = locations?.data?.find(location => location.Handle === locationHandle)

  const root = ReactDOM.createRoot(block)

  root.render([
    makeBreadcrumbs(location),
    makeInformation(location),
  ])



  if (!location) {
    // TODO:  How do we return a different response code??
    //  * show a location not found message
    //  * redirect to the location listing page
    return
  }

  // const rows = [...block.children]
  // const first = rows?.length ? rows[0] : null

  // if (!first) return

  // const [ primary, secondary, third ] = [...first.children]

  // first.classList.add('servicelocations-container')
  // primary.classList.add('servicelocations--logo')
  // secondary.classList.add('servicelocations--heading')
  // third.classList.add('servicelocations--locations')


  // secondary.innerHTML = secondary.innerHTML.replace('{{count}}', locations.total)

  // const regionHeading = `${third.innerHTML}`
  // const regions = {}

  // third.innerHTML = ''

  // locations.data.forEach(location => {
  //   const region = location.Region

  //   regions[region] = regions[region] || []
  //   regions[region].push(location)
  // })

  // Object.keys(regions).sort().forEach(region => {
  //   const $reg = createDiv()
  //   const $head = createDiv()

  //   $head.classList.add('locations--heading')
  //   $head.innerHTML = regionHeading.replace('{{region}}', region) || region

  //   $reg.append($head)

  //   const $locs = createDiv()
  //   $locs.classList.add('locations--container')

  //   regions[region].forEach(location => {
  //     const $loc = createDiv()

  //     $loc.classList.add('locations--location')
  //     $loc.onclick = () => {
  //       window.location.href = location.Link
  //     }

  //     const $name = createDiv()
  //     $name.classList.add('location--name')
  //     $name.innerHTML = location.Name

  //     const $add = createDiv()
  //     $add.classList.add('location--address')
  //     $add.innerHTML = location.Address

  //     $loc.append($name)
  //     $loc.append($add)

  //     $locs.append($loc)
  //   })

  //   $reg.append($locs)
  //   third.append($reg)
  // })
}

export default decorate

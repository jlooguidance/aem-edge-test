const buildCouponCard = (coupon) => {
    const $coupon = document.createElement('div')

    $coupon.setAttribute('itemscope', 'itemscope')
    $coupon.setAttribute('itemtype', 'https://schema.org/Offer')
    $coupon.classList.add('coupon')

    const $title = document.createElement('div')

    $title.classList.add('title')
    $title.innerText = coupon.Title

    const $subtitle = document.createElement('div')

    $subtitle.classList.add('subtitle')
    $subtitle.innerText = coupon.Subtitle

    const $description = document.createElement('div')

    $description.setAttribute('itemprop', 'description')
    $description.classList.add('description')
    $description.innerText = coupon.Detail

    const $divider = document.createElement('img')

    $divider.classList.add('divider')
    $divider.setAttribute('src', '/icons/clip-coupon.svg')

    $coupon.append($title)
    $coupon.append($subtitle)
    $coupon.append($divider)
    $coupon.append($description)

    return $coupon
}

export const decorate = async (block) => {
    const rows = [...block.children]
    const first = rows?.length ? rows[0] : null

    if (!first) return

    const [ primary ] = [...first.children]

    primary.classList.add('callout')

    const $couponsContainer = document.createElement('div')

    $couponsContainer.classList.add('coupons')

    const coupons = await fetch('/coupons.json')
    .then(r => r.json())

    coupons.data.forEach(coupon => {
        if (coupon.Featured !== 'true') {
            return
        }

        const $card = buildCouponCard(coupon)

        $couponsContainer.append($card)
    })

    first.append($couponsContainer)

  }

  export default decorate

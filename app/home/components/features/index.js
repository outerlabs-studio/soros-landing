import { Card } from 'components'
import { Container, DisplayTextClass, Grid } from 'styles'

const CARDS = [
  {
    title: 'No Credit Cards',
    description:
      'Pay with your favorite cryptocurrencies like SOL, USDT, BTC, ETH, and USDC. We’ll handle all the conversions.',
    img: {
      src: '/cards/cryptos.webp',
      alt: 'Crypto select dropdown',
    },
  },
  {
    title: 'Verified Sellers',
    description:
      'Every store on our marketplace is thoroughly vetted and verified, so you can buy with peace of mind.',
    img: {
      src: '/cards/seller.webp',
      alt: 'Crypto sellers',
    },
  },
  {
    title: 'Customize Items',
    description:
      'Create specific product requests and get automatically matched with sellers that can deliver your order.',
    img: {
      src: '/cards/custom.webp',
      alt: 'Customized Items',
    },
  },
  {
    title: '24/7 Support',
    description:
      'Got questions? Our team’s always here. Talk to customer support when you need, or browse the community help docs.',
    img: {
      src: '/cards/support.webp',
      alt: 'SOROS help page',
    },
  },
  {
    title: 'Live Updates',
    description:
      "Get real-time updates on your orders, price changes, and exclusive drops. You're always one step ahead.",
    img: {
      src: '/cards/updates.webp',
      alt: 'SOROS help page',
    },
  },
  {
    title: 'Shop Anything',
    description:
      'Can’t find a specific product? SOROS AI shops on your favorite websites and checkouts for you using crypto.',
    img: {
      src: '/cards/categories.webp',
      alt: 'SOROS categories',
    },
  },
]

export default function Features() {
  return (
    <section className="relative pt-10 md:pt-[6vw]" id="features-section">
      <Container>
        <Grid className="gap-y-5">
          <h2
            className={DisplayTextClass(
              'anim-text-1 col-start-1 col-end-13 py-[6vw]',
            )}
          >
            You Dream It. SOROS Got It.
          </h2>

          {CARDS.map((_, index) => (
            <Card
              className={'col-span-12 md:col-span-6'}
              title={_.title}
              description={_.description}
              img={_.img}
              key={index}
            />
          ))}
        </Grid>
      </Container>
    </section>
  )
}

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
      sizes:
        '(min-width: 1280px) 544px, (min-width: 1040px) calc(25.45vw + 223px), (min-width: 780px) calc(8.33vw + 393px), calc(100vw - 42px)',
    },
  },
  {
    title: 'Verified Sellers',
    description:
      'Every store on our marketplace is carefully vetted and verified, so you can buy with peace of mind.',
    img: {
      src: '/cards/seller.webp',
      alt: 'Crypto sellers',
      sizes:
        '(min-width: 780px) 608px, (min-width: 380px) calc(100vw - 42px), calc(25vw + 228px)',
    },
  },
  {
    title: 'Customize Items',
    description:
      'Create specific product requests and get automatically matched with sellers that can deliver your order.',
    img: {
      src: '/cards/custom.webp',
      alt: 'Customized Items',
      sizes:
        '(min-width: 780px) 580px, (min-width: 380px) calc(100vw - 42px), calc(48.33vw + 144px)',
    },
  },
  {
    title: '24/7 Support',
    description:
      'Got questions? Our team’s always here. Talk to customer support when you need, or browse the community help docs.',
    img: {
      src: '/cards/support.webp',
      alt: 'SOROS help page',
      sizes:
        '(min-width: 640px) 770px, (min-width: 460px) calc(100vw - 42px), calc(10vw + 354px)',
    },
  },
  {
    title: 'Live Updates',
    description:
      "Get real-time updates on your orders, price changes, and exclusive drops. You're always one step ahead.",
    img: {
      src: '/cards/updates.webp',
      alt: 'SOROS help page',
      sizes:
        '(min-width: 780px) 576px, (min-width: 400px) calc(100vw - 42px), calc(63.75vw + 96px)',
    },
  },
  {
    title: 'Shop Favorites',
    description:
      'SOROS AI helps you discover products across categories and completes checkout seamlessly with crypto.',
    img: {
      src: '/cards/categories.webp',
      alt: 'SOROS categories',
      sizes:
        '(min-width: 780px) 568px, (min-width: 400px) calc(100vw - 42px), calc(67.5vw + 82px)',
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

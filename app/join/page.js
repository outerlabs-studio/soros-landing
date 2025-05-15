import Form from './components/form'
import Side from './components/side'

export default async function Join({ searchParams }) {
  const data = await searchParams
  const referral =
    data?.referral && data?.referral.length > 0 ? data?.referral : null

  return (
    <section className="relative flex w-full min-h-dvh">
      <Side />

      <Form referral={referral} />
    </section>
  )
}

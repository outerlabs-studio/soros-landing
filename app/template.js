import { Nav } from 'components'
import { ResetGSAP } from 'lib'

export default async function Template({ children }) {
  return (
    <>
      <main id="main">
        <Nav />

        {children}
      </main>

      <ResetGSAP />
    </>
  )
}

import { Container, Grid } from 'styles'
import Check from './components/check'
import Rankings from './components/rankings'

export default function Points() {
  return (
    <section className="relative py-24">
      <Container>
        <Grid className="md:items-center md:justify-center md:min-h-dvh gap-y-16">
          <Check />
          <Rankings />
        </Grid>
      </Container>
    </section>
  )
}

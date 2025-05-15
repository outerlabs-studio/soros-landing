import { Container, Grid } from 'styles'
import Check from './components/check'
import Rankings from './components/rankings'

export default function Points() {
  return (
    <section className="relative flex items-center py-24 md:min-h-dvh">
      <Container>
        <Grid className="md:items-center md:justify-center gap-y-16">
          <Check />
          <Rankings />
        </Grid>
      </Container>
    </section>
  )
}

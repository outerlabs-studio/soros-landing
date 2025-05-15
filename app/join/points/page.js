import { Container, Grid } from 'styles'
import Check from './components/check'
import Rankings from './components/rankings'

export default function Points() {
  return (
    <section className="relative">
      <Container>
        <Grid className="items-center justify-center min-h-dvh">
          <Check />
          <Rankings />
        </Grid>
      </Container>
    </section>
  )
}

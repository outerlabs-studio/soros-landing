import { BigTextClass, DisplayTextClass, Grid } from 'styles'

export default function CustomHeading({ title, description }) {
  return (
    <Grid className="text-header">
      <h2
        className={DisplayTextClass('anim-text-1 col-start-1 col-end-13 mb-12')}
      >
        {title}
      </h2>
      <p className={BigTextClass('anim-text-2 col-start-1 col-end-9 mb-28')}>
        {description}
      </p>
    </Grid>
  )
}

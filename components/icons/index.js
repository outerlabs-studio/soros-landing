import { forwardRef } from 'react'
import IconSOROSIcon from './soros-icon'
import IconSOROSLogo from './soros-logo'
import IconSecurity from './security'

const Icons = forwardRef((props, ref) => {
  switch (props.name) {
    case 'soros-icon':
      return <IconSOROSIcon ref={ref} {...props} />
    case 'soros-logo':
      return <IconSOROSLogo ref={ref} {...props} />
    case 'security':
      return <IconSecurity ref={ref} {...props} />
    default:
      return null
  }
})

export default Icons

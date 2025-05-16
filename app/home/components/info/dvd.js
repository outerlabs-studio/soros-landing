'use client'

import { useRef, useCallback } from 'react'
import { useDrag } from '@use-gesture/react'
import Elastica, {
  AxisAlignedBoundaryBox,
  initalConditionsPresets,
  useElastica,
} from '@darkroom.engineering/elastica/react'
import { BigTextClass } from 'styles'

const params = {
  gridSize: 8,
  collisions: true,
  borders: 'periodic',
  velocity: {
    x: -0.1,
    y: -0.1,
  },
  dumpingFactor: 0.001,
}

const labels = [
  'Sports & Outdoors',
  'Automotive',
  'Books',
  'Music & Movies',
  'Office Supplies',
  'Pet Supplies',
  'Baby & Kids',
  'Jewelry & Watches',
  'Shoes',
  'Arts & Crafts',
  'Tools',
  'Video Games',
  'Supplies',
]

const DVDScreen = () => {
  const isHovered = useRef(labels.map(() => false))

  return (
    <div className="relative elastica bg-black w-full h-90 md:h-full overflow-hidden">
      <div className="z-10 pointer-events-none absolute top-0 left-0 w-full h-full bg-radial from-black/10 to-black" />
      <Elastica
        config={{
          gridSize: 8,
          collisions: true,
          borders: 'periodic',
          dumpingFactor: 0.001,
        }}
        initialCondition={initalConditionsPresets.random}
        update={({
          boxes,
          positions,
          velocities,
          externalForces,
          deltaTime,
        }) => {
          boxes.forEach((_, index) => {
            let velocity = velocities[index]
            let position = positions[index]
            let draggin = externalForces[index]
            const stVel = [params.velocity.x, -params.velocity.y]

            if (isHovered.current[index]) {
              velocities[index] = velocity.map(
                (v, i) =>
                  v - deltaTime * params.dumpingFactor * (v - 4 * draggin[i]),
              )
            } else {
              velocities[index] = velocity.map(
                (v, i) =>
                  v -
                  deltaTime *
                    params.dumpingFactor *
                    (v - 4 * draggin[i] + stVel[i]),
              )
            }

            positions[index] = position = position.map(
              (pos, i) => pos + velocity[i] * deltaTime,
            )

            externalForces[index] = [0, 0]
          })
        }}
      >
        {labels.map((_, index) => (
          <Item key={index} data={_} index={index} isHovered={isHovered} />
        ))}
      </Elastica>
    </div>
  )
}

function Item({ data, index, isHovered }) {
  const { elastica } = useElastica()

  const onDragStop = useCallback(
    (newDir) => {
      const { externalForces } = elastica

      let norm = newDir.map((pos) => pos * pos).reduce((a, b) => a + b)
      norm = Math.sqrt(norm)

      if (norm === 0) return

      externalForces[index] = newDir.map((pos) => pos / norm)
    },
    [elastica],
  )

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      onDragStop([mx, my])
    }
  })

  return (
    <AxisAlignedBoundaryBox key={index} className="wrapper" {...bind()}>
      <div
        onMouseEnter={({ target }) => {
          isHovered.current[index] = true
          target.classList.toggle('grabbed', true)
        }}
        onMouseLeave={({ target }) => {
          isHovered.current[index] = false
          target.classList.toggle('grabbed', false)
        }}
      >
        <p className={BigTextClass('text-white')}>{data}</p>
      </div>
    </AxisAlignedBoundaryBox>
  )
}

export default DVDScreen

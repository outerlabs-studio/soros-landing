'use client'

import { useRef, useCallback } from 'react'
import { useDrag } from '@use-gesture/react'
import Elastica, {
  AxisAlignedBoundaryBox,
  initalConditionsPresets,
  useElastica,
} from '@darkroom.engineering/elastica/react'

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
  {
    src: '/icons/algo.svg',
    name: 'Algo',
  },
  {
    src: '/icons/bitcoin.svg',
    name: 'Bitcoin',
  },
  {
    src: '/icons/bnb.svg',
    name: 'BNB',
  },
  {
    src: '/icons/comp.svg',
    name: 'COMP',
  },
  {
    src: '/icons/doge.svg',
    name: 'Doge',
  },
  {
    src: '/icons/ethereum.svg',
    name: 'Ethereum',
  },
  {
    src: '/icons/litecoin.svg',
    name: 'Litecoin',
  },
  {
    src: '/icons/matic.svg',
    name: 'Matic',
  },
  {
    src: '/icons/monero.svg',
    name: 'Monero',
  },
  {
    src: '/icons/solana.svg',
    name: 'Solana',
  },
  {
    src: '/icons/tether.svg',
    name: 'Tether',
  },
  {
    src: '/icons/uni.svg',
    name: 'Uni',
  },
  {
    src: '/icons/usdc.svg',
    name: 'USDC',
  },
  {
    src: '/icons/xlm.svg',
    name: 'XLM',
  },
  {
    src: '/icons/xrp.svg',
    name: 'XRP',
  },
]

const DVDScreen = () => {
  const isHovered = useRef(labels.map(() => false))

  return (
    <div className="elastica bg-black w-full h-full overflow-hidden">
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
        <img
          className="size-10 pointer-events-none"
          src={data.src}
          alt={data.name}
        />
      </div>
    </AxisAlignedBoundaryBox>
  )
}

export default DVDScreen

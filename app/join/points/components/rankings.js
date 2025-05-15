'use client'

import { useEffect, useState } from 'react'
import { HugeTextClass, SmallPTextClass } from 'styles'

export default function Rankings() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}?leaderboard=true&page=1`,
        )
        const json = await res.json()

        if (res.ok) {
          setData(json.data)
        } else {
          console.error('Fetch error', json)
        }
      } catch (err) {
        console.error('Network error', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="col-start-1 md:col-start-8 col-end-13">
      <h3 className={HugeTextClass('mb-8')}>Rankings</h3>

      <div
        data-lenis-prevent
        className="border border-dark-gray rounded-xl px-6 py-6 max-h-[400px] overflow-y-auto"
      >
        {isLoading ? (
          <p className="text-center text-base text-gray-text">Loading…</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-gray">
                <th className={SmallPTextClass('pb-4 text-gray-text')}>
                  Username
                </th>
                <th
                  className={SmallPTextClass('pb-4 text-gray-text text-right')}
                >
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-dark-gray last:border-b-0"
                >
                  <td className={SmallPTextClass('py-4')}>{row.username}</td>
                  <td className={SmallPTextClass('py-4 text-right')}>
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

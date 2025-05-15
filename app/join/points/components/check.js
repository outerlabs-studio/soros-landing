'use client'

import { useState } from 'react'
import { CustomButton, Input } from 'components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ReferralLink from '../../components/referral'
import { HugeTextClass } from 'styles'

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
})

export default function Check() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const fetchData = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}?username=${values.username}`,
          {
            method: 'GET',
          },
        )

        const data = await fetchData.json()

        if (data.points) {
          setSuccess(data)
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('A network error occurred. Please try again later.')
      }
    },
  })

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    dirty,
    isValid,
    isSubmitting,
  } = formik

  return (
    <div className="col-start-1 col-end-6 flex flex-col">
      <h3 className={HugeTextClass('mb-4')}>Check Points</h3>
      {!success && (
        <p className="text-base leading-tight font-medium">
          Enter your username to check how many points you have
        </p>
      )}

      {success ? (
        <div>
          <p className="text-base text-white mb-8">
            You have{' '}
            <span className="text-light-purple">{success?.points} points</span>!
          </p>

          <ReferralLink code={success?.username} />
        </div>
      ) : (
        <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            label="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />

          {error && <p className="text-base text-red-400">{error}</p>}

          <CustomButton
            staticAnim
            className={'w-full'}
            disabled={isSubmitting || !dirty || !isValid}
            type="submit"
          >
            Check Points
          </CustomButton>
        </form>
      )}
    </div>
  )
}

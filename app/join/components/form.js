'use client'

import { useEffect, useState } from 'react'
import { CustomButton, Input } from 'components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import ReferralLink from './referral'

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[\w.-]+@[\w.-]+\.\w{2,4}$/, 'Invalid email address'),
  code: Yup.string(),
})

function SuccessMessage({ data }) {
  return (
    <>
      <div className="flex flex-col gap-2 my-8">
        <CustomButton href={'/join/points'} staticAnim className={'w-full'}>
          Check Your Points
        </CustomButton>
        <CustomButton href={'/join/points'} staticAnim className={'w-full'}>
          View Global Rankings
        </CustomButton>
      </div>

      <ReferralLink code={data?.referralCode} />
    </>
  )
}

export default function Form({ referral, email }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.getElementById('form-wrapper').style.marginTop =
      document.getElementById('nav')?.offsetHeight + 'px'
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: email || '',
      code: referral || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const fetchData = await fetch(process.env.NEXT_PUBLIC_API_URL, {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            username: values.username,
            referrerCode: values.code,
          }),
        })

        const data = await fetchData.json()

        if (data.success) {
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
    <div id="form-wrapper" className="ml-[40vw] px-10 w-full">
      <div className="flex flex-col w-full min-h-full justify-center max-w-150 py-4 mx-auto">
        <h3 className="text-5xl leading-13 font-bold mb-4">
          {success ? (
            `Welcome to SOROS`
          ) : (
            <>
              Join Beta.
              <br />
              Refer Friends.
              <br />
              Earn Crypto.
            </>
          )}
        </h3>
        <p className="text-base leading-tight font-medium">
          {success
            ? `Welcome to SOROS! You can check your points and view global rankings by clicking the links below. Every referral is 100 points.`
            : `Join the beta wailist today and earn 100 points. Refer friends to collect even more points. Redeem your points for exclusive rewards once SOROS launches.`}
        </p>

        {success ? (
          <SuccessMessage data={success} />
        ) : (
          <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
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
            <Input
              id="code"
              name="code"
              type="text"
              placeholder="Code"
              label="Referral Code"
              disabled={referral}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code}
            />

            {error && <p className="text-base text-red-400">{error}</p>}

            <CustomButton
              staticAnim
              className={'w-full mt-4'}
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
            >
              Join Waitlist
            </CustomButton>

            <Link
              href={'/join/points'}
              className="text-xs text-gray-text underline mt-2 hover:no-underline w-fit"
            >
              Check your points or view global rankings
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}

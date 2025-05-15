'use client'

import { useState } from 'react'

export default function ReferralLink({ code }) {
  const [copyText, setCopyText] = useState('Copy')
  const referralLink = `https://shopsoros.com/join?referral=${code}`

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopyText('Copied!')
        setTimeout(() => {
          setCopyText('Copy')
        }, 10000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
        setCopyText('Failed')
        setTimeout(() => {
          setCopyText('Copy')
        }, 2000)
      })
  }

  return (
    <>
      <div className="flex flex-col">
        <p className="text-base text-gray-text mb-1">Your Referral Link:</p>
        <div
          className="no-underline rounded-xl border-1 border-light-gray border-solid text-base text-white py-3 px-5 w-full font-medium flex justify-between items-center cursor-pointer"
          onClick={handleCopyLink}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCopyLink()
          }}
        >
          <span>{referralLink}</span>
          <p
            className={`text-xs ${copyText === 'Copied!' ? 'text-green-500' : 'text-gray-text'}`}
          >
            {copyText}
          </p>
        </div>
      </div>
    </>
  )
}

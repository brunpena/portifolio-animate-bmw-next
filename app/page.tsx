'use client'

import { useState } from 'react'
import LoadingScreen from './components/loadingScreen'
import ScrollScene from './components/ScrollScene'
import ExampleSection from './components/sectionExample'

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  return (
    <>
      {showLoading && (
        <LoadingScreen
          isDone={loaded}
          onFinish={() => setShowLoading(false)}
        />
      )}

      <ScrollScene onLoaded={() => setLoaded(true)} />
      <ExampleSection />
    </>
  )
}

'use client'

import { useState } from 'react'
import LoadingScreen from './components/loadingScreen'
import ScrollScene from './components/ScrollScene'
import { Header } from './components/header'

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  return (
    <>
    <Header />
      {showLoading && (
        <LoadingScreen
          isDone={loaded}
          onFinish={() => setShowLoading(false)}
        />
      )}

      <ScrollScene onLoaded={() => setLoaded(true)} />
    </>
  )
}

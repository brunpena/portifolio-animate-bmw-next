'use client'

import { Plus, Percent, SquarePen } from 'lucide-react'

export function Topics() {
  const boxStyle =
    'relative flex flex-col items-center justify-center gap-6 ' +
    'w-[calc(80%/3)] min-h-[360px] ' +
    'bg-white/90 backdrop-blur-sm rounded-3xl p-6 ' +
    'shadow-lg border border-gray-700/20'

  const topicImageStyle =
    'absolute -top-10 w-24 h-24 rounded-full ' +
    'bg-white p-6 text-gray-800/80 shadow-xl'

  const buttonStyle =
    'mt-auto px-6 py-3 w-[70%] flex justify-center items-center ' +
    'bg-blue-600 text-white rounded-full hover:bg-blue-700 transition'

  const topics = [
    {
      title: 'Discover your 0 KM.',
      href: '/new',
      textButton: 'Explore',
      image: <Plus className={topicImageStyle} />,
    },
    {
      title: 'Discover your used.',
      href: '/used',
      textButton: 'Explore',
      image: <Percent className={topicImageStyle} />,
    },
    {
      title: 'Customize your BMW.',
      href: '/customize',
      textButton: 'Explore',
      image: <SquarePen className={topicImageStyle} />,
    },
  ]

  return (
    <section
      id="topics"
      className="
        fixed inset-0 z-20
        flex items-center justify-center
        pointer-events-none
      "
    >
      <div className="flex gap-8 w-full max-w-7xl justify-center px-6">
        {topics.map((topic, index) => (
          <div key={index} className={boxStyle}>
            {topic.image}

            <h3 className="text-2xl font-light text-gray-800 text-center mt-10">
              {topic.title}
            </h3>

            <a href={topic.href} className={buttonStyle}>
              {topic.textButton}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

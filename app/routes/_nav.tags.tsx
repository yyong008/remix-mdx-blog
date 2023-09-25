// types
import type { LoaderFunction, MetaFunction } from '@remix-run/node'

// core
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

// components
import TagBadge from '~/components/TagBadge'

// utils
import { getTagsAndCount } from '~/utils/posts.server'

// config

import { config } from '~/config/website'

export const loader: LoaderFunction = async () => {
  const _tags = await getTagsAndCount()
  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1])
  return json({ tags })
}

export const meta: MetaFunction = ({ params }) => {
  const { tag } = params
  const title = `Tags - ${config.author}`
  const summary = `Posts about ${tag} of ${config.author}.`
  return [
    { title },
    {
      property: 'description',
      content: summary
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: summary
    }
  ]
}

export default function TagRoutes() {
  const { tags } = useLoaderData() as any
  return (
    <div className='tags-contaier'>
      <h1>标签</h1>
      <div>
        {tags?.map((tag: [string, number]) => {
          return (
            <TagBadge
              to={`/tags/${tag[0]}`}
              key={tag[0]}
              label={`${tag[0]} (${tag[1]})`}
            />
          )
        })}
      </div>
    </div>
  )
}

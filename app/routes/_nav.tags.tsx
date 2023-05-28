import { type V2_MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import TagBadge from '~/components/TagBadge'
import { config } from '~/config/website'
import { getTagsAndCount } from '~/utils/posts.server'

export const loader = async () => {
  const _tags = await getTagsAndCount()
  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1])
  return json({ tags })
}

export const meta: V2_MetaFunction = ({ params }) => {
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
  const { tags } = useLoaderData()
  return (
    <div className='tags-contaier'>
      <h1>标签</h1>
      <div>
        {tags.map((tag: [string, number]) => {
          return (
            <TagBadge
              to={`/tags/${tag[0]}`}
              key={tag[0]}
              label={`${tag[0]} (${tag[1]})`}
            ></TagBadge>
          )
        })}
      </div>
    </div>
  )
}

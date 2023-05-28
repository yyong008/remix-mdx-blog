import { V2_MetaFunction, json } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import PostList from '~/components/PostList'
import TagSearch from '~/components/TagSearch'
import { config } from '~/config/website'
// import PostCard from "~/components/postCard";

import {
  filterPostsByTitle,
  getPagingData,
  getPostsSortedByDate
} from '~/utils/posts.server'
import type { Mod } from '~/utils/types'

interface Params {
  tag: string
}

export const meta: V2_MetaFunction = ({ params }) => {
  const { tag } = params
  const title = `${tag} - ${config.author}`
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

export const loader = async ({
  params,
  request
}: {
  params: Params
  request: Request
}) => {
  const { tag } = params
  const url = new URL(request.url)
  const query = url.searchParams.get('q')

  const posts: Mod[] = query
    ? await filterPostsByTitle(query)
    : await getPostsSortedByDate()

  const filteredPosts = posts.filter((post) => post.tags.includes(tag))
  const data = getPagingData(request, filteredPosts)
  return json({ ...data, query })
}

export default function TagList() {
  const { tag } = useParams()
  const { posts, query, ...pageData } = useLoaderData()

  if (!tag) {
    return null
  }
  return (
    <div>
      <TagSearch tag={tag} title={query} />
      <PostList posts={posts} pageData={pageData} />
    </div>
  )
}

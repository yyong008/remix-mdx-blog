import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BlogSearch from '~/components/BlogSearch'
import PostList from '~/components/PostList'
import {
  filterPostsByTitle,
  getPostsSortedByDate,
  getPagingData
} from '~/utils/posts.server'

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')

  const posts = query
    ? await filterPostsByTitle(query)
    : await getPostsSortedByDate()
  const data = getPagingData(request, posts)

  return json({ ...data, query })
}

export default function BlogsRoute() {
  const { posts, query, ...pageData } = useLoaderData()

  return (
    <div>
      <BlogSearch title={query} />
      <div>
        <PostList posts={posts} pageData={pageData} />
      </div>
    </div>
  )
}

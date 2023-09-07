import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import HomeHeader from '~/components/HomeHeader'
import PostCard from '~/components/postCard'
import { getPostsSortedByDate } from '~/utils/posts.server'

export const loader = async () => {
  const posts = (await getPostsSortedByDate()).slice(0, 4)
  return json({
    posts: posts
  })
}

export default function Index() {
  const { posts } = useLoaderData()

  return (
    <div>
      <HomeHeader />
      <div>
        {posts.map((post: any) => {
          return <PostCard post={post} key={post.route} />
        })}
      </div>
    </div>
  )
}

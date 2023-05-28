import { type LinksFunction, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getPostsModules } from '~/utils/posts.server'
import PostHeader from '~/components/postHeader'

// styles
import darkStyles from '~/styles/hljs.css'
import markdownStyles from '~/styles/markdown.css'
import ScrollToTop from '~/components/BackTop'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: darkStyles
    },
    {
      rel: 'stylesheet',
      href: markdownStyles
    }
  ]
}

export const loader = async ({ request }) => {
  const pathname = new URL(request.url).pathname
  const post = (await getPostsModules()).find((post) => {
    return post.route === `${pathname}`
  })
  return json(post)
}

export default function PostsPage() {
  const data = useLoaderData()
  return (
    <div className=''>
      <PostHeader post={data} />
      <div className='prose markdown-body'>
        <Outlet />
      </div>
      <ScrollToTop />
    </div>
  )
}

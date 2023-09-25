import type { LinksFunction, LoaderFunction } from '@remix-run/node'

import PostHeader from '~/components/postHeader'

import { useMemo } from 'react'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'

// components
import ScrollToTop from '~/components/BackTop'

// three
import { getMDXComponent } from 'mdx-bundler/client/index.js'

// utils
import { getPostsModules } from '~/utils/posts.server'

// styles
import darkStyles from '~/styles/hljs.css'
import markdownStyles from '~/styles/markdown.css'

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

export const loader: LoaderFunction = async ({ request }) => {
  const pathname = new URL(request.url).pathname
  const post = (await getPostsModules()).find((post) => {
    return post.route.startsWith('/')
      ? post.route
      : `/${post.route}` === `${pathname}`
  })
  return json(post)
}

export default function PostsPage() {
  const data: any = useLoaderData()
  const code = data.code
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <div className=''>
      <PostHeader post={data} />
      <div className='prose markdown-body'>
        <Component />
      </div>
      <ScrollToTop />
    </div>
  )
}

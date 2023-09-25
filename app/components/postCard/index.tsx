import { Link } from '@remix-run/react'

export default function PostCard({ post }: any) {
  return (
    <div className='post-card'>
      <div className='publish-time'>发布时间：{post.date}</div>
      <h1>{post.title}</h1>
      <div className='summary'>{post.summary}</div>
      <Link
        to={post.route.startsWith('/') ? post.route : `/${post.route}`}
        className='read-more'
      >
        查看更多
      </Link>
    </div>
  )
}

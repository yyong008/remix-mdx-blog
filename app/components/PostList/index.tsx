import { Link } from '@remix-run/react'
import PostCard from '../postCard'
import type { Mod } from '~/utils/types'

type TPageData = {
  prev: number
  next: number
  total: number
  current: number
}

export default function PostList({
  posts,
  pageData
}: {
  posts: Mod[]
  pageData: TPageData
}) {
  return (
    <div>
      {posts.map((post: any) => {
        return <PostCard post={post} key={post.route} />
      })}
      <div className='pagenation pagenation-blog'>
        {posts.length <= 0 ? (
          <div className='pagenation-content'>No Results</div>
        ) : (
          <div className='pagenation-content'>
            {pageData.prev ? (
              <div className='pagenation-prev'>
                <Link to={'/blogs?page=' + pageData.prev}>前一页</Link>
              </div>
            ) : (
              <></>
            )}
            <div className='pagenation-current'>
              {pageData.current}/{pageData.total}
            </div>
            {pageData.next ? (
              <div className='pagenation-next'>
                <Link to={'/blogs?page=' + pageData.next}>后一页</Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

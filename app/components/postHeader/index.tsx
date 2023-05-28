import TagBadge from '../TagBadge'
import { config } from '~/config/website'

export default function PostHeader({ post }: any) {
  return (
    <div className='post-header'>
      <h1>{post.title}</h1>
      <div className='post-info'>
        <img src={post.image} alt='' />
        <span className='post-info-author'> • {config.author} • </span>
        <span>{post.date}</span>
      </div>
      <div>
        {post.tags.map((p: any) => {
          return <TagBadge tag={p} key={p} to={`/tags/${p}`} />
        })}
      </div>
    </div>
  )
}

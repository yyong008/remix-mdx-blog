import { Link } from '@remix-run/react'

type ITagBadge = {
  to: string
  tag: string
  label: string
}

export default function TagBadge({ to, tag, label }: ITagBadge) {
  return (
    <Link className='tag-badge' to={to}>
      #{label ?? tag}
    </Link>
  )
}

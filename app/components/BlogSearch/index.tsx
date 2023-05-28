import { useLocation, useSubmit, Form } from '@remix-run/react'
import { type FormEvent, useEffect, useState } from 'react'

type BlogSearchProps = {
  title: string
}

let timeoutId: NodeJS.Timeout

export default function BlogSearch({ title }: BlogSearchProps) {
  const submit = useSubmit()
  const location = useLocation()
  const [value, setValue] = useState(title || '')

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      submit(
        { q: (e.target as HTMLFormElement).value },
        { replace: true, action: `${location.pathname}?q=${value}` }
      )
    }, 400)
  }

  useEffect(() => {
    setValue(title)
  }, [title])

  return (
    <div className='blog-search'>
      <h1># 所有博客</h1>
      <Form onChange={handleChange}>
        <input
          name='q'
          value={value === null ? '' : value}
          type='text'
          placeholder='搜索'
          className='blog-search-input'
          onChange={(e) => {
            setValue((e.target as HTMLInputElement).value)
          }}
        />
      </Form>
    </div>
  )
}

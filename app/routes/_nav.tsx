import { Link, Outlet } from '@remix-run/react'
import { Theme, useTheme } from '~/utils/theme-provider'

export default function BlogNav() {
  const [theme, setTheme] = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? Theme.DARK : Theme.LIGHT)
  }

  return (
    <div className='page'>
      <div className='header-logo-links'>
        <Link to='/'>
          <div className='logo'>
            <img src='/logo.svg' alt='logo' />
            <span>Remix-Mdx-Blog</span>
          </div>
        </Link>
        <div className='links'>
          <Link to='/blogs'>博客</Link>
          <Link to='/tags'>标签</Link>
          <Link to='/about'>关于</Link>
          <span onClick={handleThemeChange}>
            {theme === 'light' ? '🔆' : '🌙'}
          </span>
        </div>
      </div>
      <Outlet />
      <div className='footer'>
        <div className='footer-links'>
          <a href='https://github.com/yyong008'>Github</a>
        </div>
        <div className='footer-info'>
          <span>Magnesium- • © 2023 • remix-mdx-blog.vercel.app</span>
        </div>
      </div>
    </div>
  )
}

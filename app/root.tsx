import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@remix-run/node'
import type { Theme } from '~/utils/theme-provider'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme
} from '~/utils/theme-provider'
import { cssBundleHref } from '@remix-run/css-bundle'

// server
import { getThemeSession } from './utils/theme.server'

// styles
import globalStyleHref from '~/styles/global.css'

// config
import { config } from './config/website'

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/fonts/SmileySans-Oblique.otf.woff2',
    as: 'font',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'preload',
    href: '/fonts/SmileySans-Oblique.ttf.woff2',
    as: 'font',
    crossOrigin: 'anonymous'
  },
  { rel: 'stylesheet', href: globalStyleHref },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
]

export const meta: MetaFunction = ({ location }) => {
  return [
    { title: config.title },
    {
      property: 'charset',
      content: 'utf-8'
    },
    {
      property: 'description',
      content: config.description
    },
    {
      property: 'robots',
      content: 'index, follow'
    },
    {
      property: 'viewport',
      content: 'width=device-width,initial-scale=1'
    },
    {
      property: 'og:url',
      content: `${config.url}${location.pathname}`
    },
    {
      property: 'og:type',
      content: `website`
    },
    {
      property: 'og:site_name',
      content: config.title
    },
    {
      property: 'og:title',
      content: config.title
    },
    {
      property: 'og:description',
      content: config.description
    },
    {
      property: 'og:description',
      content: config.image
    }
  ]
}

export type LoaderData = {
  theme: Theme | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)

  const data: LoaderData & { revalidate: number } = {
    theme: themeSession.getTheme(),
    revalidate: 60 //
  }

  return data
}

const App = () => {
  const data = useLoaderData<LoaderData>()
  const [theme] = useTheme()

  return (
    <html lang='en' className={`${theme}`}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>()

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}

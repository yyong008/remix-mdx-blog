const path = require('path')
const { globSync } = require('glob')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: ['mdx-bundler'],
  watchPaths: ['./app/routes/posts/*.mdx'],
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
    v2_dev: true,
    v2_headers: true
  },
  async routes(defineRoutes) {
    const files = globSync('./app/routes/posts/*.mdx').map((f) => {
      return f.split(path.sep).join('/').replace('app/routes/posts/', '')
    })

    return defineRoutes((route) => {
      route('/', 'routes/_nav.tsx', () => {
        route('posts', 'routes/_nav.posts.tsx', () => {
          for (let file of files) {
            route(file.replace(/\.mdx$/, ''), 'routes/posts/' + file)
          }
        })
      })
    })
  },
  mdx: async () => {
    const [rehypeHighlight, rehypeExternalLinks, gfm] = await Promise.all([
      import('rehype-highlight').then((mod) => mod.default),
      import('rehype-external-links').then((mod) => mod.default),
      import('remark-gfm').then((mod) => mod.default)
    ])

    return {
      remarkPlugins: [gfm],
      rehypePlugins: [
        rehypeHighlight,
        (params) =>
          rehypeExternalLinks({
            ...params,
            rel: ['noopener', 'noreferrer'],
            target: '_blank'
          })
      ]
    }
  }
}

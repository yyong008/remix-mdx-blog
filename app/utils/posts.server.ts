import type { Mod, Frontmatter } from './types'

import fs from 'node:fs'
import path from 'node:path'

import { globSync } from 'glob'
import { bundleMDX } from 'mdx-bundler'

const bins: string[] =
  process.platform === 'win32' ? ['esbuild', 'esbuild.exe'] : ['bin', 'esbuild']

process.env.ESBUILD_BINARY_PATH = path.join(
  process.cwd(),
  'node_modules',
  ...bins
)

const postsPath = path.join(__dirname, '../routes/posts')
export async function getPostsModules() {
  const mods: Mod[] = []
  const files = globSync('./app/routes/posts/*.mdx').map((p) =>
    p.split(path.sep).join('/')
  )

  for (const file of files) {
    const _path = path.join(process.cwd(), file)
    const rawPathCode = fs.readFileSync(_path).toString()

    const { frontmatter } = await bundleMDX({
      source: rawPathCode
    })

    const _mod = {
      filename: file.replace('.mdx', ''),
      route: file.replace('app/routes', '').replace('.mdx', ''),
      ...(frontmatter as Frontmatter)
    }
    mods.push(_mod)
  }

  return mods
}

export async function getTagsAndCount() {
  const tags: { [tag: string]: number } = {}
  ;(await getPostsModules()).forEach((mod: any) => {
    mod?.tags?.forEach((tag: string) => {
      if (tags[tag]) {
        tags[tag]++
      } else {
        tags[tag] = 1
      }
    })
  })

  return tags
}

export async function filterPostsByTitle(query: string) {
  const mods = await getPostsModules()
  return mods
    .map((m) => {
      return m.title.toLowerCase().includes(query.toLowerCase()) ? m : ''
    })
    .filter((m) => typeof m !== 'string') as Mod[]
}

export async function getPostsSortedByDate() {
  const mods = await getPostsModules()
  mods.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1
  })
  return mods
}

type PageData = {
  posts: Mod[]
  current: number
  next: number | null
  prev: number | null
  total: number
}

export const getPagingData = (request: Request, posts: Mod[]): PageData => {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') ?? 1
  const pageNumber = Number(page)

  const from = 10 * (pageNumber - 1)
  const to = 10 * pageNumber

  return {
    posts: posts.slice(from, to),
    current: pageNumber,
    next: posts.length > to ? pageNumber + 1 : null,
    prev: pageNumber > 0 ? pageNumber - 1 : null,
    total: Math.ceil(posts.length / 10)
  }
}

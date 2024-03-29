export type Mod = {
  filename: string
  route: string
  code: string
  // front-matter
  title: string
  summary: string
  date: string // '2022-08-17',
  tags: string[]
  image: string[]
}

export type Frontmatter = {
  title: string
  summary: string
  date: string // '2022-08-17',
  tags: string[]
  image: string[]
}

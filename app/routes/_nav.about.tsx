import type { MetaFunction } from '@remix-run/node'
import { config } from '~/config/website'

export const meta: MetaFunction = () => {
  const title = `About - ${config.author}`
  const summary = `About me - ${config.author}`

  return [
    { title },
    {
      property: 'description',
      content: summary
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: summary
    }
  ]
}

export default function AboutRoute() {
  return (
    <div className='page-about'>
      <img className='page-about-avatar' src='/logo.svg' alt='author' />
      <div className='page-about-author'>{config.author}</div>
      <div>
        在当今数字时代，博客已经成为人们分享观点、传递知识和与世界互动的重要平台。随着技术的不断发展，开发者们不断寻找更高效、更灵活的工具来创建博客。在本文中，我们将介绍一种创新的技术栈，结合Remix
        Web和MDX，为您打造一个现代化的博客。
      </div>
      <div>
        Remix
        Web是一个现代化的JavaScript框架，专注于构建可扩展、高性能的Web应用程序。它采用了组件化开发模式和可插拔的中间件系统，使得构建复杂的前端应用变得更加简单。Remix
        Web提供了强大的路由管理、状态管理和构建工具，使得开发者可以更加专注于业务逻辑的实现。
        MDX是一种结合了Markdown和React的强大语法，可以让开发者在博客中使用React组件和动态内容。通过MDX，您可以轻松地编写可交互的博客文章，展示代码示例、嵌入图表、添加动画效果，甚至与读者进行互动。MDX的灵活性使得博客内容更加丰富多样，同时保持了Markdown的简洁性和易读性。
        将Remix Web和MDX结合使用，您可以享受到两者的最佳特性。Remix
        Web提供了强大的Web应用程序开发能力，包括路由管理、状态管理和构建工具。而MDX则为您提供了无限的创作自由，可以将React组件和动态内容无缝集成到您的博客中。
        无论您是一个独立博主还是一个企业技术团队，使用Remix
        Web和MDX构建博客都是一个值得尝试的选择。您可以借助Remix
        Web的灵活性和高性能，打造出专业级的博客网站。而MDX则为您提供了丰富的创作方式，让您的博客内容更加生动有趣。
        在接下来的博客系列中，我们将深入探讨如何使用Remix
        Web和MDX构建现代化博客。我们将介绍它们的核心概念、基本用法和最佳实践，帮助您快速上手并发挥出它们的最大潜力。无论您是一个前端开发者还是一个博客爱好者，我们相信这个技术栈将为您的博客带来新的可能性。
        敬请关注我们的博客系列，与我们一起探索Remix Web和MDX的魅力！
      </div>
    </div>
  )
}

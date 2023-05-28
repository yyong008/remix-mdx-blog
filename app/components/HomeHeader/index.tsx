import { config } from '~/config/website'

export default function HomeHeader() {
  return (
    <div className='home-header'>
      <img src={config.image} alt='author' />
      <div className='home-header-author-description'>
        <div className='home-header-author'>{config.author}</div>
        <div className='home-header-description'>{config.description}</div>
      </div>
    </div>
  )
}

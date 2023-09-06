import '../styles/header.css'

function Header(props: { title: string }) {
  return (
    <div className='header'>
      {props.title}
    </div>
  )
}

export default Header

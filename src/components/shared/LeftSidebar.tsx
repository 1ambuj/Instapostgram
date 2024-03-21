
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
     <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
        <Link to="/" className="fex gap-3 item-center">
             <img 
               src="/assets/img/instagram1.png"
               alt="logo"
               width={170}
               height={36}
             />
          </Link>
          <Link to={`/profile/$user:id`}></Link>
        </div>
     </nav>
  )
}

export default LeftSidebar
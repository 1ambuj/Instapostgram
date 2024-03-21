import {Link , useNavigate} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
    const { mutate: signOut, isSucess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(()=>{
        if(isSucess) navigate(0);
    })
  return (
    <section className='topbar'>
       <div className='flex-between py-4 px-5'>
          <Link to="/" className="fex gap-3 item-center">
             <img 
               src="/assets/img/instagram1.png"
               alt="logo"
               width={130}
               height={325}
             />
          </Link>
          <div className='flex gap-4' >
             <Button variant="ghost" className="shad-button_ghost" onClick={()= signOut()}>
                <img   src="/"alt="logo"/>
             </Button>
             <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                <img src={user.imageUrl || 'assets/image/default-avatar'} alt="profile" className='h-8 w-8 rounded fall'/>
             </Link>
          </div>
       </div>
    </section>
  )
}

export default Topbar
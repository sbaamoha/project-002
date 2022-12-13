import {Link} from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar: React.FC = () => {
    const isLogged = useSelector((state: RootState) => state.data)
return (
    <header className="p-6 lg:px-12 bg-slate-300 shadow-md">
        <nav className="flex justify-between items-center">
            <Link to='/'>
                <p className='uppercase text-2xl'>workouts</p> 
            </Link>
            
            {!isLogged.userLogged ? <div className="text-sm lg:text-lg flex gap-2 lg:gap-5 capitalize">
                <Link className="p-2 text-white rounded-full bg-green-400 hover:text-black transition-all" to='/login'>login</Link>
                <Link className="p-2 text-white rounded-full bg-green-400 hover:text-black transition-all" to='/signup'>signup</Link>
            </div> : <div>{isLogged.user.email}</div>}
        </nav>
    </header>
);
}

export default Navbar
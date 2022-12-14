import {Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../redux/reducers/dataReducer";
import { RootState } from "../redux/store";

const Navbar: React.FC = () => {
    const userIsLogged = useSelector((state: RootState) => state.data.userLogged)
    const dispatch = useDispatch()
    const userLogged = localStorage.getItem("user")
    const handleLogout = () =>{
        dispatch(logout())
        localStorage.clear()
    }

    return (
    <header className="p-6 lg:px-12 bg-slate-300 shadow-md">
        <nav className="flex justify-between items-center">
            <Link to='/'>
                <p className='uppercase text-lg lg:text-2xl'>workouts</p> 
            </Link>
            {userLogged == null ? <div className="text-sm lg:text-lg flex gap-2 lg:gap-5 capitalize">
                <div className="hidden">
                    {userIsLogged}
                </div>
                <Link className="btn" to='/login'>login</Link>
                <Link className="btn" to='/signup'>signup</Link>
            </div> : 
                <div className="flex items-center gap-2 text-sm lg:text-2xl capitalize">
                    <p>{JSON.parse(userLogged)?.split('@')[0]}</p>
                    <button 
                        onClick={handleLogout}
                        className="btn">logout</button>
                </div>}
        </nav>
    </header>
);
}

export default Navbar
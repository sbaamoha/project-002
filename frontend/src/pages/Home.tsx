import { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.js';
import {addWorkout} from '../redux/reducers/dataReducer.js'
import CreateWorkout from '../components/CreateWorkout'
import WorkoutDetails from '../components/WorkoutDetails'
type Workout = {
    _id: string,
    title: string,
    load: number,
    reps: number,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const Home = () => {
    const workouts = useSelector((state: RootState) => state.data.workouts)
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch('http://localhost:4000/api')
            const data = await response.json();
            if(response.ok){
                dispatch(addWorkout(data))
            }
        };
        fetchData()
    }, [])
    return (
     <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10'>
            <div className='order-last lg:-order-1 col-span-2 px-6 lg:px-12'>
            {workouts ? workouts.map(workout => (
                <WorkoutDetails key={(workout._id)} workout={workout} />
            )): ""}

            </div>
            <div className=''>
                <CreateWorkout />
            </div>
        </div>
    </div>
  )
}

export default Home
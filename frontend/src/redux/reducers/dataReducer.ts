import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store'

type WorkoutType = {
    _id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    load: number,
    reps: number,
    __v: number
}

type WorkoutsType = WorkoutType[]

type User = {
    email: string | null
}
type UserLoggedInType = boolean
type InitState = {
    workouts: WorkoutsType
    userLogged: UserLoggedInType
    user: User
}
const initialState: InitState = {
    workouts: [],
    userLogged: false,
    user:{
        email: null,
    }
}
export const workoutSlice = createSlice({
    name: "workouts",
    initialState,
    reducers: {
        addWorkout(state: InitState, action: PayloadAction<WorkoutsType>) {
            state.workouts = action.payload
        },
        addSingleWorkout(state: InitState, action: PayloadAction<WorkoutType>) {
            state.workouts.push(action.payload)
        },
        deleteWorkout(state: InitState, action: PayloadAction<WorkoutType> ) {
            state.workouts = [...state.workouts.filter(workout => workout._id !== action.payload._id)]
        },
        loginUser(state: InitState, action: PayloadAction<User>){
            state.user = action.payload
            state.userLogged = true
        }
    }
})

export const {addWorkout, deleteWorkout,addSingleWorkout,loginUser} = workoutSlice.actions;
export const wourkoutSlice = (state: RootState) => state.data

export default workoutSlice.reducer
import { ACTIONS } from './App.js'

export default function Digit_btn({dispatch,digit}){
    return (<button onClick={()=> dispatch({type:ACTIONS.ADD,payload:{ digit }})}>
    {digit}
    </button>
    )
}
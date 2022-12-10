import {ACTIONS} from './App.js'

export default function Operation_Btn({dispatch,Operation}){
    return (<button onClick={()=> dispatch({type:ACTIONS.CHOOSE,payload:{ Operation }})}>
    {Operation}
    </button>
    )
}
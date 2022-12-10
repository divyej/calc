import { useReducer } from 'react';
import Digit_btn from './dijit.js';
import Operation_btn from './oper.js';
import './index.css';

export const ACTIONS={
    ADD:"add_dg",
    CHOOSE:"choose_op",
    DELETE:"delete",
    CLEAR:"clr",
    EVALUATE :"eval", 
}
function reducer(state,{type,payload}){
    switch(type){
        case ACTIONS.ADD: 
        if (payload.digit===0 && state.Current===0)
        return state
        if(payload.digit==="." && state.Current.includes("."))
        return state 
        if (state.Current=== evaluate(state) && payload.digit===1)
        {
            return {
                ...state,
                Previous:state.Current,
                Current:null,

            }
        }
        return{
            ...state , 
            Current: `${state.Current || ""}${payload.digit}`,
      
        }
        
        case ACTIONS.CHOOSE:
        if (state.Current===null)
        {
            return {
                ...state,
                Operation: payload.Operation,
            
            }
        }
        if (state.Previous===null)
        {
            return{
                ...state,
                Operation: payload.Operation,
                Previous: state.Current,
                Current: null,
            }
        }
        return {
            ...state,
            Operation:payload.Operation,
            Previous:evaluate(state),
            Current:null,
        }
    case ACTIONS.CLEAR:
    return{
        ...state,
        Previous:null,
        Current:null, 
    }
    case ACTIONS.DELETE:
    if(state.Current===null)
    {
        return state
    }
  if(state.Current===1)  {
      return{
          ...state,
          Current:null, 
      }
    }
    return{
        ...state,
        Current: state.Current.slice(0,-1),
    }
    case ACTIONS.EVALUATE: 
    if(state.Operation===null || state.Current===null || state.Previous===null){
        return state
    }
    }
    return{
        ...state,
        Previous:null,
        Operation:null,
        Current: evaluate(state),
    }
    }
    function evaluate({Current , Previous , Operation}){
      const cur= parseFloat(Current)  
      const prev= parseFloat(Previous)
      if(isNaN(cur)|| isNaN(prev)){
      return ""}
      let result=""
      switch(Operation)
      {
          case "+": result=prev+cur
          break
          case "-": result=prev-cur
          break
          case "/": result=prev/cur
          break 
          case "*": result=prev*cur
          break 
      }  
      return result.toString()
    }
  

function App(){
    const[{Current , Previous , Operation},dispatch]= useReducer(reducer,{})

return(
    <div className="calci-grid">
    <div className="output">
    <div className="PreviousOp">{Previous}</div>
    <div className="CurrentOp">{Current}</div>
    </div>
    <button className="big" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC </button>
    <button onClick={()=> dispatch({type:ACTIONS.DELETE})}>DEL</button>
    <Operation_btn Operation="+" dispatch={dispatch}/>
    <Operation_btn Operation="-" dispatch={dispatch}/>
    <Operation_btn Operation="*" dispatch={dispatch}/>
    <Operation_btn Operation="/" dispatch={dispatch}/>
    <Digit_btn digit="1" dispatch={dispatch}/>
    <Digit_btn digit="2" dispatch={dispatch}/>
    <Digit_btn digit="3" dispatch={dispatch}/>
    <Digit_btn digit="4" dispatch={dispatch}/>
    <Digit_btn digit="5" dispatch={dispatch}/>
    <Digit_btn digit="6" dispatch={dispatch}/>
    <Digit_btn digit="7" dispatch={dispatch}/>
    <Digit_btn digit="8" dispatch={dispatch}/>
    <Digit_btn digit="9" dispatch={dispatch}/>
    <Digit_btn digit="0" dispatch={dispatch}/>
    <Digit_btn digit="." dispatch={dispatch}/>
    <button
        className="big"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
)}

export default App

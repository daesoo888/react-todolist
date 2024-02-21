import { useReducer } from "react";

const reducer = (state , action) => {
    switch(action.type){
        case "INCREASE":
            return state + action.data; 
        case "DECREASE":
            return state - action.data; 
        case "INIT":
            return 0;     
        default:
            return state;
    }
}

export function TestComp(){
    const [count , dispatch] = useReducer(reducer,0);

    return (
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <div>
                <button onClick={() => { dispatch({type:"INCREASE" ,data:1}) }}>증가</button>
                <button onClick={() => { dispatch({type:"DECREASE" ,data:1}) }}>감소</button>
                <button onClick={() => { dispatch({type:"INIT" ,data:1}) }}>초기화</button>
            </div>
        </div>
    );
}
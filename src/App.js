import React, { useEffect , useState ,useRef, useReducer , useCallback, useMemo} from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
//import { TestComp } from './component/TestComp';

const mockTodo = [
  {
    id:0,
    isDone:false,
    content:'공부1',
    createdDate: new Date().toLocaleDateString(),
  },
  {
    id:1,
    isDone:false,
    content:'공부2',
    createdDate: new Date().toLocaleDateString(),
  },
  {
    id:2,
    isDone:true,
    content:'공부3',
    createdDate: new Date().toLocaleDateString(),
  },
  {
    id:3,
    isDone:false,
    content:'공부4',
    createdDate: new Date().toLocaleDateString(),
  },

];


const reducer = (state , action) => {
  //상태 변화 코드
  switch(action.type){
    case "CREATE":
      return [action.newItem , ...state];
    case "UPDATE":
      return state.map((item) => 
        item.id === action.id
        ?{
          ...item,
          isDone:!item.isDone
        }
        : item
        );
        
    case "DELETE":
      return state.filter((item) => item.id !== action.id );
    default:
      return state;   
  }

};


export const TodoContext = React.createContext();
export const TodoDispatchContext = React.createContext();
export const TodoStateContext = React.createContext();




function App() {
  const [todo , dispatch] = useReducer(reducer , mockTodo);
  //const [todo , setTodo] = useState(mockTodo);
  const isRef = useRef(4);

  /*
  const onCreate = (content) => {
    const newOne = {
      id:isRef.current,
      content,
      isDone:false,
      createdDate: new Date().getTime(),
    }
    //setTodo([newItem, ...todo]);
    dispatch({ type: "CREATE", newItem: newOne });
    isRef.current += 1;
  }
*/


  const onCreate = (content) => {
    const newOne = {
      id:isRef.current,
      content,
      isDone:false,
      createdDate: new Date().getTime(),
    }
    //setTodo([newItem, ...todo]);
    dispatch({ type: "CREATE", newItem: newOne });
    isRef.current += 1;
  };

  const onUpdate = useCallback((id) => {

    let todores = todo.map((item) => {
      return item.id === id ? {...item, isDone : !item.isDone} : item;
    });

    //setTodo(todores);
    dispatch({ type: "UPDATE", id });
  },[])



  const onDelete = useCallback((id) =>  {
    let todores = todo.filter( (item) => item.id !== id );
    //setTodo(todores);
    dispatch({ type: "DELETE", id });
  },[])

  //console.log('todo : ', todo);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete}
  }, []);


  return (
    <div className="App">
      {/*<TestComp/>*/}
      <Header/>

      <TodoStateContext.Provider value={{todo}}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor/>
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>

      {/*
      <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete}}>
        <TodoEditor/>
        <TodoList />
      </TodoContext.Provider>
      */}

    </div>
  );
}

export default App;

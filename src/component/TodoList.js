import { useState , useMemo, useContext } from 'react';
import { TodoContext , TodoStateContext, TodoDispatchContext} from '../App';

import TodoItem from './TodoItem';
import './TodoList.css';


const TodoList = () => {

    //const storeData = useContext(TodoContext);
    //console.log('storeData : ' , storeData);

    //const {todo, onUpdate, onDelete} = useContext(TodoContext);
    const {todo} = useContext(TodoStateContext);
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);

    //console.log('todo : ' , todo);
    const [search , setSearch] = useState('');

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearchResult = () => {
        return search === ''? todo : todo.filter((item) =>  item.content.toLowerCase().includes(search.toLowerCase()));
    }

   
    const analyzeTobe = useMemo( () => {
            //console.log('analyzeTobe()');
            const totalCount = todo.length;
            const doneCount = todo.filter((item) => item.isDone ).length;
            const notDoneCount = totalCount - doneCount;
            return {
                totalCount,
                doneCount,
                notDoneCount
            };
        }, [todo])

/*
        const analyzeTobe =  () => {
            console.log('analyzeTobe()');
            const totalCount = todo.length;
            const doneCount = todo.filter((item) => item.isDone ).length;
            const notDoneCount = totalCount - doneCount;
            return {
                totalCount,
                doneCount,
                notDoneCount
            };
        };
    */

    const {totalCount, doneCount, notDoneCount} = analyzeTobe;

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
            <div>
                <div>총개수 : {totalCount}</div>
                <div>끝낸일 : {doneCount}</div>
                <div>안끝낸일 : {notDoneCount}</div>
            </div>
            <input onChange={onChangeSearch} className='searchbar' placeholder='검색어를 입력하세요'/>
            <div className='list_wrapper'>
                {getSearchResult().map((it) => (
                     <TodoItem key={it.id} {...it}/>
                ))}
            </div>
            
        </div>
    );
}

TodoList.defaultProps = {
    todo:[]
}

export default TodoList;
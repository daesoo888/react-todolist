import './TodoItem.css';
import React , {useContext} from 'react';
import { TodoContext , TodoStateContext, TodoDispatchContext} from '../App';


const TodoItem = ({isDone,content,createdDate,id }) => {
    //const storeData = useContext(TodoContext);
    //console.log('storeData : ' , storeData);

    //const { onUpdate, onDelete} = useContext(TodoContext);
    const { onUpdate, onDelete} = useContext(TodoDispatchContext);
    
    console.log(`${id} TodoItem 업데이트`);
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={() => {onUpdate(id)}} type="checkbox" checked={isDone}/>
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{createdDate}</div>
            <div className="btn_col">
                <button onClick={() => {onDelete(id)}}>삭제</button>
            </div>
        </div>
    );
}


export default React.memo(TodoItem);
//export default (TodoItem);
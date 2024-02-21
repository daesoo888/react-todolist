import './TodoEditor.css'

import { useState , useRef , useContext } from 'react';
import { TodoContext , TodoStateContext, TodoDispatchContext} from '../App';

const TodoEditor = () => {

    //const {onCreate} = useContext(TodoContext);
    const {onCreate} = useContext(TodoDispatchContext);


    const [content , setContent] = useState('');
    const inputRef = useRef();


    const onChangeContent = (e) =>{
        setContent(e.target.value);
    };

    const onSubmit = () => {
        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent('');
        inputRef.current.value = '';
    }

    const onKeyDown = (e) =>{
        if(e.keyCode === 13){
            onSubmit();
        }
    }


    
    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 </h4>
            <div className='editor_wrapper'>
                <input  ref={inputRef} onKeyDown={onKeyDown} onChange={onChangeContent} placeholder='새로운 Todo ...'/>
                <button onClick={onSubmit} >추가</button>
            </div>

        </div>

    );
}

export default TodoEditor;
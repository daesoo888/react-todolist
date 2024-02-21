import './Header.css';
import React from 'react';

const Header = () => {
    //console.log('헤더 렌더');
    return (
        <div className='Header'>
            <h3>오늘은 </h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
}

//export default  Header;
export default   React.memo(Header);
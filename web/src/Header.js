import React from 'react'


function Header(props) { // props esta recebendo a propriedades do header no caso é o title
    return <h1>{props.title}</h1>
}

export default Header
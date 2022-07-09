import React from 'react'
import MainOptions from '../../components/Main/MainOptions'
import Content from '../../components/Main/Content'
import { useParams } from 'react-router-dom'

import './Main.css'

function Main() {
    const url = useParams()
    return (
        <main>
            <MainOptions url={url.trash === 'trash' ? "trash" : "content" }/>
            <Content url={url.trash === 'trash' ? "trash" : "content" }/> 
        </main>
    )
}

export default Main

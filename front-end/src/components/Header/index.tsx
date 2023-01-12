import React from 'react'
import {styles} from './index'

type Props = {
    nomeCooperativa: String,
    local: String,
    text: String
}

const Avatar = () => {
    return(
        <div style={styles.avatar}>
        </div>
    )
}

export const Header = ({nomeCooperativa, local}: Props) => {
    return(
        <div style={styles.header}>
            <Avatar />
        </div>
    )
};


import React from "react"
import './App.css'
import { TwitterFollowCard } from "./TwitterFollowCard.jsx"

const users = [
    {
        name: "Luis Soriano Suarez",
        userName: "LuisSS20",
        isFollowing: false
    },
    {
        name: "Miguel Angel Durán",
        userName: "Midudev",
        isFollowing: true
    }
]

export function App(){

    return (
        <section className="App">
            users.map(({ userName, name, isFollowing }) => (
                <TwitterFollowCard
                    key={userName}
                    userName={userName}
                    initialIsFollowing={isFollowing}
                >
                    {name}
                </TwitterFollowCard>
                ))
        </section>
    )
}

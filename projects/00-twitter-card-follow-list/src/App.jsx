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
        userName: "midudev",
        isFollowing: true
    },
    {
      name: "Adrian Martinez Navarro",
      userName: "adrisui3",
      isFollowing: false
  }
]

export function App(){
    return (
        <section className="App">
          {
            users.map(({ userName, name, isFollowing }) => (
              <TwitterFollowCard
                  key={userName}
                  name={name}
                  userName={userName}
                  initialIsFollowing={isFollowing}
              >
              </TwitterFollowCard>
              ))
          }
        </section>
    )
}

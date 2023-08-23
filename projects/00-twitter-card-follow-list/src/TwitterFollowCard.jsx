import { useState } from "react"

export function TwitterFollowCard({name, userName, initialIsFollowing}){

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const text = isFollowing ? 'Following' : 'Follow'
    const followButtonClass = isFollowing ? 'tw-card-follow-button button-is-following' : 'tw-card-follow-button'

    const followClick = () =>{
        setIsFollowing(!isFollowing)
    }

    return (
        <article className="tw-card-article">
            <header className="tw-card-header">
                <img className="tw-img-avatar" alt="Avatar" src={`https://unavatar.io/${userName}`}/>
                <div className="tw-card-info">
                    <strong className="tw-card-name">{name}</strong>
                    <span className="tw-card-username">@{userName}</span>
                </div>
            </header>
            <aside className="tw-card-aside">
                <button className={followButtonClass} onClick={followClick}>
                    <span className='tw-followCard-text'>{text}</span>
                    <span className='tw-followCard-stopFollow'>Unfollow</span>
                </button>
            </aside>
        </article>
    )
}
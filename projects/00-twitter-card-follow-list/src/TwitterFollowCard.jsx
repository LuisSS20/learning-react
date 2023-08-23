import { useState } from "react"

export function TwitterFollowCard({name, userName, initialIsFollowing}){

    const followText = "Follow";
    const followingText = "Following";
    const unfollowText = "Unfollow";

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const [text, setText] = useState(initialIsFollowing ? followingText : followText)
    const followButtonClass = isFollowing ? 'tw-card-follow-button button-is-following' : 'tw-card-follow-button'


    const followClick = () =>{
        setIsFollowing(!isFollowing);
        if(text == followText)
            setText(unfollowText)
        else
            setText(followText)
    }

    const mouseEnterButton = () =>{
        if(isFollowing)
            setText(unfollowText)
    }

    const mouseLeaveButton = () =>{
        if(isFollowing)
            setText(followingText)
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
                <button className={followButtonClass} onClick={followClick} onMouseEnter={mouseEnterButton} onMouseLeave={mouseLeaveButton}>
                    <span className='tw-followCard-text'>{text}</span>
                </button>
            </aside>
        </article>
    )
}
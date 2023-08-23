export function TwitterFollowCard({name, userName, isFollowing}){

    const text = isFollowing ? 'Following' : 'Follow'

    return (
        <article className="tw-card-article">
            <header className="tw-card-header">
                <img className="tw-img-avatar" alt="Avatar" src={`https://unavatar.io/${userName}`}/>
                <div className="tw-card-info">
                    <strong className="tw-card-name">{name}</strong>
                    <span className="tw-card-username">{userName}</span>
                </div>
            </header>
            <aside className="tw-card-aside">
                <button className="tw-card-follow-button">
                    <span className='tw-followCard-text'>{text}</span>
                </button>
            </aside>
        </article>
    )
}
const List = ({name, username, email, id}) => {
    return (
        <>
            <div className="relative flex flex-col border-b-2 border-slate-500">
                <span>{id}) Name: {name}</span>
                <span>Username: {username}</span>
                <span>Email: {email}</span>
            </div>
        </>
    )
}

export default List
function Navbar() {
    return (
        <nav className='topbar'>
            <ul>
                <li>
                    <a href={`/`}>Home</a>
                </li>
                <li>
                    <a href={`/projects`}>Projects</a>
                </li>
                <li>
                    <a href={`/groups`}>Groups</a>
                </li>
                <li>
                    <a href={`/projects/create`}>Create Project</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
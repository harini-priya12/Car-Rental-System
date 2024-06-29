import { useState, useEffect } from "react"

function Projects() {

    // fetch the list of projects from the server
    // sample JSON response
    /*
    [
        {
        "id": "1",
        "name": "Inventory Management System",
        "description": "A system to manage inventory of a store."
        },
        {
        "id": "2",
        "name": "Hotel Reservation System",
        "description": "A system to manage hotel reservations."
        },
    ]
    */

    const [projects, setProjects] = useState([])

    async function fetchProjectList() {
        // fetch is the browser API to make HTTP requests.

        // A promise is used to handle the asynchronous operation.
        // A promise can be in the following states:
        // 1. Pending: Initial state, neither fulfilled nor rejected.
        // 2. Fulfilled: Meaning that the operation completed successfully.
        // 3. Rejected: Meaning that the operation failed.

        // Here, fetch promises to return an HTTP response.
        // If the request is unsuccessful, the promise is rejected, and an error is thrown.
        // We should handle the error using try catch block.
        // If the request is successful, the promise is fulfilled, and the response is returned.
        // We can extract the data from the response using response.json() (which returns a promise to JSOn data).

        // await is another way to handle Promises instead of the .then().catch() syntax.
        try {
            const response = await fetch('http://localhost:2000/assignments')
            const data = await response.json()
            setProjects(data)
        } catch (error) {
            console.error(error)
            alert('Failed to fetch projects. Check console for error details.')
        }
    }

    // useEffect is a hook that runs after the first render of the component.
    // It is used to perform side effects in function components.
    // The function passed to useEffect is called the effect.

    // Here, the data to be rendered is not statically known at the time of rendering.
    // Hence, we fetch the data after the component is rendered.
    useEffect(() => {
        fetchProjectList()
    }, [])

    // We want to focus on the project id if it is present in the URL.
    useEffect(() => {
        // Manual DOM manipulation required to scroll to the project with the id in the URL.
        // useRef hook can also be used to get the reference to the DOM element.
        // We will need an array of refs to store the references to all the projects,
        // which is difficult to manage.
        const currentURL = window.location.href;
        //get the id component xyz from http://url#xyz
        const lastHashPos = currentURL.lastIndexOf('#');
        if (lastHashPos !== -1) {
            const id = currentURL.substring(lastHashPos + 1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView();
            }
        }
    }, [projects])

    async function deleteProject(id) {
        try {
            const response = await fetch(`http://localhost:2000/assignments/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                alert('Project deleted successfully')
                window.location.reload()
            } else {
                alert('Failed to delete project')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to delete project. Check console for error details.')
        }
    }

    return (
        <>
            <div>
                <h1>Projects</h1>
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}
                            style={
                                {
                                    border: '1px solid black',
                                    padding: '10px',
                                    margin: '10px',
                                    listStyleType: 'none'
                                }
                            }
                        >
                            <h2>
                                <a
                                    href={`#project-${project.id}`}
                                    id={`project-${project.id}`}>
                                    {project.name}
                                </a>
                            </h2>
                            <p>{project.description}</p>
                            <a href={`/projects/update/${project.id}`}>Update</a>
                            <button
                                style={{ marginLeft: '10px' }}
                                onClick={() => deleteProject(project.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Projects
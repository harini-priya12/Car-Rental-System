import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CreateOrUpdateProject() {

    // useParams will extract the react-router-dom params used in the format ":paramName"
    // For example, if the route is defined as
    //    path: "/projects/update/:id",
    // and the URL is
    //           /projects/update/1
    // then useParams() will be a dictionary { id: "1" }
    // id will not be set in the browser
    // if the user is creating a new project.
    const { id } = useParams();
    const [name, setUserName] = useState('')
    const [gender, setUserGender] = useState('')
    const [address, setUserAddress] = useState('')
    const [phno, setUserPhno] = useState('')
    const [email, setUserEmail] = useState('')
    const [password, setUserPassword] = useState('')

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`)
                const data = await response.json()
                setUserName(data.name)
                setUserGender(data.gender)
                setUserAddress(data.address)
                setUserPhno(data.phno)
                setUserEmail(data.email)
                setUserPassword(data.password)
            } catch (error) {
                console.error(error)
                alert('Failed to fetch project. Check console for error details.')
            }
        }
        if (id) {
            fetchProject()
        }
    }, [id])

    async function onFormSubmit(name,gender,address,phno,email,password) {
        try {
            let response;
            if (!id) {
                response = await fetch(
                    'http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name,gender,address,phno,email,password}),
                })
            } else {
                response = await fetch(
                    `http://localhost:3000/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name,gender,address,phno,email,password}),
                })
            }
            
            if (response.ok) {
                alert('Project created or updated successfully')
                window.location.reload()
            } else {
                alert('Failed to create or update project')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to create project. Check console for error details.')
        }

        if (id) {
            // route to /projects after updating the project
            window.location.href = '/projects'
        }
    }

    return (
        <>
            <div>
                <h1>CreateOrUpdateProject</h1>
                <form style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        gap: '10px',
                        margin: 'auto',
                    }}
                    onSubmit={(event) => {
                        event.preventDefault()
                        const form = event.target
                        const name = form.name.value
                        const gender = form.gender.value
                        const phno = form.phno.value
                        const email = form.email.value
                        const password = form.password.value
                        onFormSubmit(name,gender,address,phno,email,password)
                    }}
                >
                    <label htmlFor="users-name">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="users-name"
                        defaultValue={name}
                    />
                    <label htmlFor="users-gender">
                        Gender:
                    </label>
                    <textarea
                        rows={10}
                        name="gender"
                        id="users-gender"
                        defaultValue={gender}
                    />
                    <label htmlFor="users-address">
                        Address:
                    </label>
                    <textarea
                        rows={10}
                        name="address"
                        id="users-address"
                        defaultValue={address}
                    />
                    <label htmlFor="users-phno">
                        Phno:
                    </label>
                    <textarea
                        rows={10}
                        name="phno"
                        id="users-phno"
                        defaultValue={phno}
                    />
                    <label htmlFor="users-email">
                        Email:
                    </label>
                    <textarea
                        rows={10}
                        name="email"
                        id="users-email"
                        defaultValue={email}
                    />
                    <label htmlFor="users-password">
                        Password:
                    </label>
                    <textarea
                        rows={10}
                        name="password"
                        id="users-password"
                        defaultValue={password}
                    />
                    <button
                        type="submit"
                        style={
                            {
                                alignSelf: 'center',
                                height: '30px',
                                width: '150px',
                                margin: '10px',
                            }
                        }
                    >
                        { id ? 'Update' : 'Create' } Project
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateOrUpdateProject
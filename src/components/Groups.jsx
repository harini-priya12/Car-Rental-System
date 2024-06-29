import { useState, useEffect } from "react"

function Vehicles() {

    const [vehicles, setVehicles] = useState([])
    async function fetchVehicles() {
        try {
            const response = await fetch('http://localhost:3000/vehicles')
            const data = await response.json()
            setVehicles(data)
        }
        catch (error) {
            console.error(error)
            alert('Failed to fetch groups. Check console for error details.')
        }
    }
    useEffect(() => {
        fetchVehicles()
    }, [])

    return (
        <>
            <div>
                <h1>Vehicles</h1>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.id}>
                            <h2>Vehicle {vehicle.id}</h2>
                                <div key={vehicle.id}>
                                    {vehicle.model} ({vehicle.capacity}) {vehicle.color}
                                </div>
                            <a href={`/projects#project-${users.id}`} >
                                Assignment {group.assignmentId}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Groups
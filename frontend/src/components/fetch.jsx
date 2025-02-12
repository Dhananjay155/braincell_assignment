import  { useEffect, useState } from 'react'

function FetchData() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {   
                setUsers(data)
                setLoading(false);
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="loading">Loading...</div>
    }

    if (error) {
        return <div className="error">Error: {error}</div>
    }

    return (
        <div className="container">
            <h1>Users List</h1>
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            
            <div className="user-grid">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="user-card">
                        <h4>Name: <span>{user.name}</span></h4>
                        
                        <h4>Email: <span>{user.email}</span></h4>
                        
    
                    </div>
                ))}
            </div>
            
            {filteredUsers.length === 0 && (
                <p className="no-results">No users found</p>
            )}
        </div>
    )
}

export default FetchData
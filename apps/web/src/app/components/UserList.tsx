
import { useState, useEffect } from 'react';
import { getUsersList } from '../api/user-api';
import { User } from '@autotest-poc/api-contract';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsersList()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
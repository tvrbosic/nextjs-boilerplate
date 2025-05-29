'use client';
// LIBRARY
import { useEffect, useState } from 'react';

// APPLICATION
import { UserApiClient } from '@/api-clients/user/user-client';
import { useGlobalLoaderContext } from '@/context/global-loader/global-loader-context';

// TYPES
import { IGetUserDTO } from '@/app/api/v1/user/types';

const UsersTable = () => {
  const [users, setUsers] = useState<IGetUserDTO[]>([]);

  // ================================| UTILITY |================================ //
  const { isLoading, startLoader, stopLoader } = useGlobalLoaderContext();

  // ================================| EFFECTS |================================ //
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        startLoader();
        const response = await UserApiClient.instance.getUsers();
        setUsers(response.data!);
      } catch (error) {
        setUsers([]);
      } finally {
        stopLoader();
      }
    };
    fetchUsers();
  }, []);

  // =================================| RENDER |================================ //
  return (
    <table>
      <thead>
        <tr>
          <th>GUID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.guid}>
            <td>{user.guid}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;

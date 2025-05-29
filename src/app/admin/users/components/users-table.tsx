'use client';
// LIBRARY
import { useEffect, useState } from 'react';

// APPLICATION
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import { useGlobalLoaderContext } from '@/context/global-loader/global-loader-context';
import { UserApiClient } from '@/api-clients/user/user-client';

// TYPES
import { IGetUserDTO } from '@/app/api/v1/user/types';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

function UsersTable({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
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
        triggerGlobalError();
      } finally {
        stopLoader();
      }
    };
    fetchUsers();
  }, []);

  // =================================| RENDER |================================ //
  return (
    <table className="spacing-y-2 w-full table-auto border-separate overflow-hidden rounded-md">
      <thead className="bg-secondary text-main h-[48px]">
        <tr>
          <th>GUID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th />
        </tr>
      </thead>
      <tbody className="bg-tertiary/30 text-main">
        {users.map((user) => (
          <tr
            key={user.guid}
            className="border-tertiary/70 hover:bg-tertiary/20 border-b transition-colors duration-200"
          >
            <td className="px-6 py-4">{user.guid}</td>
            <td className="px-6 py-4">{user.firstName}</td>
            <td className="px-6 py-4">{user.lastName}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">CTRLS</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default withErrorBoundaryTrigger(UsersTable);

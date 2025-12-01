import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  //   Make admin and remove admin functions

  const handleMakeUser = (user, role) => {
    const roleInfo = { role: role };

    // Dynamic texts
    const isMakeAdmin = role === 'admin';
    const titleText = isMakeAdmin ? 'Grant admin access?' : 'Remove admin access?';
    const descriptionText = isMakeAdmin ? 'This user will receive full admin privileges.' : 'This user will lose all admin privileges.';
    const confirmButton = isMakeAdmin ? 'Confirm' : 'Remove';

    Swal.fire({
      title: titleText,
      text: descriptionText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButton,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: 'middle',
              title: `Role updated to "${role}"`,
              icon: 'success',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    handleMakeUser(user, 'admin');
  };

  const handleRejectAdmin = (user) => {
    handleMakeUser(user, 'user');
  };

  return (
    <div>
      <h2 className="text-4xl">Users : {users.length}</h2>
      <div>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>
                  <div className="text-sm opacity-50 bg-amber-400 w-12 text-center rounded-full">{user.role}</div>
                </td>
                <td>
                  {user.role === 'admin' ? (
                    <button onClick={() => handleRejectAdmin(user)} className="btn bg-red-300">
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-300">
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs"></button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;

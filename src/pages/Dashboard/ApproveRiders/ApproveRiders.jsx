import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Container/Container';
import { FaEye, FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    },
  });

  //   Approval Function
  const updateRiderStatus = (rider, status) => {
    const updatedInfo = { status: status, email: rider.riderEmail };
    axiosSecure
      .patch(`/riders/${rider._id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'middle',
            title: `Rider status is set to ${status}!`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, 'rejected');
  };

  return (
    <div>
      <h3>Riders Pending Approval : {riders.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Phone No</th>
              <th>NID</th>
              <th>Driving License</th>
              <th>Bike Brand & Year</th>
              <th>Bike Reg</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>
                  <p className={`${rider.status === 'approved' ? 'text-green-800 bg-green-300 text-center rounded-2xl' : 'text-red-500'}`}>
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>{rider.riderDistrict}</td>
                <td>{rider.riderPhone}</td>
                <td>{rider.riderNID}</td>
                <td>{rider.drivingLicense}</td>
                <td>{rider.bikeBrandModelYear}</td>
                <td>{rider.bikeRegNo}</td>
                <td>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaEye />
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button onClick={() => handleRejection(rider)} className="btn">
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;

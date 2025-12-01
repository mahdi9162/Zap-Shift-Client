import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Container from '../../../components/Container/Container';
import { MdEdit } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <Container>
      <section className="mt-10">
        <h2>this is my parcels - {parcels.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Tracking ID</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id}>
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {parcel.paymentStatus === 'paid' ? (
                      <span className="text-green-400">Paid</span>
                    ) : (
                      <button onClick={() => handlePayment(parcel)} className="btn btn-sm bg-[#caeb66]">
                        Pay
                      </button>
                    )}
                  </td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>
                    <button className="btn btn-square hover:bg-[#caeb66]">
                      <FaMagnifyingGlass />
                    </button>
                    <button className="btn btn-square hover:bg-[#caeb66] mx-2">
                      <MdEdit />
                    </button>
                    <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-square hover:bg-[#caeb66]">
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
};

export default MyParcels;

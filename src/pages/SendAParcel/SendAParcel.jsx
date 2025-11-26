import React from 'react';
import Container from '../../components/Container/Container';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendAParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const phoneNoPattern = /^(01)[3-9]\d{8}$/;
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((center) => center.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: `Total Cost: ৳${cost}`,
      html: '<b>Review carefully before continuing.</b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm Booking',
      cancelButtonText: 'Go Back',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Booking Confirmed',
          text: 'Your parcel has been submitted successfully.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <Container>
      <section className="bg-base-100 my-14 shadow-lg rounded-2xl px-28 py-20">
        <div>
          <h3 className="text-[#03373D] text-4xl font-bold mb-12">Send A Parcel</h3>
          <p className="text-[#03373D] text-2xl font-bold">Enter your parcel details</p>
        </div>
        <div className="divider"></div>
        {/* Form */}
        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* Radio / Parcel Type */}
          <div className="flex gap-5 mb-7">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  {...register('parcelType', { required: true })}
                  value="document"
                  className="radio checked:bg-[#0AB010] checked:text-white outline-gray-400 "
                  defaultChecked
                />
                Document
              </label>
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  {...register('parcelType', { required: true })}
                  value="non-document"
                  className="radio checked:bg-[#0AB010] checked:text-white outline-gray-400"
                />
                Non-Document
              </label>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
            {/* 1. Parcel Name - left */}
            <div className="space-y-1">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register('parcelName', { required: true })}
                placeholder="Parcel Name"
                className="input input-bordered w-full"
              />
            </div>
            {/* 2. Parcel Weight  - right */}
            <div className="space-y-1">
              <label className="label">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register('parcelWeight', { required: true })}
                placeholder="Parcel Weight (KG)"
                className="input input-bordered w-full"
              />
            </div>
            {/* Divider */}
            <div className="divider col-span-2"></div>

            {/* 3. Sender Details - Left Side Column */}
            <div className="">
              <h4 className="text-lg font-bold">Sender Details</h4>
              {/* Sender Name */}
              <label className="label mt-4 mb-1">Sender Name</label>
              <input
                type="text"
                {...register('senderName', { required: true })}
                placeholder="Sender Name"
                className="input input-bordered w-full"
              />
              {/* Sender Email */}
              <label className="label mt-4 mb-1">Sender Email</label>
              <input
                type="email"
                {...register('senderEmail', { required: true })}
                placeholder="Sender Email"
                className="input input-bordered w-full"
              />
              {/*Sender Address */}
              <label className="label mt-4 mb-1">Sender Address</label>
              <input
                type="text"
                {...register('senderAddress', { required: true })}
                placeholder="Sender Address"
                className="input input-bordered w-full"
              />
              {/* Sender Phone No */}
              <label className="label mt-4 mb-1">Sender Phone No</label>
              <input
                type="tel"
                {...register('senderPhone', { required: true, pattern: phoneNoPattern, maxLength: 11, minLength: 11 })}
                className="input input-bordered outline-black border-black/20 validator tabular-nums block w-full"
                placeholder="Sender Phone No"
              />
              {errors.senderPhone?.type === 'required' && <p className="text-red-600 text-xs mt-1">Phone Number is Required</p>}

              {/* Sender Region */}
              <label className="label mt-4 mb-1">Sender Region</label>
              <select {...register('senderRegion', { required: true })} className="select select-bordered w-full" defaultValue="">
                <option disabled value="">
                  Pick a Region
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* Sender District */}
              <label className="label mt-4 mb-1">Sender District</label>
              <select {...register('senderDistrict', { required: true })} className="select select-bordered w-full" defaultValue="">
                <option disabled value="">
                  Select Sender District
                </option>
                {districtsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            {/* 4. Receiver Details - Right Side Column */}
            <div className="">
              <h4 className="text-lg font-bold">Receiver Details</h4>
              {/* Receiver Name */}
              <label className="label mt-4 mb-1">Receiver Name</label>
              <input
                type="text"
                {...register('receiverName', { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />
              {/* Receiver Email */}
              <label className="label mt-4 mb-1">Receiver Email</label>
              <input
                type="email"
                {...register('receiverEmail', { required: true })}
                placeholder="Receiver Email"
                className="input input-bordered w-full"
              />
              {/*Receiver Address */}
              <label className="label mt-4 mb-1">Receiver Address</label>
              <input
                type="text"
                {...register('receiverAddress', { required: true })}
                placeholder="Receiver Address"
                className="input input-bordered w-full"
              />
              {/* Receiver Phone No */}
              <label className="label mt-4 mb-1">Receiver Phone No</label>
              <input
                type="tel"
                {...register('receiverPhone', { required: true, pattern: phoneNoPattern, maxLength: 11, minLength: 11 })}
                className="input input-bordered outline-black border-black/20 validator tabular-nums block w-full"
                placeholder="Receiver Phone No"
              />
              {errors.receiverPhone?.type === 'required' && <p className="text-red-600 text-xs mt-1">Phone Number is Required</p>}

              {/* Receiver Region */}
              <label className="label mt-4 mb-1">Receiver Region</label>
              <select {...register('receiverRegion', { required: true })} className="select select-bordered w-full" defaultValue="">
                <option disabled value="">
                  Pick a Region
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* Receiver District */}
              <label className="label mt-4 mb-1">Receiver District</label>
              <select {...register('receiverDistrict', { required: true })} className="select select-bordered w-full" defaultValue="">
                <option disabled value="">
                  Select Receiver District
                </option>
                {districtsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            {/* 5. Pickup & Delivery Instruction */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Pickup instruction */}
              <div className="space-y-1">
                <label className="label">Pickup Instruction</label>
                <textarea
                  {...register('pickupInstruction', { required: true })}
                  placeholder="Pickup Instruction"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              {/* Delivery instruction */}
              <div className="space-y-1">
                <label className="label">Delivery Instruction</label>
                <textarea
                  {...register('deliveryInstruction', { required: true })}
                  placeholder="Delivery Instruction"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </div>
          </div>
          {/* 6. Footer */}
          <div className="mt-12 mb-36 md:col-span-2">
            <p className="text-sm text-gray-500 mb-4">* PickUp Time 4pm-7pm Approx.</p>
            <button className="mt-2 btn bg-[#CAEB66] text-[#03373D] border-0 px-8">Proceed to Confirm Booking</button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default SendAParcel;

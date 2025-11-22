import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { FaLocationArrow } from 'react-icons/fa6';
import { FaHandshake } from 'react-icons/fa';
import Container from '../../../components/Container/Container';

const HowItWorks = () => {
  const workSteps = [
    {
      id: 1,
      title: 'Booking Pick & Drop',
      description:
        'From personal packages to business shipments — we deliver on time, every time. Experience fast, reliable service with real-time tracking.',
      icon: <FaShippingFast />,
    },
    {
      id: 2,
      title: 'Cash On Delivery (COD)',
      description:
        'Securely manage all your transactions with our flexible Cash On Delivery option. We ensure quick and verified payment collection for every parcel.',
      icon: <MdOutlinePayment />,
    },
    {
      id: 3,
      title: 'Dedicated Delivery Hub',
      description:
        'Leverage our vast network of local delivery hubs for quicker dispatch and organized collection. Your parcels always take the shortest route to the destination.',
      icon: <FaLocationArrow />,
    },
    {
      id: 4,
      title: 'Booking SME & Corporate',
      description:
        'Tailored logistics solutions for small to large enterprises. Get dedicated account management and special discounted rates for bulk and regular shipments.',
      icon: <FaHandshake />,
    },
  ];

  return (
    <section className='my-20'>
      <Container>
        <div>
          <h3 className='text-[#03373D] font-bold text-3xl mb-5'>How it Works</h3>
          <div className="grid grid-cols-4 gap-4">
            {workSteps.map((workStep) => (
              <div
                key={workStep.id}
                className="p-8 bg-base-200 rounded-2xl text-center transition-all duration-700 hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary/10">{workStep.icon}</div>
                <h3 className="text-xl font-bold text-[#03373D] mb-3">{workStep.title}</h3>
                <p className="text-sm text-[#606060]">{workStep.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;

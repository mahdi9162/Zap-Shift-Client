import React from 'react';
import liveParcelImg from '../../../../assets/live-tracking.png';
import safeDeliveryImg from '../../../../assets/safe-delivery.png';
import callSupportImg from '../../../../assets/callSupport.png';
import Container from '../../../components/Container/Container';

const Features = () => {
  const featureData = [
    {
      id: 1,
      title: 'Live Parcel Tracking',
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      icon: liveParcelImg,
    },
    {
      id: 2,
      title: '100% Safe Delivery',
      description:
        'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
      icon: safeDeliveryImg,
    },
    {
      id: 3,
      title: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
      icon: callSupportImg,
    },
  ];
  return (
    <Container>
      <section className="my-24">
        <div className="grid gap-6 ">
          {featureData.map((feature) => (
            <div key={feature.id} className="flex gap-12 items-center bg-white p-8 feature-box rounded-2xl">
              <figure className="w-40 shrink-0 border-r border-dashed border-gray-400 pr-12">
                <img className="h-full w-full object-contain" src={feature.icon} alt="" />
              </figure>
              <div>
                <h3 className="font-bold mb-4">{feature.title}</h3>
                <p className="text-sm w-96">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Features;

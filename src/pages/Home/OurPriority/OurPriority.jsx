import React from 'react';
import Container from '../../../components/Container/Container';
import image from '../../../../assets/location-merchant.png';
import gradientColor from '../../../../assets/be-a-merchant-bg.png';

const OurPriority = () => {
  return (
    <Container>
      <section className="bg-[#03373D] p-20 rounded-3xl my-24 bg-no-repeat" style={{ backgroundImage: `url(${gradientColor})` }}>
        <div className="flex">
          {/* left */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-4xl mb-4 leading-12">Merchant and Customer Satisfaction is Our First Priority</h3>
            <p className="text-[#DADADA] w-2xl mb-8">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers
              your parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex gap-5">
              <button className="btn py-4 px-6 bg-[#CAEB66] rounded-full border-none">Become a Merchant</button>
              <button className="outline outline-[#CAEB66] px-4 text-[#CAEB66] rounded-full text-sm cursor-pointer hover:bg-[#CAEB66] hover:text-black font-medium hover:outline-0 transition-all duration-700">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>
          {/* Right */}
          <div>
            <img src={image} alt="" />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default OurPriority;

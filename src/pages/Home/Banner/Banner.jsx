import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Banner1 from '../../../../assets/banner/banner1.png';
import Banner2 from '../../../../assets/banner/banner2.png';
import Banner3 from '../../../../assets/banner/banner3.png';
import Container from '../../../components/Container/Container';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

export class Banner extends Component {
  render() {
    return (
      <>
        <Container>
          <Carousel autoPlay={true} infiniteLoop={true}>
            <div className="relative">
              <img src={Banner1} />
              <div className="absolute bottom-20 left-20 flex justify-center">
                <button className="btn bg-[#caeb66] rounded-full px-8">Track Your Parcel</button>
                <BsArrowUpRightCircleFill size={30} className="h-10 mr-4" />
                <button className="btn border bg-transparent rounded-2xl px-6 hover:bg-[#caeb66] duration-500 transition-colors">Be a Rider</button>
              </div>
            </div>
            <div>
              <img src={Banner2} />
            </div>
            <div>
              <img src={Banner3} />
            </div>
          </Carousel>
        </Container>
      </>
    );
  }
}

export default Banner;

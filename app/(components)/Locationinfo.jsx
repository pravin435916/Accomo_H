'use client'
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { useState } from 'react';

const Locationinfo = ({ hostel,onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Do not render the component if it's not visible
  }
    function SampleArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block",backgroundColor:"gray" ,borderRadius:"60%"}}
            onClick={onClick}
          />
        );
      }
     
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleArrow />,
        prevArrow: <SampleArrow />
      };
      const data = [
    
        {
          img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          img: "https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    return (
                <div className='main h-[100vh] w-[30vw] absolute z-50 top-0 left-0  bg-white m-auto '>
                  <div className='h-10 flex justify-end  '>
                    <IconButton aria-label="close" onClick={onClose}>
                      <CloseIcon  />
                    </IconButton>
                  </div>
                  <div className='h-[30vh] w-[90%]    m-auto'>
                    <Slider {...settings}>
                      {
                        data.map((image) => {
                          return <img className='h-[30vh]' src={image.img} alt="" />
                        })
                      }
                    </Slider>
                  </div>
                  <div className='h-10 pt-3 '>
                    <h1 className='text-center font-sans font-extrabold text-2xl py-2 '>{hostel.name}</h1>
                  </div>
                  <div className='border-t-2 border-b-2 border-zinc-200 my-3 rounded-e-lg rounded-s-lg py-2 mt-4'>
                    <div className='flex justify-center'>
                      <div className='flex flex-col items-center justify-center pr-8 cursor-pointer'>
                        <AssistantDirectionRoundedIcon color="primary" fontSize="large" />
                        <p>Directions</p>
                      </div>
                      <div className='flex flex-col items-center justify-center pl-8 cursor-pointer'>
                        <ShareRoundedIcon color="primary" fontSize="large" />
                        <p>Share</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex justify-center'>
                    <table className="min-w-full text-left text-sm font-light">
                      <thead
                        className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
            
                          <th scope="col" className="px-6 py-4">Details</th>
                          <th scope="col" className="px-6 py-4">Description</th>
            
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
            
                          <td className="whitespace-nowrap px-6 py-4">Hostel Capacity</td>
                          <td className="whitespace-nowrap px-6 py-4">{hostel.totalRooms}</td>
            
                        </tr>
                        <tr
                          className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
            
                          <td className="whitespace-nowrap px-6 py-4">Vacancy</td>
                          <td className="whitespace-nowrap px-6 py-4">{hostel.vacantSeats}</td>
            
                        </tr>
                        <tr
                          className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
            
                          <td className="whitespace-nowrap px-6 py-4">Mobile Number</td>
                          <td className="whitespace-nowrap px-6 py-4">{hostel.mobileNumber}</td>
            
                        </tr>
                        <tr
                          className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
            
                          <td className="whitespace-nowrap px-6 py-4">Room Type</td>
                          <td className="whitespace-nowrap px-6 py-4">{hostel.roomType}</td>
            
                        </tr>
                        <tr
                          className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
            
                          <td className="whitespace-nowrap px-6 py-4">Price</td>
                          <td className="whitespace-nowrap px-6 py-4">{hostel.price}</td>
            
                        </tr>
            
                      </tbody>
                    </table>
                  </div>
                </div>
    );
};

export default Locationinfo;

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
    return (
        <div className='w-full max-w-7xl mx-auto mt-10 border border-lime-300 rounded-2xl shadow-lg py-6 px-4'>
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={true}
                interval={6000}
                transitionTime={1000}
            >
                {[  // Array of image data for cleaner code
                    {
                        src: "https://i.ibb.co/bj5bnR7Y/652449-16329385-2940611-2faac412-image.jpg",
                        alt: "Banner 1",
                        legend: "Get Paid for Your Skills"
                    },
                    {
                        src: "https://i.ibb.co/S70Zhzq3/seo-7472882-1280.png",
                        alt: "Banner 2",
                        legend: "Task, Earn, Repeat"
                    },
                    {
                        src: "https://i.ibb.co/ZyDMpCN/network-3885327-1280.jpg",
                        alt: "Banner 3",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/60pmHMsY/entrepreneur-4664726-1280-1.jpg",
                        alt: "Banner 4",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/TxKgYvBG/man-6494289-1280.jpg",
                        alt: "Banner 5",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/hRRN0Rcr/secretary-338561-1280.jpg",
                        alt: "Banner 6",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/ycLjtgXs/male-7090164-1280.jpg",
                        alt: "Banner 7",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/WpVhHMPW/office-625892-1280.jpg",
                        alt: "Banner 8",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/WpVhHMPW/office-625892-1280.jpg",
                        alt: "Banner 9",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/jdXVzZS/workplace-4155023-1280.jpg",
                        alt: "Banner 10",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/jdXVzZS/workplace-4155023-1280.jpg",
                        alt: "Banner 11",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/jC6PYQ2/working-3406785-1280.jpg",
                        alt: "Banner 12",
                        legend: "Be a TaskNinja Today"
                    },
                    {
                        src: "https://i.ibb.co/S70Zhzq3/seo-7472882-1280.png",
                        alt: "Banner 13",
                        legend: "Be a TaskNinja Today"
                    },
                ].map(({ src, alt, legend }, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden">
                        {/* Image */}
                        <img
                            className="h-100 object-cover rounded-xl"
                            src={src}
                            alt={alt}
                        />
                        {/* Black overlay */}
                        <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
                        {/* Legend text - appears above overlay */}
                        <p className="legend relative z-10">{legend}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;

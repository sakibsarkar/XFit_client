import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
export const RenderNewLine = ({ text }: { text: string }) => {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
export function HeroSection() {
  const sliderData = [
    {
      id: 1,
      image: "/images/slider3.webp",
      heading: "Stylish\nHand Arm",
      desc: "Discover top-tier fitness equipment designed to take your workouts to the next level. From cardio machines to strength training essentials, we have everything you need to achieve your fitness goals.",
    },
    {
      id: 2,
      image: "/images/slider2.webp",
      heading: "Elevate Your\nFitness Journey",
      desc: "Discover top-tier fitness equipment designed to take your workouts to the next level. From cardio machines to strength training essentials, we have everything you need to achieve your fitness goals.",
    },
    {
      id: 3,
      image: "/images/slider1.webp",
      heading: "Gear Up for\nSuccess",
      desc: "Discover top-tier fitness equipment designed to take your workouts to the next level. From cardio machines to strength training essentials, we have everything you need to achieve your fitness goals.",
    },
  ];

  return (
    <div className="relative w-full mt-6">
      <Carousel
        className=" overflow-hidden rounded-lg shadow-lg h-[250px] sm:h-[300px] lg:h-[500px]"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-full p-0 w-full">
                  <div
                    className="relative w-full h-[250px] sm:h-[300px] lg:h-[500px] hover:scale-[1.03]"
                    style={{ transition: "0.3s" }}
                  >
                    <img
                      src={slider.image}
                      className="absolute z-[1]  top-0 left-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      alt=""
                    />

                    <div className="relative z-10 w-full h-full flex items-start flex-col justify-center pl-[50px] bg-[#00000011] gap-[5px]">
                      <h1 className="text-[20px] sm:text-[30px] lg:text-[60px] font-[700] text-white">
                        <RenderNewLine text={slider.heading} />
                      </h1>
                      <p className="max-w-[550px] text-white text-[12px] sm:text-[14px] lg:text-[16px]">
                        {slider.desc}
                      </p>
                      <Link
                        to={"/"}
                        className="px-[20px] border-[1px] border-white py-[5px] text-white mt-[20px]"
                      >
                        Shop Npw
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}

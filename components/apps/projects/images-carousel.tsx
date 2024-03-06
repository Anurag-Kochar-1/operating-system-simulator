import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  images: {
    src: string;
    title: string;
    description?: string;
  }[];
};

export const ProjectImagesCarousel = ({ images }: Props) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="mx-auto w-[95%]"
    >
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem
            key={index}
            className="relative hover:cursor-pointer lg:basis-9/12 2xl:basis-1/2 overflow-hidden"
          >
            <Image
              src={item.src}
              alt={`project-image - ${item.title}`}
              width={800}
              height={800}
              className="h-full w-full border-2 object-contain aspect-video"
            />
            <div className="absolute bottom-0 flex w-full flex-col items-start justify-start bg-gradient-to-b from-transparent to-foreground dark:to-background p-4 md:p-6">
              <span className="md:text-lg font-semibold text-secondary dark:text-secondary-foreground">
                {item.title}
              </span>
              {item.description ? <p className="hidden md:flex text-sm text-secondary/80 dark:text-secondary-foreground/80 w-full md:w-[80%]">
                {item.description}{" "}
              </p> : null} 
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

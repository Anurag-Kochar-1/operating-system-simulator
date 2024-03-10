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
            className="relative overflow-hidden hover:cursor-pointer basis-10/12 lg:basis-9/12 2xl:basis-1/2"
          >
            <Image
              src={item.src}
              alt={`project-image - ${item.title}`}
              width={800}
              height={800}
              className="aspect-video h-full w-full border-2 object-cover"
            />
            <div className="absolute bottom-0 flex w-full flex-col items-start justify-start bg-gradient-to-b from-transparent to-foreground p-4 dark:to-background md:p-6">
              <span className="font-semibold text-secondary dark:text-secondary-foreground md:text-lg">
                {item.title}
              </span>
              {item.description ? (
                <p className="hidden w-full text-sm text-secondary/80 dark:text-secondary-foreground/80 md:flex md:w-[80%]">
                  {item.description}{" "}
                </p>
              ) : null}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DummyProject() {
  return (
    <div className="py4 flex w-full flex-col items-start justify-start gap-12">
      {/* ========== Carousel ========== */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* ========== Links ========== */}
      <div className="flex w-full items-center justify-center gap-4">
        <Button variant={"secondary"}>Source code </Button>
        <Button>Live Site </Button>
      </div>

      {/* ========== Tech stack ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Tech stack used </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
      <Separator className="w-full" />
      {/* ========== Overview ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Overview </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
      <Separator className="w-full" />
      {/* ========== Goals ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Goals </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
      <Separator className="w-full" />
      {/* ========== Design ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Design </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
      <Separator className="w-full" />
      {/* ========== Development ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Development </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
      <Separator className="w-full" />
      {/* ========== Challenges ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Challenges </h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          cupiditate! Consectetur, veniam doloribus perspiciatis repellendus
          inventore dolores, odit a voluptate corrupti possimus, ab dicta animi
          iste vitae non quam. Consequatur sint enim maxime temporibus, ea
          recusandae omnis repudiandae magni vero consequuntur quia, ex possimus
          facere hic similique dolorum voluptates cupiditate distinctio corrupti
          sed veritatis architecto. Optio voluptate facilis modi fuga, fugiat
          ipsa rerum incidunt beatae animi quam facere excepturi accusamus
          numquam, pariatur dolorem, repellat temporibus! Corrupti in,
          laudantium sint error architecto, voluptatem cupiditate officia
          possimus quisquam deleniti dolores doloremque soluta fugiat molestias
          fuga necessitatibus. Expedita magni distinctio iusto eius in?
        </p>
      </div>
    </div>
  );
}

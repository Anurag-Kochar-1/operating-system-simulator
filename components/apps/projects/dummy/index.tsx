import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectImagesCarousel } from "../images-carousel";

export function DummyProject() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-12 py-4">
      <ProjectImagesCarousel
        images={[
          {
            src: "/images/project-images/system-design-puzzles/demo.jpeg",
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veritatis ullam repudiandae eveniet magni ipsam unde fugiat eos odio voluptates.",
          },
          {
            src: "/images/project-images/system-design-puzzles/demo.jpeg",
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veritatis ullam repudiandae eveniet magni ipsam unde fugiat eos odio voluptates.",
          },
          {
            src: "/images/project-images/system-design-puzzles/demo.jpeg",
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veritatis ullam repudiandae eveniet magni ipsam unde fugiat eos odio voluptates.",
          },
          {
            src: "/images/project-images/system-design-puzzles/demo.jpeg",
            title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veritatis ullam repudiandae eveniet magni ipsam unde fugiat eos odio voluptates.",
          },
        ]}
      />

      {/* ========== Links ========== */}
      <div className="flex w-full items-center justify-center gap-4">
        <Button variant={"secondary"}>Source code </Button>
        <Button>Live Site </Button>
      </div>

      {/* ========== Tech stack ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Tech stack used </h3>
      </div>
      <Separator className="w-full" />
      {/* ========== Features ========== */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="text-2xl font-semibold"> Features </h3>
        <ul className="flex list-disc flex-col gap-2 [&>li]:ml-4">
          <li className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            distinctio..
          </li>
          <li className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            distinctio.
          </li>
          <li className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            distinctio.
          </li>
        </ul>
      </div>
    </div>
  );
}

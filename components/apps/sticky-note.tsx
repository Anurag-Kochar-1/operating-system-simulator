import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  X,
  Plus,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  StrikethroughIcon,
  Palette,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COLORS = [
  {
    bg: "bg-amber-500",
    dark: "bg-amber-500",
    header: "bg-yellow-300",
    darkHeader: "bg-yellow-900/50",
    text: "text-black",
    darkText: "text-black",
  },
  {
    bg: "bg-blue-900",
    dark: "bg-blue-900",
    header: "bg-blue-300",
    darkHeader: "bg-blue-900/50",
    text: "text-black",
    darkText: "text-white",
  },
  {
    bg: "bg-green-900",
    dark: "bg-green-900",
    header: "bg-green-300",
    darkHeader: "bg-green-900/50",
    text: "text-black",
    darkText: "text-white",
  },
  {
    bg: "bg-red-900",
    dark: "bg-red-900",
    header: "bg-red-300",
    darkHeader: "bg-red-900/50",
    text: "text-black",
    darkText: "text-white",
  },
  {
    bg: "bg-purple-900",
    dark: "bg-purple-900",
    header: "bg-purple-300",
    darkHeader: "bg-purple-900/50",
    text: "text-black",
    darkText: "text-white",
  },
];

export const StickyNotesAppContent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedColor, setSelectedColor] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
      }),
      Underline,
      BulletList,
      ListItem,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content: "<p>Hey there 👋 </p>",
    autofocus: "end",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none max-w-none [&>ul]:list-disc [&>ul]:pl-4" +
          (isDark
            ? COLORS[selectedColor].darkText
            : COLORS[selectedColor].text),
      },
    },
  });

  const MenuButton = ({
    onClick,
    isActive,
    children,
  }: {
    onClick: () => void;
    isActive: boolean | undefined;
    children: JSX.Element;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 hover:bg-foreground/30 ${
        isActive ? "bg-foreground text-background" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <Card
      className={`size-80 rounded-none shadow-lg
      ${isDark ? COLORS[selectedColor].dark : COLORS[selectedColor].bg}`}
    >
      <div className="h-full max-h-[calc(20rem-3.6rem)] overflow-auto p-4">
        <EditorContent editor={editor} />
      </div>

      <div
        className={`${COLORS[selectedColor].bg} z-10 flex h-14 w-full flex-wrap items-center gap-2 border-t border-border/20 p-2`}
      >
        <MenuButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline")}
        >
          <UnderlineIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </MenuButton>
        <Separator orientation="vertical" className="h-6 bg-border/20" />
        <MenuButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-foreground/30"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2">
            <div className="flex gap-2">
              {COLORS.map((color, index) => (
                <button
                  key={index}
                  className={`aspect-square size-8 rounded ${isDark ? color.dark : color.bg} 
                      hover:ring-2 hover:ring-offset-2 ${index === selectedColor ? "ring-2 ring-offset-2" : ""}`}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};

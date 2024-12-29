import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import {
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useGetAllStickyNotes,
  useUpdateStickyNote,
} from "@/hooks/use-sticky-notes";
import { MenuButton } from "./menu-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAutoSaveStickyNote } from "@/hooks/use-auto-save-sticky-note";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STICKY_NOTE_THEMES } from "@/constants/sticky-note-palette";
import { StickyNoteTheme } from "@/types";

export const StickyNotesAppContent = () => {
  const {
    data: stickyNotes,
    isLoading: isStickyNotesLoading,
    error: stickyNotesError,
    isError: isStickyNotesError,
  } = useGetAllStickyNotes();
  const firstStickyNote = stickyNotes?.data?.[0];
  const firstNoteTheme = STICKY_NOTE_THEMES.find(
    (item) => item.id === firstStickyNote?.theme,
  );
  const [currentTheme, setCurrentTheme] = useState<StickyNoteTheme>(
    STICKY_NOTE_THEMES[0],
  );

  const { mutateAsync: updateColorAsync } = useUpdateStickyNote();
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
    autofocus: "end",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none max-w-none [&>ul]:list-disc [&>ul]:pl-4",
      },
    },
    onUpdate: ({ editor }) => {
      updateData({ content: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (stickyNotes?.data?.length) {
      const firstNote = stickyNotes?.data?.[0];
      editor?.commands.setContent(firstNote?.content || "<p>Hey there 👋 </p>");
      const theme = STICKY_NOTE_THEMES.find(
        (item) => item.id === firstNote?.theme,
      );
      if (theme) {
        setCurrentTheme(theme);
      }
    }
    return () => {
      editor?.destroy();
    };
  }, [editor, stickyNotes]);

  const { updateData, lastSavedAt } = useAutoSaveStickyNote({
    initialData: firstStickyNote
      ? {
          id: firstStickyNote.id,
          content: firstStickyNote.content,
        }
      : null,
    enabled: Boolean(firstStickyNote?.id),
  });

  const updateColor = async (theme: StickyNoteTheme) => {
    if (!firstStickyNote) return;
    setCurrentTheme(theme);
    try {
      await updateColorAsync({
        id: firstStickyNote.id,
        theme: theme.id,
      });
    } catch (error) {}
  };

  return (
    <Card
      className={`size-80 rounded-none shadow-lg`}
      style={{
        backgroundColor: currentTheme?.backgroundColor,
      }}
    >
      <div className="h-full max-h-[calc(20rem-3.6rem)] overflow-auto px-6 py-4">
        {isStickyNotesLoading ? (
          <div className="h-[calc(20rem-6rem)] space-y-2 overflow-hidden">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-full animate-pulse rounded-sm bg-black/20"
              />
            ))}
          </div>
        ) : isStickyNotesError ? (
          <Alert
            variant="destructive"
            className="flex flex-col items-center gap-6 border-none"
          >
            <AlertDescription>
              Failed to load sticky notes {stickyNotesError?.message ?? ""}
            </AlertDescription>
          </Alert>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      <div
        className={`z-10 flex h-14 w-full flex-wrap items-center gap-2 border-t border-border/20 p-2`}
        style={{
          backgroundColor: currentTheme?.backgroundColor,
        }}
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
              {STICKY_NOTE_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`aspect-square size-8 rounded
                      hover:ring-2 hover:ring-offset-2 ${theme.id === currentTheme.id ? "ring-2 ring-offset-2" : ""}`}
                  onClick={() => {
                    updateColor(theme);
                  }}
                  style={{ backgroundColor: theme.backgroundColor }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {lastSavedAt ? (
          <Tooltip>
            <TooltipTrigger>
              <CheckCheck
                size={20}
                className="text-green-400 hover:text-gray-500"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Last saved - {lastSavedAt}</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    </Card>
  );
};

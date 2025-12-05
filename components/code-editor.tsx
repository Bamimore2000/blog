// components/MediumEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { BubbleMenu } from "@tiptap/react/menus";  // 👈 correct path

import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { CharacterCount } from "@tiptap/extensions";
import { common, createLowlight } from "lowlight";

import {
  Bold,
  Italic,
  Link2,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Image as ImageIcon,
  Underline as UnderlineIconLucide,
  Code,
  Table as TableIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useCallback } from "react";
import { convertAndUploadWebP } from "@/app/actions/webp";

const lowlight = createLowlight(common);

export default function MediumEditor() {
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Placeholder.configure({ placeholder: "Tell your story... (Try typing '/' for commands)" }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
      }),
      Image.configure({
        HTMLAttributes: { class: "max-w-full h-auto rounded-lg my-6" },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "border-collapse table-auto w-full my-4" },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: { class: "border border-gray-300 bg-gray-100 px-4 py-2 font-bold" },
      }),
      TableCell.configure({
        HTMLAttributes: { class: "border border-gray-300 px-4 py-2" },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: { class: "bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto" },
      }),
      CharacterCount,
    ],
    content: `<h1>Your Story Title</h1><p>Start writing...</p>`,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none px-8 py-12",
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            uploadImage(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith("image/")) {
            event.preventDefault();
            const file = items[i].getAsFile();
            if (file) uploadImage(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      debouncedAutoSave(editor.getHTML());
      detectSlashCommand();
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        setIsLinkMode(false);
      }
      detectSlashCommand();
    },
  });

  // Auto-save functionality
  const autoSave = useCallback((content: string) => {
    setSaveStatus("saving");
    try {
      localStorage.setItem("draft-content", content);
      localStorage.setItem("draft-timestamp", new Date().toISOString());
      setLastSaved(new Date());
      setSaveStatus("saved");
    } catch (err) {
      console.error("Auto-save failed:", err);
      setSaveStatus("unsaved");
    }
  }, []);

  const debouncedAutoSave = useCallback(
    (() => {
      let timeout: NodeJS.Timeout;
      return (content: string) => {
        clearTimeout(timeout);
        setSaveStatus("unsaved");
        timeout = setTimeout(() => autoSave(content), 1000);
      };
    })(),
    [autoSave]
  );

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("draft-content");
    const savedTimestamp = localStorage.getItem("draft-timestamp");
    
    if (savedContent && editor) {
      editor.commands.setContent(savedContent);
      if (savedTimestamp) {
        setLastSaved(new Date(savedTimestamp));
      }
    }
  }, [editor]);

  // Slash command detection
  const detectSlashCommand = () => {
    if (!editor) return;

    const { from } = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 10), from, "\n", "\n");
    
    if (textBefore.endsWith("/")) {
      const coords = editor.view.coordsAtPos(from);
      setSlashMenuPosition({ top: coords.bottom, left: coords.left });
      setShowSlashMenu(true);
    } else {
      setShowSlashMenu(false);
    }
  };

  const executeSlashCommand = (command: string) => {
    if (!editor) return;

    // Remove the slash
    const { from } = editor.state.selection;
    editor.chain().focus().deleteRange({ from: from - 1, to: from }).run();

    switch (command) {
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "quote":
        editor.chain().focus().toggleBlockquote().run();
        break;
      case "code":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "bullet":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "numbered":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "table":
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        break;
      case "image":
        document.getElementById("image-upload")?.click();
        break;
    }

    setShowSlashMenu(false);
  };

  const uploadImage = async (file: File) => {
    if (!editor) return;
  
    // Instant local preview
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result as string }).run();
    };
    reader.readAsDataURL(file);
  
    try {
      // Call Server Action
      const cloudUrl = await convertAndUploadWebP(file);
  
      // Insert the uploaded WebP image
      editor.chain().focus().setImage({ src: cloudUrl }).run();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  if (!editor) return null;

  const applyLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
    setIsLinkMode(false);
  };

  const hasSelection = editor.state.selection.from !== editor.state.selection.to;
  const stats = editor.storage.characterCount || { characters: () => 0, words: () => 0 };

  return (
    <div className=" bg-background">
      {/* Header */}
      <header className="border-b sticky top-[50px] bg-background z-40">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
    {/* Title */}
    <h1 className="text-xl sm:text-2xl font-bold">Draft in StateCraft</h1>

    {/* Actions */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
      {/* Save status */}
      <span className="text-sm text-gray-500">
        {saveStatus === "saving" && "Saving..."}
        {saveStatus === "saved" && lastSaved && `Saved ${formatTimeAgo(lastSaved)}`}
        {saveStatus === "unsaved" && "Unsaved changes"}
      </span>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => autoSave(editor.getHTML())}
        >
          Save draft
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          Publish
        </Button>
      </div>
    </div>
  </div>
</header>


      {/* Editor */}
      <div className="max-w-3xl mx-auto relative">
        <EditorContent editor={editor} />

        {/* Bubble Menu */}
        <BubbleMenu
          editor={editor}
        //   tippyOptions={{ duration: 100 }}
          className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-2"
        >
          <div className="flex items-center gap-1">
            {!isLinkMode ? (
              <>
                <Button
                  size="icon"
                  variant={editor.isActive("bold") ? "secondary" : "ghost"}
                  className={`h-9 w-9 text-white hover:bg-gray-700 ${
                    editor.isActive("bold") ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant={editor.isActive("italic") ? "secondary" : "ghost"}
                  className={`h-9 w-9 text-white hover:bg-gray-700 ${
                    editor.isActive("italic") ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant={editor.isActive("underline") ? "secondary" : "ghost"}
                  className={`h-9 w-9 text-white hover:bg-gray-700 ${
                    editor.isActive("underline") ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIconLucide className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 bg-gray-700 mx-1" />

                <Button
                  size="icon"
                  variant={editor.isActive("link") ? "secondary" : "ghost"}
                  className={`h-9 w-9 text-white hover:bg-gray-700 ${
                    editor.isActive("link") ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => {
                    const previousUrl = editor.getAttributes("link").href;
                    setLinkUrl(previousUrl || "");
                    setIsLinkMode(true);
                  }}
                >
                  <Link2 className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant={editor.isActive("code") ? "secondary" : "ghost"}
                  className={`h-9 w-9 text-white hover:bg-gray-700 ${
                    editor.isActive("code") ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="url"
                  placeholder="Enter URL..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="h-9 w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applyLink();
                    if (e.key === "Escape") setIsLinkMode(false);
                  }}
                />
                <Button size="sm" onClick={applyLink} className="text-white">
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white"
                  onClick={() => {
                    setIsLinkMode(false);
                    setLinkUrl("");
                    editor.commands.focus();
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </BubbleMenu>

        {/* Slash Command Menu */}
        {showSlashMenu && (
          <div
            className="fixed z-50  rounded-lg shadow-xl py-2 w-64"
            style={{ top: slashMenuPosition.top + 5, left: slashMenuPosition.left }}
          >
            <div className="px-3 py-2 text-xs font-semibold uppercase">Insert</div>
            {[
              { icon: <Heading1 className="h-4 w-4" />, label: "Heading 1", command: "h1" },
              { icon: <Heading2 className="h-4 w-4" />, label: "Heading 2", command: "h2" },
              { icon: <Heading3 className="h-4 w-4" />, label: "Heading 3", command: "h3" },
              { icon: <Type className="h-4 w-4" />, label: "Quote", command: "quote" },
              { icon: <Code className="h-4 w-4" />, label: "Code Block", command: "code" },
              { icon: <List className="h-4 w-4" />, label: "Bullet List", command: "bullet" },
              { icon: <ListOrdered className="h-4 w-4" />, label: "Numbered List", command: "numbered" },
              { icon: <TableIcon className="h-4 w-4" />, label: "Table", command: "table" },
              { icon: <ImageIcon className="h-4 w-4" />, label: "Image", command: "image" },
            ].map((item) => (
              <button
                key={item.command}
                className="w-full px-3 py-2 flex items-center gap-3  text-left"
                onClick={() => executeSlashCommand(item.command)}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Toolbar at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-2" />

            <Button
              size="icon"
              variant="ghost"
              onClick={() => document.getElementById("image-upload")?.click()}
              disabled={uploading}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              }
            >
              <TableIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            {stats.words()} words · {stats.characters()} characters
          </div>
        </div>
      </div>

      <div className="h-16" /> {/* Spacer for fixed toolbar */}
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
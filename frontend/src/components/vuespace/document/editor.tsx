import React, { useMemo, useState, useCallback } from "react";
import {
    createEditor,
    Descendant,
    Editor,
    Transforms,
    Element as SlateElement,
    BaseEditor,
    Range,
} from "slate";
import {
    Slate,
    Editable,
    withReact,
    ReactEditor,
    RenderElementProps,
    RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import {
    Bold,
    Italic,
    Underline,
    Code,
    Quote,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
    Undo,
    Redo,
} from "lucide-react";

// Type definitions
type CustomEditor = BaseEditor & ReactEditor;

type ParagraphElement = {
    type: "paragraph";
    align?: "left" | "center" | "right";
    children: CustomText[];
};

type HeadingElement = {
    type: "heading-one" | "heading-two";
    align?: "left" | "center" | "right";
    children: CustomText[];
};

type BlockQuoteElement = {
    type: "block-quote";
    align?: "left" | "center" | "right";
    children: CustomText[];
};

type BulletedListElement = {
    type: "bulleted-list";
    align?: "left" | "center" | "right";
    children: ListItemElement[];
};

type NumberedListElement = {
    type: "numbered-list";
    align?: "left" | "center" | "right";
    children: ListItemElement[];
};

type ListItemElement = {
    type: "list-item";
    children: CustomText[];
};

type LinkElement = {
    type: "link";
    url: string;
    children: CustomText[];
};

type CustomElement =
    | ParagraphElement
    | HeadingElement
    | BlockQuoteElement
    | BulletedListElement
    | NumberedListElement
    | ListItemElement
    | LinkElement;

type FormattedText = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
};

type CustomText = FormattedText & { text: string };

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
    // Extend the Editor interface to include history methods
    interface BaseEditor {
        undo: () => void;
        redo: () => void;
        history: {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            redos: any[];
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            undos: any[];
        };
    }
}

// Helper functions
const isBlockActive = (
    editor: CustomEditor,
    format: string,
    blockType = "type"
) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType as keyof CustomElement] === format,
        })
    );

    return !!match;
};

const isMarkActive = (editor: CustomEditor, format: keyof FormattedText) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: CustomEditor, format: string) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });

    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        } as Partial<SlateElement>;
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        } as Partial<SlateElement>;
    }

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] } as CustomElement;
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor: CustomEditor, format: keyof FormattedText) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right"];

// Components
const Element = ({ attributes, children, element }: RenderElementProps) => {
    const style = {
        textAlign: ("align" in element
            ? element.align
            : undefined) as React.CSSProperties["textAlign"],
    };

    switch (element.type) {
        case "block-quote":
            return (
                <blockquote
                    style={style}
                    {...attributes}
                    className="border-l-4 border-gray-300 pl-4 italic my-4"
                >
                    {children}
                </blockquote>
            );
        case "bulleted-list":
            return (
                <ul
                    style={style}
                    {...attributes}
                    className="list-disc pl-6 my-2"
                >
                    {children}
                </ul>
            );
        case "heading-one":
            return (
                <h1
                    style={style}
                    {...attributes}
                    className="text-3xl font-bold my-4"
                >
                    {children}
                </h1>
            );
        case "heading-two":
            return (
                <h2
                    style={style}
                    {...attributes}
                    className="text-2xl font-bold my-3"
                >
                    {children}
                </h2>
            );
        case "list-item":
            return (
                <li {...attributes} className="my-1">
                    {children}
                </li>
            );
        case "numbered-list":
            return (
                <ol
                    style={style}
                    {...attributes}
                    className="list-decimal pl-6 my-2"
                >
                    {children}
                </ol>
            );
        case "link":
            return (
                <a
                    {...attributes}
                    href={element.url}
                    className="text-blue-600 underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            );
        default:
            return (
                <p style={style} {...attributes} className="my-2">
                    {children}
                </p>
            );
    }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        );
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

// Toolbar components
interface ToolbarButtonProps {
    active: boolean;
    onMouseDown: (event: React.MouseEvent) => void;
    children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    active,
    onMouseDown,
    children,
}) => (
    <button
        onMouseDown={onMouseDown}
        className={`p-2 rounded transition-colors ${
            active
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
        }`}
    >
        {children}
    </button>
);

interface BlockButtonProps {
    format: string;
    editor: CustomEditor;
    icon: React.ReactNode;
}

const BlockButton: React.FC<BlockButtonProps> = ({ format, editor, icon }) => (
    <ToolbarButton
        active={isBlockActive(
            editor,
            format,
            TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        )}
        onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
        }}
    >
        {icon}
    </ToolbarButton>
);

interface MarkButtonProps {
    format: keyof FormattedText;
    editor: CustomEditor;
    icon: React.ReactNode;
}

const MarkButton: React.FC<MarkButtonProps> = ({ format, editor, icon }) => (
    <ToolbarButton
        active={isMarkActive(editor, format)}
        onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
        }}
    >
        {icon}
    </ToolbarButton>
);

const Toolbar: React.FC<{ editor: CustomEditor }> = ({ editor }) => (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 shadow-lg">
        <div className="flex flex-wrap gap-1 p-2 border-t border-gray-200 bg-transparent backdrop-blur-md">
            <ToolbarButton
                active={false}
                onMouseDown={(event) => {
                    event.preventDefault();
                    editor.undo();
                }}
            >
                <Undo size={18} />
            </ToolbarButton>
            <ToolbarButton
                active={false}
                onMouseDown={(event) => {
                    event.preventDefault();
                    editor.redo();
                }}
            >
                <Redo size={18} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <MarkButton
                format="bold"
                editor={editor}
                icon={<Bold size={18} />}
            />
            <MarkButton
                format="italic"
                editor={editor}
                icon={<Italic size={18} />}
            />
            <MarkButton
                format="underline"
                editor={editor}
                icon={<Underline size={18} />}
            />
            <MarkButton
                format="code"
                editor={editor}
                icon={<Code size={18} />}
            />

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <BlockButton
                format="heading-one"
                editor={editor}
                icon={<Heading1 size={18} />}
            />
            <BlockButton
                format="heading-two"
                editor={editor}
                icon={<Heading2 size={18} />}
            />
            <BlockButton
                format="block-quote"
                editor={editor}
                icon={<Quote size={18} />}
            />
            <BlockButton
                format="bulleted-list"
                editor={editor}
                icon={<List size={18} />}
            />
            <BlockButton
                format="numbered-list"
                editor={editor}
                icon={<ListOrdered size={18} />}
            />

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <BlockButton
                format="left"
                editor={editor}
                icon={<AlignLeft size={18} />}
            />
            <BlockButton
                format="center"
                editor={editor}
                icon={<AlignCenter size={18} />}
            />
            <BlockButton
                format="right"
                editor={editor}
                icon={<AlignRight size={18} />}
            />

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <ToolbarButton
                active={false}
                onMouseDown={(event) => {
                    event.preventDefault();
                    const url = window.prompt("Enter the URL of the link:");
                    if (!url) return;
                    insertLink(editor, url);
                }}
            >
                <Link size={18} />
            </ToolbarButton>
        </div>
    </div>
);

// Link functionality
const insertLink = (editor: CustomEditor, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url);
    }
};

const isLinkActive = (editor: CustomEditor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    });
    return !!link;
};

const unwrapLink = (editor: CustomEditor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    });
};

const wrapLink = (editor: CustomEditor, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: LinkElement = {
        type: "link",
        url,
        children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: "end" });
    }
};

// Main Editor Component
export default function SlateTextEditor() {
    const [value, setValue] = useState<Descendant[]>([
        {
            type: "paragraph",
            children: [
                {
                    text: "",
                    // Welcome to the Text editor! Try formatting some text.
                },
            ],
        },
    ]);

    const renderElement = useCallback(
        (props: RenderElementProps) => <Element {...props} />,
        []
    );
    const renderLeaf = useCallback(
        (props: RenderLeafProps) => <Leaf {...props} />,
        []
    );

    const editor = useMemo(
        () => withHistory(withReact(createEditor())) as CustomEditor,
        []
    );

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!event.ctrlKey && !event.metaKey) return;

        switch (event.key) {
            case "b": {
                event.preventDefault();
                toggleMark(editor, "bold");
                break;
            }
            case "i": {
                event.preventDefault();
                toggleMark(editor, "italic");
                break;
            }
            case "u": {
                event.preventDefault();
                toggleMark(editor, "underline");
                break;
            }
            case "`": {
                event.preventDefault();
                toggleMark(editor, "code");
                break;
            }
        }
    };

    return (
        <div className="min-w-4xl mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Slate
                editor={editor}
                initialValue={value}
                onValueChange={setValue}
            >
                <div className="p-4">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start typing here..."
                        onKeyDown={handleKeyDown}
                        className="min-h-screen focus:outline-none prose prose-slate max-w-none mt-15"
                    />
                </div>
                <Toolbar editor={editor} />
            </Slate>

            <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs text-gray-600 max-w-xs">
                <div className="font-semibold mb-2">Keyboard Shortcuts:</div>
                <div className="space-y-1">
                    <div>Ctrl/Cmd + B: Bold</div>
                    <div>Ctrl/Cmd + I: Italic</div>
                    <div>Ctrl/Cmd + U: Underline</div>
                    <div>Ctrl/Cmd + `: Code</div>
                    <div>Ctrl/Cmd + Z: Undo</div>
                    <div>Ctrl/Cmd + Shift + Z: Redo</div>
                </div>
            </div>
        </div>
    );
}

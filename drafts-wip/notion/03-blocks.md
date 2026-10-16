# Pages and Blocks

Everything in Notion is made of **pages**, and every page is made of **blocks**. Once you understand blocks, the rest of Notion is just combining them in new ways.

:::summary In this chapter
- What a block is, and the three editing tools
- Every kind of block, by category
- Moving, nesting, and turning blocks into other types
- Columns, colors, toggles, and callouts
- Synced blocks: one block in many places
- Pages inside pages
:::

## Blocks: the LEGO bricks

A **block** is any single piece of content: a paragraph, a heading, a to-do checkbox, an image, a table, an embedded video. Each block can be moved, turned into another type, or nested inside another.

- Hover over any block and drag the **⋮⋮** handle to move it.
- Click the handle to **Turn into** another type, change its color, or duplicate or delete it.
- Drag a block to the far right of another block to create **columns**.

## The three editing tools

| Tool | Where it appears | What it does |
|---|---|---|
| **+** | Left margin, when you hover over a new line | Opens the menu of block types to add |
| **⋮⋮** (the "drag handle") | Left margin, when you hover over a block | Drag to move; click for the block menu |
| **/** (slash) | Wherever you type it | The keyboard way to add blocks or run actions |

The **⋮⋮ block menu** includes: **Turn into**, **Color**, **Copy link to block**, **Duplicate**, **Move to**, **Delete**, **Comment**, **Suggest edits**, and **Ask AI**. When you select several blocks, it also shows a word and character count.

## Every kind of block

### Basic blocks

| Block | What it's for | Quick way to add |
|---|---|---|
| **Text** | Ordinary paragraphs | Just type |
| **Page** | A subpage inside this page | `/page` |
| **To-do list** | Checkboxes | `[]` |
| **Heading 1, 2, 3** | Section titles, large to small | `#`, `##`, `###` + space |
| **Table** | A simple grid of rows and columns | `/table` |
| **Bulleted list** | Bullets | `-` + space |
| **Numbered list** | Numbered steps | `1.` + space |
| **Toggle list** | Hide content under a clickable arrow | `>` + space |
| **Quote** | A large pull-quote | `"` + space |
| **Divider** | A thin gray line | `---` |
| **Link to page** | A block that links to another page | `/link` |
| **Callout** | A boxed note with an icon | `/callout` |

### Media blocks

| Block | What it's for |
|---|---|
| **Image** | Upload, paste a link, or pick from Unsplash |
| **Video** | Upload a file, or embed from YouTube or Vimeo |
| **Audio** | Upload a recording, or embed from Spotify or SoundCloud |
| **File** | Attach any file |
| **Code** | Code with syntax highlighting and a copy button |
| **Web bookmark** | A link preview card for any web page (`/book`) |

> [!NOTE]
> On the Free plan, each uploaded file can be up to 5 MB. Paid plans allow unlimited uploads, up to about 5 GB per file.

### Embeds

An **embed** shows live content from another app inside your page. Notion works with 500+ embeds. Named shortcuts include Google Drive, Google Maps, Figma, Loom, Typeform, GitHub Gist, CodePen, Whimsical, and PDF. For anything else, type `/embed` and paste the link.

### Advanced blocks

| Block | What it does |
|---|---|
| **Table of contents** (`/toc`) | Links to every heading on the page, updated automatically |
| **Block equation** (`/math`) | A full-width math formula written in TeX |
| **Inline equation** (`/equation`) | A formula inside a sentence |
| **Button** (`/button`) | Runs actions when clicked (Chapter 11) |
| **Breadcrumb** (`/bread`) | Shows where this page lives in the workspace |
| **Synced block** | The same content shown in several places (below) |
| **Columns** (`/2`, `/3`…) | Side-by-side layout |
| **Toggle heading 1, 2, 3** | A heading that opens and closes like a toggle |

### Databases and views

You can also add a database right inside a page: `/table view`, `/board view`, `/calendar view`, `/gallery view`, `/list view`, `/timeline view`, `/chart`, `/form`, `/map`, and more. Chapters 5 to 8 explain databases fully.

## Moving and nesting blocks

- **Move:** drag the **⋮⋮** handle up or down. A blue line shows where it will land.
- **Move to another page:** drag it onto a page in the sidebar, or use **⋮⋮ › Move to**.
- **Nest:** press <kbd>Tab</kbd> to indent a block under the one above; <kbd>Shift</kbd> + <kbd>Tab</kbd> to un-indent. Nested blocks move with their parent.
- **Duplicate:** select the block (press <kbd>Esc</kbd>) and press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>D</kbd>, or hold <kbd>Option</kbd>/<kbd>Alt</kbd> while you drag.
- **Turn into:** click **⋮⋮ › Turn into**, or type `/turn` at the start of a block.

> [!TIP]
> Made a mistake? <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Z</kbd> undoes it, just like in any other app.

## Columns

:::steps Put two blocks side by side
1. **Hover over a block** until the ⋮⋮ handle appears.
2. **Drag it to the right edge** of another block. A vertical blue line appears.
3. **Let go.** The two blocks now sit in columns.
4. **Resize** by dragging the faint line between the columns.
:::

Or type `/2` and choose **2 columns**. You can drag in as many columns as fit across the page. To undo columns, drag the blocks back out underneath each other. On phones, columns are shown one under the other.

## Colors and highlights

- **Text color:** select text, click the **A** in the toolbar, and pick a text or background color.
- **Whole block:** **⋮⋮ › Color**, or type `/red`, `/blue background`, and so on. `/default` removes color.
- **Repeat your last color:** <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>.

## Toggles and toggle headings

A **toggle** hides its contents until you click its arrow. Use toggles for FAQs, long details, or answers to quiz questions. Type `>` and a space to start one, then press <kbd>Tab</kbd> on the next line to put content inside it.

You can also make a heading collapsible: turn a heading into a **toggle heading** with **⋮⋮ › Turn into**. Open or close every toggle on a page at once with <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Option</kbd>/<kbd>Alt</kbd> + <kbd>T</kbd>.

## Callouts

A **callout** is a colored box with an icon, good for tips, warnings, and summaries. Type `/callout`, then click the icon to change it. You can put any blocks inside a callout, including lists and images.

## Simple tables vs databases

The `/table` block is a **simple table**: a plain grid, like one in a word processor. It's perfect for a small comparison. A **database** (`/table view`) is far more powerful: every row is a page with typed properties, and you can filter, sort, and show it in many views. If you catch yourself wanting to filter or sort a simple table, it's time to use a database instead.

## Synced blocks

A **synced block** shows the same content in several places. Edit any copy and every copy updates. Use it for a team mission statement, a contact list, or a disclaimer that appears on many pages.

:::steps Create a synced block
1. **Select the blocks** you want to reuse by dragging across them.
2. **Click ⋮⋮ › Turn into › Synced block.** A colored border appears around them.
3. **Copy the synced block** with the copy icon.
4. **Paste it** on another page. Both copies now stay in step.
:::

> [!WARNING]
> People who can't open the page with the original synced block won't see its contents in the copies. Share the original page with them first.

## Pages inside pages

Any page can contain other pages, so you can organize everything like folders. Type `/page` to create a subpage, or `[[` and a name to link to an existing page (or create a new one). Type `@` to mention a person, a page, or a date such as `@tomorrow`; dates can carry reminders.

> [!TIP]
> Keep your sidebar tidy with a few top-level "home" pages, such as **Home**, **Projects**, **Notes**, **Areas**, and **Archive**, and put everything else inside them.

## Worked example: a recipe page

:::steps Build a recipe page
1. **Create a page** called "Lemon pancakes" and add a food emoji icon and a cover photo.
2. **Add a callout** at the top: "Serves 4 · 20 minutes".
3. **Add two columns.** Left: an H2 "Ingredients" with a to-do list (tick items off as you shop). Right: an H2 "Method" with a numbered list.
4. **Add a toggle** called "Tips and variations" and put extra notes inside.
5. **Add an image block** at the bottom for a photo of your result.
:::

:::checklist
- I can add blocks with **+** and with `/`
- I moved a block with ⋮⋮ and nested one with <kbd>Tab</kbd>
- I made two columns
- I tried a toggle, a callout, and a divider
- I know the difference between a simple table and a database
:::


# Writing Faster

You can do almost everything in Notion with the mouse. But a few keyboard habits make writing much quicker, and they're easy to pick up. This chapter collects them: slash commands, Markdown shortcuts, mentions, links, and comments.

:::summary In this chapter
- The slash menu, and the commands worth memorizing
- Markdown shortcuts that format as you type
- Keyboard shortcuts for styling text
- Mentions with `@`, links with `[[` and `+`, and backlinks
- Comments, suggested edits, and reminders
:::

## The slash command

Type `/` anywhere to open a menu of every block and action. Keep typing to filter it, then press <kbd>Enter</kbd>. Press <kbd>Esc</kbd> if you just wanted a slash character.

| Type | To get |
|---|---|
| `/text` or `/plain` | A plain text block |
| `/h1`, `/h2`, `/h3` | Headings (`/#`, `/##`, `/###` also work) |
| `/todo` | A to-do checkbox |
| `/bullet`, `/num` | Bulleted or numbered lists |
| `/toggle` | A collapsible section |
| `/quote` | A quote block |
| `/div` | A divider line |
| `/callout` | A highlighted box with an icon |
| `/code` | A code block |
| `/table` | A simple table |
| `/database` | A full database (Chapter 5) |
| `/image`, `/video`, `/audio`, `/file` | Media and files |
| `/pdf` | Show a PDF inline |
| `/book` | A web bookmark card |
| `/embed` | Embed a map, form, Figma file, and more |
| `/page` | A new page inside this one |
| `/link` | A link to another page |
| `/toc` | A table of contents |
| `/math` or `/latex` | A block equation |
| `/button` | A button that runs actions when clicked |
| `/meet` | AI Meeting Notes (Chapter 17) |

### Action commands

The slash menu also *does* things to the current block:

| Type | What happens |
|---|---|
| `/turn` | Turn the block into another type |
| `/duplicate` | Copy the block |
| `/moveto` | Move the block to another page |
| `/delete` | Delete the block |
| `/red`, `/blue background` | Change color (`/default` removes it) |
| `/mention`, `/date`, `/emoji` | Insert a mention, a date, or an emoji |

## Markdown shortcuts

**Markdown** is a simple way of formatting text with symbols. Type these at the start of a line for instant formatting:

| Type | Result |
|---|---|
| `#` then space | Heading 1 (`##` for H2, `###` for H3) |
| `-`, `*`, or `+` then space | Bullet |
| `1.`, `a.`, or `i.` then space | Numbered list |
| `[]` | To-do checkbox |
| `>` then space | Toggle |
| `"` then space | Quote |
| `---` | Divider line |
| ```` ``` ```` | Code block |

And these work while you type, around a word or phrase:

| Type | Result |
|---|---|
| `**text**` | **Bold** |
| `*text*` | *Italic* |
| `` `text` `` | Inline code |
| `~text~` | Strikethrough |

> [!TIP]
> Pasting Markdown from another app (for example, text an AI chatbot gave you) usually converts it into proper Notion blocks automatically.

## Styling text with the keyboard

Select some text first, then:

| Shortcut (Mac / Windows) | Effect |
|---|---|
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd> | Bold |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> | Italic |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>U</kbd> | Underline |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Strikethrough |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>E</kbd> | Inline code |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> | Add a link |
| <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> | Add a comment |

You can also paste a web address over selected text to turn it into a link. Press <kbd>Shift</kbd> + <kbd>Enter</kbd> for a line break *inside* a block, rather than a new block.

## Emoji

Type `:` followed by a word, such as `:apple` or `:clapping`, to insert an emoji. You can also use your computer's emoji picker: <kbd>Ctrl</kbd> + <kbd>Cmd</kbd> + <kbd>Space</kbd> on a Mac, or <kbd>Win</kbd> + <kbd>.</kbd> on Windows.

## Mentions with @

Type `@` to open the mention menu:

- **Mention a person:** `@` and a name. They get a notification. Great in comments.
- **Mention a page:** `@` and a page name. This creates an inline link that updates if the page is renamed.
- **Mention a date:** `@today`, `@tomorrow`, `@next Wednesday`, or any date.
- **Add a reminder:** `@remind` followed by a date and time, such as `@remind tomorrow 9am`. Notion notifies you when it's due.

Press <kbd>Esc</kbd> to dismiss the menu if you just wanted an @ sign.

## Links with [[ and +

| Type | Shows first | Use it to |
|---|---|---|
| `[[` + a name | Links to existing pages | Link to a page, or create one |
| `+` + a name | Options to create a page | Create a subpage, or a page somewhere else |

Both menus offer **+ Add new sub-page** (create a page inside this one) and **↗ Add new page in…** (create it somewhere else).

## Backlinks

When you mention a page, Notion automatically records a **backlink** on the page you mentioned. Backlinks appear under the page title as "*N* backlinks". Click them to see every page that links here. This is a handy way to find related notes without any extra work.

## Comments and suggestions

- **Comment on text:** select it and click **Comment**, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>.
- **Comment on a block:** use **⋮⋮ › Comment**.
- **Comment on the whole page:** hover near the title and click **Add comment**.
- **Mention someone** in a comment with `@` so they're notified.
- **Resolve** a finished discussion by hovering over the comment and clicking the ✔️. Reopen resolved comments from the 💬 icon at the top of the page.
- **Suggest edits:** use **⋮⋮ › Suggest edits** to propose changes that the page owner can accept or reject, like "track changes" in a word processor.

## Word count

Select one or more blocks and the menu shows how many words and characters they contain.

## Worked example: clean up messy notes in two minutes

:::steps From scribbles to a tidy page
1. **Paste your raw notes** into a new page.
2. **Add structure:** put `#` and a space in front of the main topics to make headings.
3. **Make lists:** put `-` and a space in front of each point; press <kbd>Tab</kbd> to nest details.
4. **Turn tasks into checkboxes:** put `[]` in front of anything you need to do.
5. **Hide long details** under toggles with `>` and a space.
6. **Link related pages** with `@` so they show up as backlinks.
7. **Add a reminder** to follow up: `@remind next Monday 10am`.
:::

## When shortcuts don't work

| Problem | Try this |
|---|---|
| `/` just types a slash | You're inside a code block or a database cell; click into a normal text line |
| Markdown didn't convert | Type the symbol at the very *start* of a line, then a space |
| `@` menu keeps popping up | Press <kbd>Esc</kbd> to type a plain @ |
| Shortcut does nothing on Windows | Another app may use <kbd>Ctrl</kbd> + <kbd>Shift</kbd>; try the slash command instead |

:::checklist
- I can open the slash menu and filter it by typing
- I know at least five Markdown shortcuts
- I can bold, italicize, and link with the keyboard
- I've mentioned a page and a date with `@`
- I left a comment and resolved it
:::


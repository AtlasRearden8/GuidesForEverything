# Rebasing Explained Simply

**Rebasing** is another way to bring changes from one branch into another. Instead of tying the two histories together with a merge commit, it lifts your commits off and replays them on top of the latest version of the other branch, as if you had started your work today. The result is a tidy, straight-line history.

:::summary In this chapter
- What a rebase does, in one picture
- Updating your branch with the latest `main`
- Handling conflicts during a rebase
- Tidying commits with interactive rebase
- The golden rule: when *not* to rebase
:::

## One picture

```text
before:  o---o---o---o (main)
              \
               A---B (my-branch)

after:   o---o---o---o (main)
                      \
                       A'--B' (my-branch)
```

Your commits `A` and `B` become new commits `A'` and `B'` with the same changes but new hashes, sitting on top of the newest `main`.

## Merge or rebase?

| | Merge | Rebase |
|---|---|---|
| History | Shows exactly what happened, with merge commits | A straight line, easier to read |
| Rewrites commits? | No | Yes (new hashes) |
| Safe on shared branches? | Yes | Only if nobody else uses the branch |
| Best for | Beginners, shared branches | Updating your own branch before a PR |

> [!TIP]
> If in doubt, merge. You can work happily for years without rebasing. Learn it when a project you join asks for a linear history.

## Updating your branch with the latest main

:::steps Rebase onto main
1. **Get the newest main.**
   ```bash
   git fetch origin
   ```
2. **Rebase your branch onto it.**
   ```bash
   git switch my-branch
   git rebase origin/main
   ```
3. **If there's a conflict,** fix the file as in the Merging chapter, then:
   ```bash
   git add the-file.txt
   git rebase --continue
   ```
4. **Push.** Because the commits have new hashes, a normal push is refused. Use the safe force option:
   ```bash
   git push --force-with-lease
   ```
:::

`--force-with-lease` overwrites the branch on GitHub *only if* nobody else has pushed to it since you last fetched. Plain `--force` overwrites regardless, and can delete a teammate's work.

### Rebase escape hatches

| Command | Does |
|---|---|
| `git rebase --continue` | Carry on after fixing a conflict |
| `git rebase --skip` | Drop the commit that's conflicting and continue |
| `git rebase --abort` | Cancel everything and go back to before the rebase |

## Pull with rebase

`git pull --rebase` fetches and then rebases your unpushed local commits on top, instead of creating a merge commit. Some people make it the default:

```bash
git config --global pull.rebase true
```

On a pull request, GitHub's **Update branch** button merges `main` into your branch; its dropdown also offers **Update with rebase**.

## Tidying commits with interactive rebase

Before opening a pull request you might want to combine "WIP" commits, fix a typo in a message, or drop a false start. **Interactive rebase** opens a to-do list of your recent commits:

```bash
git rebase -i HEAD~3
```

```text
pick 1a2b3c4 Add gift card page
pick 5d6e7f8 WIP
pick 9a0b1c2 Fix typo
```

Change the word at the start of each line, save, and close the editor:

| Word | Effect |
|---|---|
| `pick` | Keep the commit as it is |
| `reword` | Keep it, but edit the message |
| `squash` | Combine with the commit above, merging the messages |
| `fixup` | Combine with the commit above, discarding this message |
| `drop` | Remove the commit entirely |

Changing `WIP` and `Fix typo` to `fixup` leaves one clean commit: "Add gift card page."

> [!NOTE]
> Just want to fix the very last commit's message, or add a forgotten file? You don't need a rebase: use `git commit --amend` (see the Undoing Mistakes chapter).

## The golden rule

> [!CAUTION]
> Never rebase commits that other people already have, such as `main` or a branch a teammate is working on. Rebasing replaces commits with new ones, and everyone else's copies stop matching. Rebase only your own branches, ideally before others start using them.

If a rebase goes badly, `git reflog` (next chapter) can take you back to before it started.

:::checklist
- I can explain rebase as "replay my commits on top"
- I use `--force-with-lease`, never plain `--force`
- I know `git rebase --abort` gets me out
- I never rebase `main` or shared branches
:::

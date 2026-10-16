# Releases, Tags and Packages

When your project reaches a version worth sharing, mark it. A **tag** is a permanent name for one commit, like `v1.0.0`. A **release** is a GitHub page built on a tag, with notes and downloadable files. **GitHub Packages** hosts installable packages and container images.

:::summary In this chapter
- Version numbers that mean something
- Creating tags with Git
- Publishing a release with automatic release notes
- Customizing release notes
- What GitHub Packages is for
:::

## Version numbers

Most projects use **semantic versioning**: three numbers, `MAJOR.MINOR.PATCH`.

| Change | Example | Bump |
|---|---|---|
| Bug fix only | 1.4.2 → 1.4.3 | PATCH |
| New feature, nothing breaks | 1.4.3 → 1.5.0 | MINOR |
| Breaking change | 1.5.0 → 2.0.0 | MAJOR |

Tags usually add a `v` in front: `v1.5.0`.

## Tags with Git

```bash
git tag -a v1.0.0 -m "First public release"   # an annotated tag
git push origin v1.0.0                        # tags aren't pushed by default
git tag                                       # list tags
git switch --detach v1.0.0                    # look at that version
```

An **annotated** tag (`-a`) stores who tagged it, when, and a message; use it for releases.

## Publish a release

:::steps Create a release on GitHub
1. **Open Releases** on the right of the repository page, then **Draft a new release**.
2. **Choose a tag.** Pick an existing one, or type a new name like `v1.0.0` and choose the **Target** branch.
3. **Title it**, for example "Version 1.0: online ordering."
4. **Click Generate release notes** to list every merged pull request since the previous tag, then edit.
5. **Attach files** (optional), such as installers or a PDF, by dragging them into the binaries box.
6. **Tick This is a pre-release** for test versions, and **Set as latest release** for the main one.
7. **Click Publish release.**
:::

From the terminal: `gh release create v1.0.0 --generate-notes`. Add `--prerelease` or `--draft` as needed.

| Release limit | Amount |
|---|---|
| Files per release | Up to 1,000 |
| Size per file | Under 2 GiB |
| Total size or bandwidth | No limit |

> [!NOTE]
> Repositories can turn on **immutable releases**: once published, assets can't be changed and the tag can't be moved or deleted. That protects people who download your software.

## Customizing release notes

Group automatic notes by label with a `.github/release.yml` file:

```yaml title=.github/release.yml
changelog:
  exclude:
    labels: [ignore-for-release]
  categories:
    - title: New features
      labels: [enhancement]
    - title: Bug fixes
      labels: [bug]
    - title: Other changes
      labels: ["*"]
```

## GitHub Packages

**GitHub Packages** hosts software packages next to your code, so others (or your own workflows) can install them. It supports common package managers including npm (JavaScript), RubyGems, Maven and Gradle (Java), NuGet (.NET), and Docker images through the **Container registry** at `ghcr.io`.

| Plan | Packages storage included |
|---|---|
| Free | 500 MB |
| Pro / Team | 2 GB |
| Enterprise | 50 GB |

Public packages are free. Most beginners won't need Packages until they publish a library or a container image; when you do, the Actions templates for "Publish Node.js Package" or "Docker image" set it up for you.

:::checklist
- I tag releases with `v` plus semantic version numbers
- Published a release with generated notes
- Labels on pull requests produce tidy release notes
:::

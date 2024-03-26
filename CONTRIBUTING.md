<!-- omit in toc -->
# Contributing to Software Practices Metrics Tool

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents)
for different ways to help and details about how this project handles them. Please make sure to read
the relevant section before making your contribution. It will make it a lot easier for us maintainers
and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine.
> There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->
## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the
[Software Practices Metrics Tool Code of Conduct](blob/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to <techops@solitontech.com>.

## I Have a Question

Before you ask a question, it is best to search for existing [Issues](/issues) that might help you.
In case you have found a suitable issue and still need clarification, you can write your question in this issue.
It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
>
> When contributing to this project, you must agree that you have authored 100% of the content,
> that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you
to investigate carefully, collect information and describe the issue in detail in your report.
Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions.
- To see if other users have experienced (and potentially already solved) the same issue you are having,
 check if there is not already a bug report existing for your bug or error in the [bug tracker](issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to <techops@solitontech.com>.
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](/issues/new). (Since we can't be sure at this point whether it is a bug or not,
 we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone
 else can follow to recreate the issue on their own. This usually includes your code.
  For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps
 or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue
  as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly
 other tags (such as `critical`), and the issue will be left to be implemented by someone.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Software Practices Metrics Tool,
 **including completely new features and minor improvements to existing functionality**.
  Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Perform a [search](/issues) to see if the enhancement has already been suggested. If it has,
 add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong
 case to convince the project's developers of the merits of this feature. Keep in mind that we want
  features that will be useful to the majority of our users and not just a small subset. If you're
   just targeting a minority of users, consider writing an add-on/plugin library.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
 At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or
 point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/)
  to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or
   [this tool](https://github.com/GNOME/byzanz) on Linux.
- **Explain why this enhancement would be useful** to most Software Practices Metrics Tool users.
 You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

If you're considering making your first code contribution to our project, welcome aboard! Here's how you can get started:

1. **Setup Your Development Environment:**
   - Refer to the [README](blob/main/README.md) file to set up the project on your local machine.
    It contains detailed instructions on installing dependencies and running the project locally.

2. **Select an Issue or Enhancement:**
   - Browse through the [GitHub issues](/issues) to find tasks, issues, or enhancements that interest you.
    Feel free to filter by labels such as "good first issue" or "help wanted" if you're looking for beginner-friendly tasks.

3. **Resolve the Issue:**
   - Once you've chosen an issue or enhancement to work on, start by forking the repository
    to your GitHub account. Then, create a new branch for your changes.
   - Write your code, following the project's coding style and guidelines. Make sure to include
    appropriate documentation and tests if necessary.
   - Once your changes are ready, commit your work and push your branch to your forked repository.

4. **Raise a Pull Request (PR):**
   - Go to the original repository and create a new pull request from your branch. Provide a clear and descriptive
    title and description for your PR, explaining the changes you've made and addressing the issue or enhancement.
   - Be open to feedback and suggestions from the maintainers and community members. Make any necessary adjustments based on the feedback received.

5. **Celebrate Your Contribution:**
   - Congratulations on your first code contribution! Your contribution helps improve
    the project and benefits the community. Thank you for your efforts!

We encourage you to explore more opportunities to contribute and grow as a member of our open-source community. Happy coding!

### Improving The Documentation

We value high-quality documentation to help users understand and utilize our project effectively.
 If you have suggestions for improving the documentation, we welcome your contributions. Here's how you can help:

1. **Updating Documentation:**
   - If you notice outdated information or inaccuracies in the documentation, feel free to update it with the correct information.

2. **Improving Clarity and Readability:**
   - Simplify complex explanations and ensure that the documentation is easy to understand for all users.

3. **Correcting Errors:**
   - If you identify any errors or inconsistencies in the documentation, please correct them to maintain accuracy.

We appreciate your efforts in enhancing our project's documentation to make it more accessible and user-friendly.

## Styleguides

### Commit Messages

#### Commit Message Format

A commit message should consist of the following components:

- **Type:** The type of the commit, indicating the nature of the changes (e.g., feat, fix, docs, style, refactor, test, chore).
- **Scope:** The scope of the changes, indicating the affected module, feature, or area of the project.
- **Subject:** A brief and descriptive summary of the changes made.

The commit message should follow the format:

```markdown
    <type>(<scope>): <subject>
```

#### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.

#### Type

The type of commit indicates the nature of the changes. Common types include:

- **feat:** A new feature or enhancement.
- **fix:** A bug fix.
- **docs:** Documentation updates.
- **style:** Changes that do not affect the meaning of the code (e.g., formatting, missing semicolons).
- **refactor:** Code refactorings.
- **test:** Adding or updating tests.
- **chore:** Maintenance tasks, tooling changes, or other non-production code changes.

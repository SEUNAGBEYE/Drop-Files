## You want to contribute to this project ?
____

* Fork this repository to your github account 

* Clone the repository 
`git clone https://github.com/{your_username_goes_here}/dman.git`
*   create ```.env file```,  add your ```CLOUDINARY_UPLOAD_PRESET = your cloudinary preset``` and ```CLOUDINARY_UPLOAD_URL= your cloudinary upload url```.
* run ```yarn test to run the tests```
* run ```yarn run dev-server``` to run it


# Git Work Flow
## Branch Naming

Branches being created should have the following format:

`<story type>/<story id>/<3-4 word story description>`

### Example

`chore/111504508/save-the-world`

The story type indicates the context of the branch and should be written in full and with lowercase letters:

* feature
* chore
* bug
* release

The story description is a summary about the purpose of the branch.It is delimited with hyphen (-). For example, travis-ci-setup

## Commit Message
### Format of the commit message

`<type>(<scope>): <subject>``<BLANK LINE>`
`<body>`
`<BLANK LINE>`
`<footer>`

Any line cannot be longer than a 100 characters, meaning be concise.

**Subject line**
`<type>` should be:

* feature
* bug
* chore
* release
* refactor
* documentation
* style
* test

`<scope>` should be something specific to the commit change. For example:
* costume
* flight
* fighting-style
* fan-base
* logo and so on.

`<subject>` text should:
* use present tense: "save" not "saved" or "saving"
* not capitalize first letter i.e no "Carry to safety"
* not end with a dot (.)

**Message body (optional)** If a body is to be written, it should:
* written in present tense.
* include reason for change and difference in the previous behaviour

**Message Footer** This should be used for referencing the issues using the following keywords: Start, Delivers, Fixes and Finishes. It should be written as:

`[Start #345]`

or in a case of multiple issues:

`[Finishes #5438233, #5891837, #4988398]`

### PR Naming

`#<story-id> story description`

**Example**

`#869522144 Build HQ for meetings`

#### PR Description Template (Markdown)

The description should contain the following headings and the related content:

    #### What does this PR do?
    #### Description of Task to be completed?
    #### How should this be manually tested?
    #### Any background context you want to provide?
    #### What are the relevant pivotal tracker stories?
    #### Screenshots (if appropriate)
    #### Questions:

## Style Guide
- All code to be contributed should adhere strictly to [Javascript Airbnb style guide](https://github.com/airbnb/javascript)
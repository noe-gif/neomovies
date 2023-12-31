<h1 align="center">NeoMovie app</h1></br>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/774360587391860769/1169793859430125709/fzfezfezfezfezdze.png?ex=6556b26d&is=65443d6d&hm=d50ecaf74138878c735e9031fc4aca520c1c02965bac6fa47d2ec2015281602d&" alt="banner"></img>
</p>

<p align="center">
   code base for the NeoMovie web app project
</p>

## Doc

Follow these instructions to build and run the project OR you can use the Dockerfile at your disposal

## Env

For this project you will need a ```.env.local```
There is a .env.example that you can follow but you will have to do two things :
    - Register an app in <a href="https://firebase.com/">Firebase</a> with firestore, storage and authentication (mp, google) instances
    - Create an app at the <a href="https://www.themoviedb.org/">The Movie DB</a> (Follow the .env.example instructions)

### Setup Project

- Clone this repository using `git clone https://github.com/juniorconseiltaker-technicaltest/CAMPO_Noe.git`.
- `cd` into `CAMPO_Noe`.
- `cd` into `NeoMovie`.
- `yarn install` to get all the dependencies.
- `npm run build` to build the project.
- `npm run start` to start the project on localhost.

or in dev mode : 
```
npm run dev
```

> Web App enforces [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/), make sure to read and follow them.

## Tips for correction

### The routing of the app is made by the app folder but the UI itself is inside the section folder

### In the discover, movies and shows folder inside the section folder is the main UI for the 3 main section of the app

### The component folder only contains MUI reusable components

## Project Structure

```bash
seiki-web-app/
├── node_modules/                   # This folder contains all the dependencies that the project requires, including React Native itself.
|   └── ...                         # all the dependencies listed
├── src/                            # Main source files folder
|   ├── app/                        # Main app pages corresponding to the route (url)
|   └── components/                 # Reusable components
|   └── sections/                   # Different UI pages of the applications (called by the app files)
|       └── discover/               # Discover section source files
|       └── movies/                 # Movies section source files
|       └── shows/                  # Shows section source files
|   └── auth/                       # Auth engine
|   └── types/                      # Typescript types and interfaces declarations
|   └── routes/                     # Routing engine
├── package.json                    # This file contains metadata about the project, including the project name, version, and dependencies.
├── package-lock.json               # This file is generated by npm and ensures that the project's dependencies are installed in a consistent manner.
```

## Dependencies

| Name          | Description             | Version |
| ------------- | ----------------------- | ------- |
| [@emotion]    | Simple styling in React | ^11.0   |
| [@iconify]    | SVG images as icons     | ^4.1.1  |
| [@mui]        | Core styling            | ^5.14.1 |
| [@Jest]       | Testing                 | ^4.2.4  |
| [@axios]      | HTTP requests           | ^1.5.1  |
| [@next]       | React Framework         | ^13.5.4 |
| [@react]      | JS library              | ^18.2.0 |

## License

**neomovie** Copyright ©2023 - neomovie

**neomovie** software under
the [GPL v3](https://opensource.org/licenses/gpl-3.0.html)
license, see the [LICENSE](./LICENSE) file in the project root for the full license text.

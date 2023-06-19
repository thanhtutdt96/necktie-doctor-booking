# Project - *Necktie Doctor Booking*

## Release
[Netlify](https://necktie-doctor-booking.netlify.app/)

## Installation

- Prerequisite: Node v16
- Change `.env.example` to `.env` (if `.env` not exist)
- Install dependencies

```
yarn install
```

- Start Vite dev server

```
yarn dev
```

- Open local site `http://localhost:5173/`

## Choice of Packages

- Key packages: TailwindCSS, daisyui, Redux Toolkit, date-fns, TypeScript + eslint

### TailwindCSS + daisyui

a. Purpose: TailwindCSS + daisyui is a combination that helps build and style gorgeous UI components in highly
customizable, maintainable and quick, using utility classes.

b. Benefits & drawbacks:

- Save development time, reducing the need to write custom CSS. Easily customize the design to match the project's
  requirements.
- Increase HTML size due to utility classes, take time to install and learn the classes and configs.

c. Assumptions: Choose this packages combination when familiar with TailwindCSS, and want to take its
advantages for speed of development, maintainability, and efficiency

### Redux Toolkit

a. Purpose: Simplify the state management, and utilize the RTK Query for data fetching and catching.

b. Benefits & drawbacks:

- Redux Toolkit reduces boilerplate code with Redux. RTK Query provides easier way to handle API requests, caching and
  error handling.
- However, they require some initial setup and configuration, and may not be necessary for small projects.

c. Assumptions: Choosing Redux Toolkit to leverage the power of Redux for managing API data in the application.

### date-fns

a. Purpose: Provide functions for parsing, formatting, comparing, and modifying dates.

b. Benefits & drawbacks:

- date-fns make it easier to handle complex date calculations and formatting. This package is also very lightweight in
  bundle size.
- However, date-fns may not fit with projects that require extensive/complex date manipulation.

c. Assumptions: Choosing date-fns for basic date manipulation and prefer a lightweight library.

### TypeScript + eslint

a. Purpose: Provides better autocompletion and strict type checks, catch type errors, code style, potential bugs during
development.

b. Benefits & drawbacks:

- Enhance code quality, readability, provides better documentation. Also detect common mistakes, enforces coding
  standards, and consistent code formatting.
- However, applying TypeScript + eslint may take lots of time, which can slow down the project development.

c. Assumptions: Choosing TypeScript + eslint to ensure the code quality, consistency, and coding standards in team collaborations.

## Potential Improvement
- Add user authentication/authorization
- Add unit tests/end-to-end tests
- Option for switch to dark mode
- Deeper performance optimization using Lighthouse

## Production consideration
- Remember to set value for environment variables `VITE_API_PATH` and `VITE_API_KEY` in `.env` file

## Assumptions
- Working time: calculated from doctor's opening hours, with max value from `day` & `start`/`end` fields (excluded closed day)
- Doctor available status: consider as available for the current date, if there are time slots having start hour > current hour

## License

    Copyright [2022] [Tu Pham]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

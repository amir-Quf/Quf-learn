import jsImg from "../assets/images/js.jpeg";
import reactImg from "../assets/images/react.jpeg";
import nodeJsImg from "../assets/images/nodeJs.jpeg";
import bootstrapImg from "../assets/images/bootstrap.jpeg";
import reactLibrariesImg from "../assets/images/reactLibraries.jpeg";
import nextJsImg from "../assets/images/nextJs.jpeg";
import gitHubImg from "../assets/images/gitHub.jpeg";
import npmImg from "../assets/images/npm.jpeg";
import cssImg from "../assets/images/css.jpeg";
import htmlImg from "../assets/images/html.jpeg";
import flexBoxImg from "../assets/images/flexBox.jpeg";

const coursesList = [
  {
    id: 1,
    title: "Comprehensive JavaScript course",
    desc: "Master the fundamentals and advanced concepts of JavaScript, the most popular programming language for web development.",
    price: 79.99,
    courseInfo:
      "Course Description: This comprehensive JavaScript course is designed for both beginners and experienced developers who want to strengthen their understanding of JavaScript — the backbone of modern web development. Starting from basic syntax, data types, variables, and operators, the course progressively covers functions, objects, arrays, and control structures in-depth.You will learn how to handle DOM manipulation, events, and asynchronous programming using callbacks, promises, and the powerful async/await syntax. The course emphasizes real-world use cases, helping you understand how JavaScript works in browsers and in Node.js environments.You'll also gain insight into ES6+ features such as arrow functions, destructuring, template literals, spread/rest operators, classes, modules, and more. Advanced topics like closures, the event loop, prototypal inheritance, scope chains, and memory management will be thoroughly explained with visual examples and hands-on exercises.By the end of the course, you'll be capable of building dynamic, interactive websites and preparing for JavaScript frameworks such as React or Vue. Whether you're aiming to be a frontend developer, a full-stack engineer, or a software architect, this course sets the foundation you need to thrive.",
    img: jsImg,
    discount: 0,
    time: '60 hour',
    lastUpdate: '2024/2/1',
    prerequisites: 'HTML & CSS',
    courseStatus: 'Completed'
  },
  {
    id: 2,
    title: "Commonly used React libraries",
    desc: "Explore essential React libraries that enhance productivity and simplify development.",
    price: 58.69,
    courseInfo: "This course introduces you to the ecosystem of tools that revolve around React and help streamline application development. It includes hands-on training with libraries such as React Router for navigation, Zustand or Redux Toolkit for state management, React Hook Form and Formik for form handling, and Yup for schema validation. You'll also learn about UI libraries like React Bootstrap and Tailwind-compatible solutions like ShadCN UI. The course provides practical examples and integrates libraries in real projects to highlight their role in boosting efficiency, managing complex logic, and improving code maintainability.",
    img: reactLibrariesImg,
    discount: 0,
    time: '15 hour',
    lastUpdate: '2025/4/12',
    prerequisites: 'React',
    courseStatus: 'In holding'
  },
  {
    id: 3,
    title: "Comprehensive React course",
    desc: "Master modern web development with React – a powerful JavaScript library for building user interfaces.",
    price: 99.99,
    courseInfo: "This course offers a deep dive into React, one of the most widely-used libraries in modern frontend development. Starting with the basics of components, props, and JSX, you'll quickly move on to more advanced topics such as hooks, state management with `useState`, `useReducer`, and `useContext`, as well as side-effects with `useEffect`. You will learn best practices in component composition, conditional rendering, form handling, and custom hooks. The course also covers React Router for client-side routing and performance optimization techniques using `React.memo`, `useMemo`, and `useCallback`. By the end, you’ll build fully functional SPA applications and gain confidence in using React to develop scalable, maintainable web apps.",
    img: reactImg,
    discount: 20,
    time: '50 hour',
    lastUpdate: '2024/10/12',
    prerequisites: 'JS',
    courseStatus: 'Completed'
  },
  {
    id: 4,
    title: "Complete node.js course",
    desc: "Learn to build backend services and APIs using Node.js and Express.",
    price: 150.79,
    courseInfo: "Dive into server-side development with Node.js, a fast, scalable runtime for building real-time applications. This course covers the fundamentals of asynchronous JavaScript, modules, and npm. You’ll learn how to create RESTful APIs using Express, connect to databases like MongoDB or PostgreSQL, implement authentication with JWT, and handle middleware for validation, error handling, and security. You'll also explore file uploads, environment configuration, and deploying applications to production using services like Vercel or Railway. By the end of this course, you’ll be able to create a fully functional backend server integrated with any frontend technology.",
    img: nodeJsImg,
    discount: 25,
    time: '120 hour',
    lastUpdate: '2024/5/12',
    prerequisites: 'JS',
    courseStatus: 'In holding'
  },
  {
    id: 5,
    title: "Next.js project-based training",
    desc: "Learn to build fast, SEO-friendly full-stack applications using Next.js.",
    price: 39.99,
    courseInfo: "Next.js is a powerful React-based framework for building production-grade web applications. This course walks you through routing, static site generation (SSG), server-side rendering (SSR), and dynamic rendering. You’ll learn about the file-based routing system, data fetching with `getStaticProps` and `getServerSideProps`, API routes, middleware, and serverless functions. You'll also explore image optimization, advanced deployment with Vercel, and authentication strategies. Each section of the course involves building real-world features, enabling you to build full-stack apps with frontend and backend logic combined in a single codebase.",
    img: nextJsImg,
    discount: 0,
    time: '20 hour',
    lastUpdate: '2024/1/15',
    prerequisites: 'JS & React',
    courseStatus: 'In holding'
  },
  {
    id: 6,
    title: "npm training course",
    desc: "Master npm – the package manager every JavaScript developer needs to know.",
    price: 28.50,
    courseInfo: "npm (Node Package Manager) is the backbone of JavaScript project dependency management. In this course, you'll understand how to initialize, manage, and maintain projects using `package.json`. You'll explore installing, updating, and removing packages, managing local vs. global dependencies, and working with version control. The course also covers scripts for automation, semantic versioning, and publishing your own packages to the npm registry. Through hands-on examples, you’ll gain the confidence to work with npm in real-world environments, ensuring your projects stay organized and up-to-date.",
    img: npmImg,
    discount: 3,
    time: '6 hour',
    lastUpdate: '2025/2/22',
    prerequisites: 'JS',
    courseStatus: 'Completed'
  },
  {
    id: 7,
    title: "Bootstrap project-based course",
    desc: "Build responsive websites quickly using the Bootstrap CSS framework.",
    price: 30,
    courseInfo: "Bootstrap is a leading CSS framework that helps developers build mobile-first, responsive designs efficiently. This course teaches the Bootstrap grid system, utility classes, layout components, and responsive breakpoints. You’ll work with elements like modals, carousels, navbars, and forms, customizing them to fit your project’s theme. Through project-based learning, you’ll see how to apply Bootstrap effectively in real-world UIs. Additionally, the course introduces Bootstrap theming and integrates the framework with React using `react-bootstrap`, enabling you to develop dynamic interfaces faster and more reliably.",
    img: bootstrapImg,
    discount: 5,
    time: '3 hour',
    lastUpdate: '2023/11/24',
    prerequisites: 'CSS & HTMl & Flex Box',
    courseStatus: 'Completed'
  },
  {
    id: 8,
    title: "Learning to work with git and github",
    desc: "Understand version control and collaboration using Git and GitHub.",
    price: 40,
    courseInfo: "This course teaches the fundamental and advanced concepts of Git and GitHub — the essential tools for modern software development. You'll learn how to track code history, manage branches, merge changes, resolve conflicts, and collaborate with teams. The course covers command-line Git usage, Git GUI tools, and essential workflows like `git flow` and `fork & pull request`. On GitHub, you'll explore repositories, issues, wikis, GitHub Actions, and setting up CI/CD pipelines. By the end, you’ll be able to manage version control and contribute to open-source or team projects effectively.",
    img: gitHubImg,
    discount: 5.01,
    time: '12 hour',
    lastUpdate: '2025/1/12',
    prerequisites: 'Coding & programming language',
    courseStatus: 'Completed'
  },
  {
    id: 9,
    title: "Project-based CSS training",
    desc: "Learn how to style professional websites with CSS through hands-on projects.",
    price: 0,
    courseInfo: "This course teaches you CSS from the ground up through real-world examples. You'll master selectors, specificity, inheritance, and the box model, along with modern layout techniques like Flexbox and Grid. You'll also cover animations, transitions, and responsive design using media queries. Each lesson is focused on building UI components such as navigation bars, cards, sliders, and responsive sections. You’ll also explore CSS variables and methodologies like BEM (Block Element Modifier) to write scalable, maintainable styles. This course helps you gain a deep understanding of how CSS drives the visual presentation of web apps.",
    img: cssImg,
    discount: 0,
    time: '30 hour',
    lastUpdate: '2025/3/4',
    prerequisites: 'HTML',
    courseStatus: 'Completed'
  },
  {
    id: 10,
    title: "HTML Basics Tutorial",
    desc: "Learn the fundamentals of web development with this beginner-friendly HTML course.",
    price: 0,
    courseInfo: "This course introduces HTML — the foundation of all web pages. You’ll learn how to structure documents with semantic elements like `header`, `section`, `article`, and `footer`. Topics include lists, links, images, tables, forms, and embedding multimedia. The course emphasizes clean, accessible markup and introduces best practices for SEO and screen-reader compatibility. You'll build practical mini-projects, such as landing pages and forms, helping you understand how HTML works in real-life scenarios. Ideal for beginners, this course sets a strong foundation for learning CSS and JavaScript.",
    img: htmlImg,
    discount: 0,
    time: '5 hour',
    lastUpdate: '2024/5/4',
    prerequisites: 'NONE',
    courseStatus: 'Completed'
  },
  {
    id: 11,
    title: "FlexBox Project-Based Course",
    desc: "Master layout design with CSS Flexbox by building practical components.",
    price: 20.49,
    courseInfo: "Flexbox is a powerful layout module in CSS that simplifies the alignment, distribution, and sizing of elements. In this course, you’ll learn the concepts of main axis, cross axis, container properties like `justify-content` and `align-items`, and item properties like `flex-grow`, `flex-shrink`, and `flex-basis`. You'll build responsive headers, footers, sidebars, galleries, and navigation menus. Each project is designed to reinforce your understanding of Flexbox behavior in different screen sizes. The course also teaches you how to debug layout issues using DevTools and how Flexbox integrates with Grid in modern responsive design.",
    img: flexBoxImg,
    discount: 2,
    time: '12 hour',
    lastUpdate: '2025/3/12',
    prerequisites: 'CSS & HTML',
    courseStatus: 'Completed'
  },
];

export default coursesList;

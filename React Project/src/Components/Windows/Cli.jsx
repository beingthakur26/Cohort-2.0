import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";

const Cli = () => {
  const commands = {
    echo: {
      description: "Echo a passed string.",
      usage: "echo <string>",
      fn: (...args) => args.join(" "),
    },
    about: {
      description: "About Me",
      usage: "about",
      fn: () =>
        "Manas Singh | Full Stack Developer based in India. Passionate about building web applications and exploring new technologies.",
    },
    skills: {
      description: "My Skills",
      usage: "skills",
      fn: () =>
        "Frontend: React, Redux, SCSS, Tailwind\nBackend: Node.js, Express, MongoDB\nTools: Git, Docker, VS Code",
    },
    projects: {
      description: "My Projects",
      usage: "projects",
      fn: () =>
        '1. Portfolio Website (This one!)\n2. E-commerce Platform\n3. Chat Application\n\nType "github" to see more.',
    },
    github: {
      description: "Github Profile",
      usage: "github",
      fn: () => {
        window.open("https://github.com/beingthakur26", "_blank");
        return "Opening GitHub profile...";
      },
    },
    contact: {
      description: "Contact Info",
      usage: "contact",
      fn: () =>
        "Email: manas@example.com\nLinkedIn: linkedin.com/in/manassingh",
    },
    socials: {
      description: "Social Media Links",
      usage: "socials",
      fn: () => "LinkedIn: linkedin.com/in/manassingh\nTwitter: @manassingh",
    },
    // System Commands
    ls: {
      description: "List files",
      usage: "ls",
      fn: () =>
        "index.html  src/  public/  package.json  README.md  .gitignore",
    },
    pwd: {
      description: "Print working directory",
      usage: "pwd",
      fn: () => "/home/manassingh/portfolio",
    },
    whoami: {
      description: "Current user",
      usage: "whoami",
      fn: () => "guest@portfolio",
    },
  };

  const welcomeMessage = `Welcome to the React terminal!
  
Type "help" to see all available commands.

Try starting with:
- "about"
- "skills" 
- "projects"
`;

  return (
    <MacWindow>
      <div className="cli-window">
        <Terminal
          className="terminal"
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel={"manassingh:~$"}
          promptLabelStyle={{
            color: "#00ff00",
            fontWeight: "bold",
          }}
          inputStyle={{
            color: "white",
            fontWeight: "normal",
            outline: "none",
            border: "none",
            background: "transparent",
          }}
          style={{
            borderRadius: 0,
            minHeight: "100%",
          }}
          contentStyle={{
            padding: "20px",
          }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;

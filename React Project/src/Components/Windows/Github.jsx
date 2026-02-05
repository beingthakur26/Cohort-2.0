import React from "react";
import MacWindow from "./MacWindow";
import githubData from "../../assets/github.json";

const Github = ( {windowName, activeWindow, setActiveWindow} ) => {

  const GithubCard = ({
    data = {
      id: 1,
      image: "",
      title: "",
      description: "",
      tags: [],
      repoLink: "",
      demoLink: "",
    }}) => {
    return (
      <div className="card" key={data.id}>
        <div className="img-container">
          <img src={data.image} alt={data.title} />
        </div>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <div className="tags">
          {data.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="links">
          <a
            href={data.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn"
          >
            Repo
          </a>
          <a
            href={data.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn"
          >
            Demo
          </a>
        </div>
      </div>
    );
  };

  return (
    <div>
      <MacWindow windowName={windowName} activeWindow={activeWindow} setActiveWindow={setActiveWindow}>
        <div className="cards">
          {githubData.map((item) => (
            <GithubCard data={item} />
          ))}
        </div>
      </MacWindow>
    </div>
  );
};

export default Github;

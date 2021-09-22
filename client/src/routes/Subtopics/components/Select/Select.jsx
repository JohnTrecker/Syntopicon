import React from "react";
import './Select.scss'

const Select = ({subtopics, handleSelect}) => {
  
  return (
    <ul>
      {subtopics.map(sub => renderSubtopic(sub))}
    </ul>
  )

  function renderSubtopic(subtopic, isChild = false) {
    const { number, id, subtopic: title, subtopics: children } = subtopic;
    const indentClass = `indent-${number.split('.').length}`
    const args = { title, id, children, indentClass };

    return isChild ? renderAsChild(args) : renderAsParent(args);
  }

  function renderAsParent(args){
    return args.children.length
      ? renderParentWithChildren(args)
      : renderParent(args);
  }

  function renderAsChild(args) {
    return args.children.length
      ? renderChildWithChildren(args)
      : renderChild(args);
  }

  function renderParent({ title, id }) {
    return (
      <li key={id} className="subtopics-list-item">
        <h2 onClick={() => handleSelect({ id, title })}>{title}</h2>
      </li>
    );
  }

  function renderChild({ title, id, indentClass }) {
    return (
      <div key={id} className={`subtopics-list-item ${indentClass}`}>
        <p
          className="link"
          onClick={() => handleSelect({id, title})}>{title}
        </p>
      </div>
    );
  }

  function renderParentWithChildren({ title, id, children, indentClass }) {
    return (
      <li key={id} className={`subtopics-list-item ${indentClass}`}>
        <input type="checkbox" />
        <i></i>
        <h2>{title}</h2>
        <div className="subtopics-list-item content">
          {children.map(sub => renderSubtopic(sub, true))}
        </div>
      </li>
    );
  }

  function renderChildWithChildren({ title, id, children, indentClass }) {
    return (
      <div key={id} className={`subtopics-list-item ${indentClass}`}>
        <input type="checkbox" />
        <i></i>
        <p
          className="link"
          onClick={() => handleSelect({id, title})}>{title}
        </p>
        <div className="content">
          {children.map(sub => renderSubtopic(sub, true))}
        </div>
      </div>
    );
  }
}

export default Select;
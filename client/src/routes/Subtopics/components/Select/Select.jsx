import React from "react";
import './Select.scss'

const Select = ({subtopics, handleSelect}) => {
  const renderSubtopic = (subtopic, isChild=false) => {
    const { number, id, subtopic: title, subtopics: children } = subtopic;
    // const label = `${number} - ${title}`;
    const indentClass = `indent-${number.split('.').length}`
    const args = { title, id, children, indentClass };
    // console.log('label: ', label, ' isChild: ', isChild)

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

  return (
    <ul>
      {subtopics.map(sub => renderSubtopic(sub))}
    </ul>
  )
}

export default Select;


// <ul className="list">
    //   <li className="item">
    //     <input className="checkbox" type="checkbox" checked/>
    //     <i></i>
    //     <h2>Languages Used</h2>
    //     <div class="content">
    //       <p>This page was written in HTML and CSS. The CSS was compiled from SASS. I used Normalize as my CSS reset and -prefix-free to save myself some headaches. I haven't quite gotten the hang of Slim for compiling into HTML, but someday I'll use it since its syntax compliments that of SASS. Regardless, this could all be done in plain HTML and CSS.</p>
    //     </div>
    //   </li>
    //   <li className="item">
    //     <input className="checkbox" type="checkbox" checked/>
    //     <i></i>
    //     <h2>How it Works</h2>
    //     <div class="content">
    //       <p>Using the sibling and checked selectors, we can determine the styling of sibling elements based on the checked state of the checkbox input element. One use, as demonstrated here, is an entirely CSS and HTML accordion element. Media queries are used to make the element responsive to different screen sizes.</p>
    //     </div>
    //   </li>
    //   <li className="item">
    //     <input className="checkbox" type="checkbox" checked/>
    //     <i></i>
    //     <h2>Points of Interest</h2>
    //     <div class="content">
    //       <p>By making the open state default for when :checked isn't detected, we can make this system accessable for browsers that don't recognize :checked. The fallback is simply an open accordion. The accordion can be manipulated with Javascript (if needed) by changing the "checked" property of the input element.</p>
    //     </div>
    //   </li>
    // </ul>

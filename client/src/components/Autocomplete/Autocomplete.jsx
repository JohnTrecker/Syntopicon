import React, { useState } from "react";
import './Autocomplete.scss'
import MagnifyingGlass from "icons/MagnifyingGlass";

const Autocomplete = (props) => {
  const [state, setState] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: ""
  })

  const filteredSuggestions = (suggestions, userInput) => suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  );

  const renderSelectionTree = (input=null) => {
    const { activeSuggestion, filteredSuggestions } = state;
    const selection = input || filteredSuggestions[activeSuggestion]
    console.log('SELECTION in renderSelectionTree: ', selection)
    if (selection) props.handleSelect(selection)
  }

  const onChange = e => {
    const { suggestions } = props;
    const userInput = e.currentTarget.value;

    setState({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions(suggestions, userInput),
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  const onClick = e => {
    const input = e.currentTarget.innerText
    setState({
      activeSuggestion: state.filteredSuggestions.findIndex((s) => s === input),
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: input
    });
    renderSelectionTree(input)
  };

  const onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      renderSelectionTree()
      setState({
        ...state,
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion] || ""
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setState({ ...state, showSuggestions: true, activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow or tab
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setState({ ...state, showSuggestions: true, activeSuggestion: activeSuggestion + 1 });
    }
  };

  const suggestionsListComponent = () => {
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = state
    const n = filteredSuggestions.length
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (n) {
        // Cf. Note on select size = 1 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes
        const visibleOptions = 2 //n > 5 ? 5 : n === 1 ? 2 : n
        suggestionsListComponent = (
          <select className="autocomplete-select" name="suggestions" size={visibleOptions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className = "autocomplete-option";
              let selected = false

              if (index === activeSuggestion) {
                className = "autocomplete-option active";
                selected = true
              }

              return (
                <option
                  className={className}
                  selected={selected}
                  key={suggestion}
                  value={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </option>
              );
            })}
          </select>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
    return suggestionsListComponent
  }

  return (
    <div className="autocomplete--container">
      <MagnifyingGlass width="15px" height="15px" fill="#F5F5F5" />
      <input
        type="text"
        className="autocomplete-input"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search by topic"
        value={state.userInput}
        tabIndex={1}
        autoFocus
      />
      {suggestionsListComponent()}
    </div>
  );
}

export default Autocomplete;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("chicken");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // Two useEffect() functions to to fix warning message
  // in browser console: React Hooks useEffect has a
  // missing dependency

  // useEffect function 1.
  // When term piece of state changes, setTimeout to
  // update another piece of state debouncedTerm with
  // value of term.
  // If user input ie. term changes then cancel timer
  // and set another to update debouncedTerm
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  // useEffect function 2.
  // When debouncedTerm changes, so when user has typed
  // in term and waited for 1000ms, only then search
  // request is made to Wikipedia api.
  // Piece of state results is assigned value of
  // returned response.data object
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };

    // Search request is made only if debouncedTerm
    // has some value.
    // If input field is empty so term and debouncedTerm
    // value is empty string "" then search() is not
    // called
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  // useEffect() first version before refactoring to two
  // useEffect functions above
  // First argument is function to execute. The callback
  // cannot be async. But inside callback can have async.
  // Second argument configures when first function is run
  // Options for second argument:
  // 1. [] empty array - run once at initial render
  // 2 nothing - run at initial render and after every
  // re-render
  // 3. [value1, value2...] array with some values inside
  // - run at initial render and after every re-render if
  // some of array values have changed since last render

  //   useEffect(() => {
  //     const search = async () => {
  //       // Destructure data object from response.data
  //       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         params: {
  //           action: "query",
  //           list: "search",
  //           origin: "*",
  //           format: "json",
  //           srsearch: term,
  //         },
  //       });
  //       setResults(data.query.search);
  //     };

  //     // If first time rendering so results array is empty
  //     // then do not setTimeout but search immediately
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       // When executing setTimeout it returns a timeout Id
  //       // as integer (e.g. 115) that can be passed as argument
  //       // to cancelTimeout() to cancel the set timer.
  //       const timeoutId = setTimeout(() => {
  //         if (term) {
  //           search();
  //         }
  //       }, 1000);

  //       // When useEffect() is called it executes code inside it
  //       // and returns a callback function (cleanup function).
  //       // This returned function is then executed when
  //       // useEffect() is called again.
  //       // So when input changes in search field useEffect()
  //       // is called and setTimeout() timer starts and
  //       // clearTimeout() callback is returned to browser.
  //       // When input changes again this returned clearTimeout()
  //       // is called and then useEffect() ran again and another
  //       // clearTimeout returned to wait for execution.
  //       // If input does not change for 1000ms then search
  //       // request is sent to Wikipedia api
  //       return () => {
  //         clearTimeout(timeoutId);
  //       };
  //     }
  //   }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button primary tiny"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}>
            View Page
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}></input>
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;

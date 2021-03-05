import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios.post second argument is object sent with post
// request body. Third argument is object sent in query
// string. Google Translate api docs specify not to send
// params in the body of the request but in the query string
// of the request (it is possible to send in body too, but
// for this api the docs say to use query string). This is
// why second argument body object is empty and params are
// in the third argument.
// Helper function doTranslation async/await as useEffect
// cannot be async itself. Destructure data object from
// response and set translated piece of state value as
// translated text inside data object. Remember to run
// doTranslation function inside useEffect.
// Use debouncedText same as in Search Component to
// throttle or limit search request frequency.
// No need to send new request with every key press
const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: process.env.REACT_APP_TRANSLATE_KEY,
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [debouncedText, language]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;

import axios from "axios";

const request = axios.create({
  baseURL: "url here"
});

export const functionName = topic => {
  return request
    .get("path here", { params: { topic } }) // ?topic=football
    .then(({ data }) => data);
};

// when importing do it as "import * as api from 'api.js' so when a function is called it is done by api.function"

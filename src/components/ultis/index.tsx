import { createTemplate } from "./questionTemplate";

const DBSERVER = {
  url:
    process.env.NODE_ENV !== "development"
      ? "https://survey-middleware.herokuapp.com"
      : "http://localhost:3000",
};

export { createTemplate, DBSERVER };

import { createTemplate } from "./questionTemplate";

const DBSERVER = {
  url:
    process.env.NODE_ENV !== "development"
      ? "https://survey-middleware.herokuapp.com"
      : "http://localhost:3000",
};

export { createTemplate, DBSERVER };

const sessionKey = "surveyState";

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(sessionKey, serializedState);
  } catch (e) {
    console.log(e);
  }
};
export const clearAuthenticationKey = () => {
  try {
    localStorage.removeItem(sessionKey);
  } catch (e) {
    console.log(e);
  }
}
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(sessionKey);
    if (serializedState == null) {
      return undefined;
    }
    return { ...JSON.parse(serializedState) };
  } catch (e) {
    return undefined;
  }
};

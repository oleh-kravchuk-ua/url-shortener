export const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const defaultOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
};

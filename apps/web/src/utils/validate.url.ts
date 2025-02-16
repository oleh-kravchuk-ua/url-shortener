const listValidProtocols = ["http:", "https:"];

export const isValidHttpUrl = (string: string): boolean => {
  try {
    const newUrl = new URL(string);
    return listValidProtocols.includes(newUrl.protocol);
  } catch (_error) {
    //console.log(error);
    return false;
  }
};

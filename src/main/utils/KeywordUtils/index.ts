export const stringMatches = (main:string, check:string) =>
  main
    .toLowerCase()
    .split(" ")
    .join("")
    .includes(
      check
        .toLowerCase()
        .split(" ")
        .join("")
    );

export const keywordMatches = (itemName:string, keywordString:string) => {
  const split = keywordString
    .split(" ")
    .join("")
    .split(",");
  if (split.length === 1 && split[0] === "") {
    return true;
  }
  for (let keyword of split) {
    if (keyword.substr(0, 1) === "-") {
      // if does contain negative keyword, L
      if (keyword.length < 2 || stringMatches(itemName, keyword.substring(1)))
        return false;
    } else if (keyword.substring(0, 1) === "+") {
      // if does not contain positive keyword, L
      if (keyword.length < 2 || !stringMatches(itemName, keyword.substring(1)))
        return false;
    } else {
      // if does not contain normal keyword, L
      if (!stringMatches(itemName, keyword)) return false;
    }
  }
  return true;
};

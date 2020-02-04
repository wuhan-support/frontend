import Console from "./Console";

function isNull(o) {
  return o === "" || o === null || o === undefined;
}

function link (url, targetBlank=false) {
  const content = {}
  if (url) {
    content["href"] = url
  } else {
    return null
  }
  if (targetBlank) content["target"] = "_blank";
  return content
}

// eslint-disable-next-line no-unused-vars
function formatContact (name, content) {
  // if there's nothing we will do nothing
  if (isNull(name) && isNull(content)) return null;
  Console.debug("contact", name, content)

  return {
    name: `负责人：${!isNull(name) ? name : "(姓名未知)"}`,
    content: `电话：${!isNull(content) ? content : "(电话未知)"}`,
    link: content ? link(`tel://${content}`) : null
  }
}

function split (string, delimiter) {
  if (isNull(string)) return [];
  if (typeof string !== "string") return [string];
  return string.split(delimiter)
}

export default {
  contacts (name, content, delimiter=" ") {
    const results = [];

    const names = split(name, delimiter);
    const contents = split(content, delimiter);

    if (names.length === contents.length && names.length) {
      for (const index in names) {
        const formatted = formatContact(names[index], contents[index]);
        if (formatted) results.push(formatted)
      }
    } else {
      const formatted = formatContact(name, content);
      if (formatted) results.push(formatted)
    }

    return results
  },
  trueness (str) {
    if (!str) return {t: false, r: ""}
    const splitted = str.split("\n")
    if (splitted.length === 2) {
      return {t: splitted[0] === "是", r: splitted[1]}
    }
    return {t: false, r: ""}
  }
}

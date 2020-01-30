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

  name = `负责人：${!isNull(name) ? name : "(未知姓名)"}`;

  let url = content ? link(`tel://${content}`) : null;

  content = `电话：${!isNull(content) ? content : "(未知电话)"}`;

  return {name, content, url}
}

function split (string, delimeter) {
  if (isNull(string)) return [];
  if (typeof string !== "string") return [string];
  return string.split(delimeter)
}

export default {
  contacts (name, content) {
    const results = [];
    console.log(name, typeof name, content, typeof content);

    const names = split(name, " ");
    const contents = split(content, " ");

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

export default {
  version: process.env.npm_package_version,
  api: {
    // TODO: get the correct backend url
    base: 'https://api.example.com/service/'
  },
  cdn: {
    // TODO: get a cdn ;)
    // notice that there's NO trailing slash at the end of this string
    global: 'https://cdn.example.com'
  }
}

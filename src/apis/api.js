import service from "../utils/service";
export default {
  accommodations () {
    return service.get("/accommodations/json")
  },
  platforms () {
    return service.get("/platforms/json")
  },
  reportIncorrect ({type, content}) {
    return service.post("/report", {type, content})
  }
}

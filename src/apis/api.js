import service from "../utils/service";
export default {
    accommodations () {
        return service.get("/accommodations")
    },
    psychologicalPlatform () {
        return service.get("/platforms/psychological")
    },
    medicalPlatform () {
        return service.get("/platforms/medical")
    },
    supplies () {
        return service.get("/hospital/supplies")
    },
    reportIncorrect ({ type, cause, content }) {
        return service.post("/report", { type, cause, content })
    },
    formTest () {
        return service.get("/formTest")
    },
}

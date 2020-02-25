import service from "../utils/service";
export default {
  accommodations() {
    return service.get("/accommodations");
  },
  peopleAccommodations() {
    return service.get("/people/accommodations");
  },
  psychologicalPlatform() {
    return service.get("/platforms/psychological");
  },
  medicalPlatform() {
    return service.get("/platforms/medical");
  },
  supplies() {
    return service.get("/hospital/supplies/v2");
  },
  communitySupplies() {
    return service.get("/community/supplies");
  },
  reportIncorrect({
    type,
    cause,
    content
  }) {
    return service.post("/report", {
      type,
      cause,
      content
    });
  },
  submitSupplies(data) {
    return service.post("/hospital/supplies/submissions", data);
  },
  submitCommunitySupplies(data) {
    return service.post("/community/supplies/submissions", data);
  },
  realTimeMsgs(data) {
    return service.get("/wiki/stream", data);
  },
};

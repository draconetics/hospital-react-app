import http from "../config/http-common";

class HospitalService {
  getAll() {
    return http.get("/hospitals");
  }
/*
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
*/
  create(data) {
    return http.post("/hospitals", data);
  }

  update(id, data) {
    return http.put(`/hospitals/${id}`, data);
  }


  delete(id) {
    return http.delete(`/hospitals/${id}`);
  }
/*
  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new HospitalService();

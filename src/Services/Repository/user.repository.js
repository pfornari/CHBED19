// import userDao from "../DAOS/mongoDB/user.dao.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUser = async (uid) => {
    return await this.dao.getUser(uid);
  };
  updateUserRole = async (uid, role) => {
    return await this.dao.updateUserRole(uid, role);
  };
  updateUserStatus = async (uid) => {
    return await this.dao.updateUserStatus(uid);
  };
  updateUserFiles = async (uid, imgName, imgPath) => {
    return await this.dao.updateUserFiles(uid, imgName, imgPath);
  };
  updatePassword = async (email, password) => {
    return await this.dao.updatePassword(email, password);
  };
  updateConnection = async (email, loginTime) => {
    return await this.dao.updateConnection(email, loginTime);
  };
  findUser = async (email) => {
    return await this.dao.findUser(email);
  };
}

// export default new UserRepository();

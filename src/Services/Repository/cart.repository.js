// import cartDao from "../DAOS/mongoDB/cart.dao.js";
//ver si usando factory puedo cambiar cartDao por this.dao.
export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    return await this.dao.findCart();
  };
  getById = (cid) => { 
    return this.dao.findCartById(cid);
  };
  save = (cart) => {
    return this.dao.createCart(cart);
  };
  addProduct = (cid, pid) => {
    return this.dao.addProductToCart(cid, pid);
  };
  update = (cid, cart) => {
    return this.dao.updateCart(cid, cart);
  };
  updateProduct = (cid, pid, quantity) => {
    return this.dao.updateOneProduct(cid, pid, quantity);
  };
  delete = (cid) => {
    return this.dao.deleteCart(cid);
  };
  deleteProduct = (cid, pid) =>{
    return this.dao.deleteOneProduct(cid, pid);
  };
  getTotal = (cart) => {
    return this.dao.getTotal(cart);
  }
}


// export default new CartRepository();

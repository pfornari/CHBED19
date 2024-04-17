// import ticketDao from "../DAOS/mongoDB/ticket.dao.js";

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = () => {
    return this.dao.getAll();
  };
  getById = (id) => {
    return this.dao.findOneTicket(id);
  };
  save = (ticket) => {
    return this.dao.generateTicket(ticket);
  };
}


// export default new TicketRepository();

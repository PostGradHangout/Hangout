import Documents from '../models/mongo_model';

const serverUtils = {
  getAllClients: (clients: any, username: any, roomId: any) => {
    return Array.from(clients || []).map((socketId: any) => {
      return {
        socketId,
        username,
      };
    });
  },
  findOrCreateDocument: async (_id: any, data: string = '') => {
    if (_id == null) return;
    const document = await Documents.findById(_id);
    if (document) return document;
    return await Documents.create({ _id, data });
  },
};
export default serverUtils;

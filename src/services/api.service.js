import http from '../configs/http-common';

const GET = async path => {
  const res = await http.get(`${path}`);

  return res.data;
};

const POST = async (path, params) => {
  const res = await http.post(`${path}`, params);

  return res.data;
};

const PUT = async (path, params) => {
  const res = await http.put(`${path}`, params);

  return res.data;
};

const DELETE = async path => {
  const res = await http.delete(`${path}`);

  return res;
};

const getContacts = () => GET('/contact');
const getContactDetail = id => GET(`/contact/${id}`);
const addContact = params => POST('/contact', params);
const updateContact = (id, params) => PUT(`/contact/${id}`, params);
const deleteContact = id => DELETE(`/contact/${id}`);

const restApi = {
  getContacts,
  getContactDetail,
  addContact,
  updateContact,
  deleteContact,
};

export default restApi;

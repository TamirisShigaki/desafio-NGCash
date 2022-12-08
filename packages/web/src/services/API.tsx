import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ILogin } from '../interfaces/LoginInterface';
import { IBalance } from '../interfaces/BalanceInterface';
import { INewTransaction } from '../interfaces/NewTransactionInterface';

const URL = 'http://localhost:3025/';

const login = async (data: ILogin): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.post(`${URL}login`, data);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const setNewUser = async (data: ILogin): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${URL}newUser`, data);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const getBalance = async (token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${URL}balance`, { headers: { Authorization: token } });
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const getTransaction = async (data: IBalance, token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${URL}transaction`, data, { headers: { Authorization: token } });
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

const setNewTransfer = async (data: INewTransaction, token: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`${URL}cashOutIn`, data, { headers: { Authorization: token } });
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export { login, setNewUser, getBalance, getTransaction, setNewTransfer };

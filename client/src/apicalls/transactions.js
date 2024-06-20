const { axiosInstance } = require(".");

//verify receiver account

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetTransactionsofUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/transactions/get-all-transactions-by-user"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//transfer funds
export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/transactions/transfer-fund",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Deposit funds using stripe
export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/transactions/deposit-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

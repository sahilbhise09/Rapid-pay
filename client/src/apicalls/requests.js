import { axiosInstance } from ".";

//get All request for a user

export const GetAllRequestsByUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/requests/get-all-requests-by-user"
    );
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//send a request to another user
export const SendRequest = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/requests/send-request",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//update request status
export const UpdateRequestStatus = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "https://rapid-pay-szad.onrender.com/api/requests/update-request-status",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

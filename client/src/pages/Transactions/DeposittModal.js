import React, { useState } from "react";
import { Modal, message } from "antd";
import { Form } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loadersSlice";
function DeposittModal({ showDepositModal, setShowDepositModal, reloadData }) {
  const [amount = 10, setAmount] = useState(10);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onToken = async (token) => {
    try {
      dispatch(showLoading());
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      dispatch(hideLoading());
      if (response.success) {
        console.log(response.message);
        reloadData();
        setShowDepositModal(false);
        message.success(response.message);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      console.log(error.message);
      dispatch(hideLoading());
      // message.error(error.message);
    }
    console.log(token);
  };

  // const onToken = async (token) => {
  //   try {
  //     dispatch(showLoading());

  //     // Prepare the payload with token and amount
  //     const payload = {
  //       token,
  //       amount: form.getFieldValue("amount"),
  //     };

  //     // Make the API call to deposit funds
  //     const response = await DepositFunds(payload);

  //     // Handle the response
  //     if (response.success) {
  //       console.log(response.message); // Log success message
  //       reloadData(); // Reload data to reflect the changes
  //       setShowDepositModal(false); // Close the deposit modal
  //       message.success(response.message); // Show success message
  //     } else {
  //       message.error(response.error || "Transaction failed"); // Show error message
  //     }

  //   } catch (error) {
  //     console.log(error.message); // Log the error message
  //     message.error(error.message || "An error occurred"); // Show error message
  //   } finally {
  //     dispatch(hideLoading()); // Ensure loading is hidden in both success and error cases
  //   }

  //   console.log(token); // Log the token for debugging purposes
  // };

  return (
    <div>
      <Modal
        title="Deposit"
        open={showDepositModal}
        onCancel={() => setShowDepositModal(false)}
        footer={null}
      >
        <div className="flex-col gap-1">
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input amount",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>
            <div className="flex justify-end">
              <button className="primary-outlined-btn">Cancel</button>
              <StripeCheckout
                token={onToken}
                currency="USD"
                amount={form.getFieldValue("amount") * 100}
                shippingAddress
                stripeKey="pk_test_51PTEmiKO6yDDWASSzuAC1Ve1GfdxrvLQuMGbZD5bdEvoLN5GEqCeeJryjktJLjXTPl8Vmo4gSloMbXmFNDsDplfi00UjJ6jVwE"
              >
                <button className="primary-contained-btn">Deposit</button>
              </StripeCheckout>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default DeposittModal;

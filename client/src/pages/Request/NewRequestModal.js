import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loadersSlice";
import { VerifyAccount } from "../../apicalls/transactions";
import { SendRequest } from "../../apicalls/requests";
function NewRequestModal({
  showNewRequestModal,
  setShowNewRequestModal,
  reloadData,
}) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const verifyAccount = async () => {
    try {
      dispatch(showLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(hideLoading());
      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      dispatch(hideLoading());
      setIsVerified("false");
    }
  };

  const onFinish = async (values) => {
    try {
      if (values.amount > user.balance) {
        message.error("Insufficient Balance");
        return;
      }
      dispatch(showLoading());
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference || "no reference",
        status: "success",
      };
      const response = await SendRequest(payload);
      if (response.success) {
        setShowNewRequestModal(false);
        message.success(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };
  return (
    <div>
      <Modal
        title="Request funds"
        open={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onCancel={() => setShowNewRequestModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="Account Number" name="receiver" className="w-100">
              <input type="text" />
            </Form.Item>
            <button
              className="primary-contained-btn"
              type="button"
              onClick={verifyAccount}
            >
              Verify
            </button>
          </div>

          {isVerified === "true" && (
            <div className="success-bg">
              <h1 className="text-sm">Account verified successfully</h1>
            </div>
          )}
          {isVerified === "false" && (
            <div className="error-bg">
              <h1 className="text-sm">Invalid Account</h1>
            </div>
          )}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your amount",
              },
              // {
              //   max: user.balance,
              //   message: "Insufficient balance",
              // },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            {isVerified && (
              <button className="primary-contained-btn">Request</button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default NewRequestModal;

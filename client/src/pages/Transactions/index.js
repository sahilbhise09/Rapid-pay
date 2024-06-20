import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferFundsModal from "./TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loadersSlice";
import { GetTransactionsofUser } from "../../apicalls/transactions";
import moment from "moment";
import DeposittModal from "./DeposittModal";

const Index = () => {
  const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
  const [data = [], setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        return `${record.amount} ₹ `;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if (record.sender._id === record.receiver._id) {
          return "Deposit";
        } else if (record.sender._id === user._id) {
          return "Debit";
        } else return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      // render: (text, record) => {
      //   return record.sender._id === user._id ? (
      //     <div>
      //       <h1 className="text-sm">
      //         {record.receiver.firstName}
      //         {record.receiver.lastName}
      //       </h1>
      //     </div>
      //   ) : (
      //     <div>
      //       <h1 className="text-sm">
      //         {record.sender.firstName}
      //         {record.sender.lastName}
      //       </h1>
      //     </div>
      //   );
      // },
      render: (text, record) => {
        return record.sender === user._id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetTransactionsofUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transaction" />
        <div className="flex gap-1">
          <button
            className="primary-contained-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" />
      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />
      )}

      {showDepositModal && (
        <DeposittModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Index;

import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment";
import { api } from "../../contexts/AuthProvider";
import useStudySessions from "../../hooks/useStudySessions";

const ManageSessions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setisRejectModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [sessionAmount, setSessionAmount] = useState(0);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const {
    data: sessions,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudySessions(searchText);

  const pendingSessions = sessions?.filter(
    (session) => session.status === "pending" || session.status === "requested"
  );
  const acceptedSessions = sessions?.filter(
    (session) => session.status === "accepted"
  );
  const rejectedSessions = sessions?.filter(
    (session) => session.status === "rejected"
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "accepted":
        return <span className="badge badge-success">Accepted</span>;
      case "rejected":
        return <span className="badge badge-error">Rejected</span>;
      default:
        return null;
    }
  };

  const handleChangeStatus = async (session, status) => {
    if (status === "accepted") {
      setSelectedSession(session);
      setIsModalOpen(true);
    } else if (status === "rejected") {
      setSelectedSession(session);
      setisRejectModalOpen(true);
    }
  };

  const handleSessionPaid = async () => {
    const res = await api.post(
      `/api/update-study-seesion/${selectedSession._id}`,
      { fee: Number(sessionAmount || 0), status: "accepted" }
    );

    if (res.status === 200) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Session fee updated to ${sessionAmount}`,
      });
    }
  };

  const handleRejection = async () => {
    const reason = rejectionReason === "Other" ? customReason : rejectionReason;
    if (!reason) {
      Swal.fire("Error", "Please provide a reason for rejection.", "error");
      return;
    }

    try {
      const res = await api.post(
        `/api/update-study-seesion/${selectedSession._id}`,
        {
          status: "rejected",
          rejectionReason: reason,
          feedback,
        }
      );

      if (res.status === 200) {
        refetch();
        setisRejectModalOpen(false);
        setIsModalOpen(false);
        setSelectedSession(null);
        Swal.fire("Success", "Session has been rejected.", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to reject the session. Try again.", "error");
    }
  };

  const handleDeleteSession = async (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. Do you want to delete this session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await api.delete(
            `/api/delete-study-seesion/${sessionId}`
          );
          if (res.status === 200) {
            refetch();
            Swal.fire("Deleted!", "The session has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
  };

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Manage Sessions</h2>

      <div className="mb-4">
        <div className="badge badge-warning mr-2">
          Pending: {pendingSessions?.length}
        </div>
        <div className="badge badge-success mr-2">
          Accepted: {acceptedSessions?.length}
        </div>
        <div className="badge badge-error">
          Rejected: {rejectedSessions?.length}
        </div>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by topic or instructor"
          className="input input-bordered w-full max-w-xs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="max-h-screen overflow-auto">
        {/* Pending Sessions */}
        <div className="flex gap-2 items-center">
          <h3 className="text-2xl font-semibold">Pending Sessions</h3>
          <div className="badge badge-primary mr-2">
            {pendingSessions?.length}
          </div>
        </div>
        <div className="overflow-x-auto mb-6">
          {isLoading && (
            <div className="text-center">
              <span>Loading...</span>
            </div>
          )}
          <table className="table table-auto w-full text-gray-700 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Topic</th>
                <th className="p-3 text-left">Registration Start</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Instructor</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSessions?.map((session) => {
                return (
                  <tr key={session._id} className="hover:bg-gray-100">
                    <td className="p-3">{session.title}</td>
                    <td className="p-3">
                      {moment(session.registrationStart).format("LL")}
                    </td>
                    <td className="p-3">{session.duration}h</td>
                    <td className="p-3">{session.tutorName}</td>

                    <td className="p-3 uppercase">
                      {session.status === "requested" ? (
                        <div className="badge badge-primary mr-2">
                          {session.status}
                        </div>
                      ) : (
                        session.status
                      )}
                    </td>
                    <td className="p-3">
                      <img
                        src={session.image}
                        alt={session.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        id="status"
                        defaultValue={session.status}
                        onChange={(e) =>
                          handleChangeStatus(session, e.target.value)
                        }
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Accepted Sessions */}
        <div className="flex gap-2 items-center">
          <h3 className="text-2xl font-semibold">Accepted Sessions</h3>
          <div className="badge badge-success mr-2">
            {acceptedSessions?.length}
          </div>
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="table table-auto w-full text-gray-700 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Topic</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Instructor</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {acceptedSessions?.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="p-3">{session.title}</td>
                  <td className="p-3">
                    {moment(session.registrationStart).format("LL")}
                  </td>
                  <td className="p-3">{session.duration}h</td>
                  <td className="p-3">{session.tutorName}</td>
                  <td className="p-3">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{getStatusBadge(session.status)}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {/* <button className="btn btn-sm btn-warning">
                        <FaEdit />
                      </button> */}

                      <button
                        className="btn btn-sm btn-error ml-2"
                        onClick={() => handleDeleteSession(session._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rejected Sessions */}
        <div className="flex gap-2 items-center">
          <h3 className="text-2xl font-semibold">Rejected Sessions</h3>
          <div className="badge badge-error mr-2">
            {rejectedSessions?.length}
          </div>
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="table table-auto w-full text-gray-700 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Topic</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Instructor</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {rejectedSessions?.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="p-3">{session.title}</td>
                  <td className="p-3">
                    {moment(session.registrationStart).format("LL")}
                  </td>
                  <td className="p-3">{session.duration}h</td>
                  <td className="p-3">{session.tutorName}</td>
                  <td className="p-3">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{getStatusBadge(session.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-semibold">Session Details</h3>
            <div className="my-4">
              <label className="mr-4">Is the session paid?</label>
              <input
                type="radio"
                name="payment"
                id="free"
                checked={!isPaid}
                onChange={() => {
                  setIsPaid(false);
                  setSessionAmount(0);
                }}
              />
              <label htmlFor="free" className="mr-4">
                Free
              </label>
              <input
                type="radio"
                name="payment"
                id="paid"
                checked={isPaid}
                onChange={() => setIsPaid(true)}
              />
              <label htmlFor="paid">Paid</label>
            </div>

            {isPaid && (
              <div className="my-4">
                <label htmlFor="amount" className="block">
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={sessionAmount}
                  onChange={(e) => setSessionAmount(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  min="0"
                />
              </div>
            )}

            <div className="modal-action">
              <button className="btn btn-success" onClick={handleSessionPaid}>
                Update
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isRejectModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-semibold">Rejection Details</h3>
            <div className="my-4">
              <label className="block mb-2">Reason for Rejection</label>
              <select
                className="select select-bordered w-full"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Not Interested">Not Interested</option>
                <option value="Schedule Conflict">Schedule Conflict</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {rejectionReason === "Other" && (
              <div className="my-4">
                <label htmlFor="reason" className="block mb-2">
                  Please specify:
                </label>
                <input
                  type="text"
                  id="reason"
                  className="input input-bordered w-full"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              </div>
            )}

            <div className="my-4">
              <label htmlFor="feedback" className="block mb-2">
                Additional Feedback (Optional):
              </label>
              <textarea
                id="feedback"
                className="textarea textarea-bordered w-full"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide any additional comments here..."
              ></textarea>
            </div>

            <div className="modal-action">
              <button className="btn btn-success" onClick={handleRejection}>
                Submit
              </button>
              <button
                className="btn"
                onClick={() => setisRejectModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSessions;

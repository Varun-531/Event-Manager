import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useCookies } from "react-cookie";

const InvitePopup = ({ users, creator, eventId, onClose }) => {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);

  const handleInvite = (userId) => async () => {
    if (userId === creator) {
      toast.error("You cannot invite yourself");
    } else {
      //   setLoading(true);
      axios
        .post(
          `https://event-manager-ghso.onrender.com/add-invite`,
          { eventId, to: userId, from: creator },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success("User invited successfully", res.data.message);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("An error occurred");
          console.log(err);
        });
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <PropagateLoader
            loading={loading}
            speedMultiplier={1}
            size={20}
            aria-label="Loading Spinner"
          />
        </div>
      )}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30vw]">
          <h2 className="text-2xl font-semibold mb-4">Invite Users</h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user, index) => {
                const isInvited =
                  user.events.includes(eventId) || user._id === creator;
                return (
                  <div key={index} className="mb-2">
                    <button
                      onClick={handleInvite(user._id)}
                      className={`float-right font-medium ${
                        isInvited
                          ? "text-slate-400 cursor-not-allowed"
                          : "text-slate-800 font-semibold"
                      } px-2 py-1 rounded-md`}
                      disabled={isInvited}
                    >
                      {isInvited ? "Invited" : "Invite"}
                    </button>
                    <div>
                      <h3 className="font-semibold">{user.username}</h3>
                      <h4 className="font-base">{user.email}</h4>
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>No users found</p>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

InvitePopup.propTypes = {
  users: PropTypes.array.isRequired,
  creator: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvitePopup;

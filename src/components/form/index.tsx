import React, { FC } from "react";

interface FormProps {
  open: boolean;
  handleClose: () => void;
}

const Form: FC<FormProps> = ({ open, handleClose }) => {
  return (
    <dialog open={open} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-3xl text-white">New Todo</h3>
        <div className="modal-action">
          <form method="dialog">
            <div className="my-3">
              <select className="select select-primary w-full max-w-xs">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="my-3">
              <button
                className="btn btn-outline btn-primary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Form;

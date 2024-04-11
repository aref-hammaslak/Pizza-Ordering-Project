import React from "react";
import ModalBackground from "./ModalBackground";

type MessageDialogProps = {
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  onAccept: () => void;
};
const MessageDialog = (props:MessageDialogProps) => {
  const { setShowMessage, message , onAccept} = props;
  return (
    <ModalBackground setModalState={setShowMessage}>
      <div className="bg-white flex  flex-col gap-8 rounded p-6">
        <p className="text-lg max-w-[250px] font-semibold text-center">{message}</p>
        <p className="text-sm max-w-[250px] -mt-4 text-center">
          You cannot undo this action.
        </p>
        <div className="flex flex-row gap-6 justify-between"> 
          <button
            onClick={() => setShowMessage(false)}
            className="bg-secondary-dark hover:bg-secondary   text-white px-4 py-1 rounded-lg "
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="bg-primary-dark hover:bg-primary  text-white px-4 py-1 rounded-lg "
          >
            Delete
          </button>
        </div>
      </div>
    </ModalBackground>
  );
};

export default MessageDialog;

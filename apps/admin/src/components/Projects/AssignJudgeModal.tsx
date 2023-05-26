import { Button, Input, Modal } from "common/src/ui";
import React from "react";

interface AssignJudgeModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const AssignJudgeModal: React.FC<AssignJudgeModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h4>Assign Judge</h4>
      <div className="my-8">
        <Input label="Judge email" className="!w-80" />
      </div>
      <div className="f space-x-4 justify-end">
        <Button btn="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button btn="success">Save</Button>
      </div>
    </Modal>
  );
};

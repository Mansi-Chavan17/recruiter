import React from "react";
import type { Candidate } from "./Types";

interface TagConfirmModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const TagConfirmModal: React.FC<TagConfirmModalProps> = ({
  isOpen,
  candidate,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Confirm Tag
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to tag{" "}
          <span className="font-medium">{candidate?.name}</span> to this
          position?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Yes, Tag Candidate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagConfirmModal;
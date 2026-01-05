"use client";

import { useAssignment } from "../hooks/useAssignment";

interface Props {
  buildingId: number;
  onClose: () => void;
}

export default function AssignmentModal({ buildingId, onClose }: Props) {
  const { staffs, toggleStaff, save } = useAssignment(buildingId);

  return (
    // OVERLAY
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* MODAL BOX */}
      <div className="bg-white p-6 rounded w-[400px] shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">
          Giao nhân viên
        </h3>

        {staffs.map(s => (
          <div key={s.staffId} className="mb-2">
            <input
              type="checkbox"
              checked={s.checked}
              onChange={() => toggleStaff(s.staffId)}
            />{" "}
            {s.fullname}
          </div>
        ))}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Hủy
          </button>

          <button
            onClick={async () => {
              await save();
              onClose();
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

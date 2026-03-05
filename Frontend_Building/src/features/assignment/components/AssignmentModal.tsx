"use client";

import { useEffect, useState } from "react";
import { useAssignment } from "../hooks/useAssignment";
import { buildingApi } from "@/features/building/api/building.api";
import type { BuildingDetail } from "@/features/building/types/building.type";

interface Props {
  buildingId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AssignmentModal({
  buildingId,
  onClose,
  onSuccess,
}: Props) {
  const { staffs, toggleStaff, save } = useAssignment(buildingId);

  const [building, setBuilding] = useState<BuildingDetail | null>(null);
  const [loadingBuilding, setLoadingBuilding] = useState(false);

  // ✅ load thông tin building để hiện title giống customer
  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setLoadingBuilding(true);
        const res = await buildingApi.getById(buildingId);
        setBuilding(res.data);
      } catch (e) {
        // không bắt buộc, fail thì vẫn hiện #id
        console.error(e);
      } finally {
        setLoadingBuilding(false);
      }
    };

    fetchBuilding();
  }, [buildingId]);

  const title = building
    ? `${building.name} - ${building.street}, ${building.ward}`
    : `#${buildingId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-5 shadow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Giao nhân viên cho tòa nhà {title}
          </h3>

          <button className="px-2 py-1" onClick={onClose}>
            ✕
          </button>
        </div>

        {loadingBuilding && (
          <div className="py-4 text-sm text-gray-500">Đang tải tòa nhà...</div>
        )}

        <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {staffs.map((s) => (
            <label
              key={s.staffId}
              className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={!!s.checked}
                onChange={() => toggleStaff(s.staffId)}
                className="h-4 w-4"
              />

              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  {/* ✅ giống customer: ưu tiên fullname */}
                  {s.fullname || `Staff #${s.staffId}`}
                </div>

                {/* nếu bạn không muốn hiện ID thì xoá block dưới */}
                <div className="text-xs text-gray-500">
                  ID: {s.staffId}
                </div>
              </div>
            </label>
          ))}

          {staffs.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">
              Không có nhân viên
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Hủy
          </button>

          <button
            onClick={async () => {
              await save();
              onSuccess?.();
              onClose();
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Lưu giao
          </button>
        </div>
      </div>
    </div>
  );
}
import { UserDTO } from "@/features/users/types/user";
import UserRow from "./UserRow";

interface Props {
  users: UserDTO[];
  loading: boolean;
  onUpdateUser: (user: UserDTO) => void;
}

export default function UserTable({
  users,
  loading,
  onUpdateUser,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border w-full overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        
        {/* ===== HEADER ===== */}
        <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Họ tên</th>
            <th className="px-6 py-3">SĐT</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3 text-center">Quyền</th>
            <th className="px-6 py-3 text-center">Trạng thái</th>
            <th className="px-6 py-3 text-center">Hành động</th>
          </tr>
        </thead>

        {/* ===== BODY ===== */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                Không có người dùng nào
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onUpdateUser={onUpdateUser}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

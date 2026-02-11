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
      <table className="min-w-full text-sm">
        <tbody>
          {users.map((u) => (
            <UserRow
              key={u.id}
              user={u}
              onUpdateUser={onUpdateUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

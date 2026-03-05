"use client";

import { CustomerDTO } from "../../types/customer.type";
import CustomerCreateModal from "./CustomerCreateModal";
import CustomerEditModal from "./CustomerEditModal";
import CustomerAssignmentModal from "./CustomerAssignmentModal";
import CustomerTransactionModal from "./CustomerTransactionModal";


export default function CustomerModalHub({
  showCreate,
  editCustomerId,
  assignCustomerId,
  transactionCustomerId,
  transactionMode,

  onCloseCreate,
  onCloseEdit,
  onCloseAssign,
  onCloseTransaction,

  onSuccess,
}: {
  showCreate: boolean;
  editCustomerId: number | null;
  assignCustomerId: number | null;
  transactionCustomerId: number | null;
  transactionMode: "ADMIN" | "STAFF";

  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseAssign: () => void;
  onCloseTransaction: () => void;

  onSuccess: () => void;
}) {
  return (
    <>
      {showCreate && (
        <CustomerCreateModal
          onClose={onCloseCreate}
          onSuccess={onSuccess}
        />
      )}

      {editCustomerId !== null && (
        <CustomerEditModal
          customerId={editCustomerId}
          onClose={onCloseEdit}
          onSuccess={onSuccess}
        />
      )}

      {assignCustomerId !== null && (
        <CustomerAssignmentModal
          customerId={assignCustomerId}
          onClose={onCloseAssign}
          onSuccess={onSuccess}
        />
      )}

      {transactionCustomerId !== null && (
        <CustomerTransactionModal
          customerId={transactionCustomerId}
          mode={transactionMode}
          onClose={onCloseTransaction}
        />
      )}
    </>
  );
}
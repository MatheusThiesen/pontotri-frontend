"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DepartmentDeleteDialog } from "./department-delete-dialog";
import { DepartmentForm } from "./department-form";

interface DepartmentActionsProps {
  department: any;
  onSuccess: () => void;
}

export function DepartmentActions({
  department,
  onSuccess,
}: DepartmentActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <div className="w-[50px] flex items-center gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEditForm(true)}
          className="h-8 w-8 p-0"
          aria-label={`Edit ${department.description}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
          aria-label={`Delete ${department.description}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <DepartmentForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        department={department}
        onSuccess={() => {
          setShowEditForm(false);
          onSuccess();
        }}
      />

      <DepartmentDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        department={department}
        onSuccess={() => {
          setShowDeleteDialog(false);
          onSuccess();
        }}
      />
    </>
  );
}

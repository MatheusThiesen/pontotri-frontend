"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LocationDeleteDialog } from "./location-delete-dialog";
import { LocationForm } from "./location-form";

interface LocationActionsProps {
  location: any;
  onSuccess: () => void;
}

export function LocationActions({ location, onSuccess }: LocationActionsProps) {
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
          aria-label={`Edit ${location.description}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
          aria-label={`Delete ${location.description}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <LocationForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        location={location}
        onSuccess={() => {
          setShowEditForm(false);
          onSuccess();
        }}
      />

      <LocationDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        location={location}
        onSuccess={() => {
          setShowDeleteDialog(false);
          onSuccess();
        }}
      />
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { ClassNameValue } from "tailwind-merge";

interface DropzoneProps {
  onFileUploaded: (file: File[]) => void;
  accept?: Accept;
  className?: ClassNameValue;
  children?: ReactNode;
}

export function Dropzone({
  onFileUploaded,
  accept,
  className,
  children,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileUploaded(acceptedFiles);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: accept,
    });

  function renderDragMessage() {
    if (!isDragActive) {
      return "Arraste os arquivos aqui, ou clique para selecionar.";
    }
    if (isDragReject) {
      return "Arquivo não suportado.";
    }
    return "Solte os arquivos aqui.";
  }

  function renderBorderColor() {
    if (!isDragActive) return "";
    if (isDragReject) return "border-red-600";
    return "border-green-700";
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed py-4 px-5 h-40 flex items-center justify-center rounded-md",
        renderBorderColor(),
        className
      )}
    >
      <input {...getInputProps()} />
      {children || <span>{renderDragMessage()}</span>}
    </div>
  );
}

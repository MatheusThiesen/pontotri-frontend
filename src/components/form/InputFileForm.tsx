import { FileIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Control } from "react-hook-form";
import { Dropzone } from "../Dropzone";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
  watch?: any;
  url?: any;
}

export function InputFileForm({
  control,
  name,
  label,
  description,
  watch,
}: Props) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}

          {watch && (
            <div className="flex items-center justify-between bg-panel rounded-md p-2">
              <div className="flex items-center">
                <FileIcon className="size-8 mr-2" />
                <span>{watch.name}</span>
              </div>
            </div>
          )}

          <FormControl>
            <Dropzone
              className="h-28 text-sm mt-3"
              accept={{ "image/*": [] }}
              onFileUploaded={(file) => {
                field.onChange(file);
              }}
            />
          </FormControl>

          {!!description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

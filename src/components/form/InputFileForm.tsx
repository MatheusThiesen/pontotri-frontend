import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Dropzone } from "@/components/form/dropzone";
import { cn } from "@/lib/utils";
import { optimizeAndConvertToBase64 } from "@/lib/utils/image";
import { Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label?: string;
  description?: string;
}

export function InputFileForm({ control, name, label, description }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showDropzone, setShowDropzone] = useState(true);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        useEffect(() => {
          if (field.value) {
            setPreview(field.value);
            setShowDropzone(false);
          }
        }, [field.value]);

        const handleFileUpload = async (files: File[]) => {
          if (files.length > 0) {
            try {
              const base64 = await optimizeAndConvertToBase64(files[0]);
              setPreview(base64);
              setShowDropzone(false);
              field.onChange(base64);
            } catch (error) {
              console.error("Erro ao processar imagem:", error);
            }
          }
        };

        const handleRemoveImage = () => {
          setPreview(null);
          setShowDropzone(true);
          field.onChange("");
        };

        return (
          <FormItem className="flex-1">
            {label && <FormLabel className="text-base">{label}</FormLabel>}

            {preview && (
              <div className="mb-4 flex flex-col items-center justify-center gap-2">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-lg border-2 border-border bg-background shadow-sm transition-all duration-200 hover:shadow-md">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-48 w-auto rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-9 w-9 rounded-full bg-white/90 text-destructive hover:bg-white"
                        onClick={handleRemoveImage}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9 rounded-full bg-white/90 hover:bg-white"
                        onClick={() => setShowDropzone(true)}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDropzone && (
              <FormControl>
                <div className="relative">
                  <Dropzone
                    className={cn(
                      "h-32 text-sm transition-all duration-200 cursor-pointer",
                      "border-2 border-dashed border-border bg-background hover:border-primary/50 hover:bg-primary/5",
                      "flex flex-col items-center justify-center gap-2"
                    )}
                    accept={{ "image/*": [] }}
                    onFileUploaded={handleFileUpload}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">
                        <span className="font-semibold">
                          Clique para enviar
                        </span>{" "}
                        ou arraste o arquivo
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        PNG, JPG ou JPEG até 5MB
                      </p>
                    </div>
                  </Dropzone>
                </div>
              </FormControl>
            )}

            {!!description && (
              <FormDescription className="mt-2 text-sm text-muted-foreground">
                {description}
              </FormDescription>
            )}

            <FormMessage className="mt-1.5" />
          </FormItem>
        );
      }}
    />
  );
}

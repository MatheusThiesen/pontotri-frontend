"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { Label } from "../ui/label";

interface ComboboxProps {
  data: ComboboxDataProps[];

  label?: string;
  defaultValue?: string;
  className?: ClassNameValue;

  onChange?: (e: ComboboxDataProps | null) => void;
}

interface ComboboxDataProps {
  value: string;
  label: string;
}

export function Combobox({
  data,
  className,
  defaultValue,
  label,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    defaultValue ? data.find((f) => f.value === defaultValue)?.label ?? "" : ""
  );

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      const newValue = currentValue === value ? "" : currentValue;
      setValue(newValue);
      setOpen(false);

      if (onChange) {
        const selected = data.find(
          (item) => item.label.toUpperCase() === newValue.toUpperCase()
        );
        onChange(selected ?? null);
      }
    },
    [value, onChange, data]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div>
        {label && <Label className="text-sm font-normal mb-1">{label}</Label>}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between relative", className)}
          >
            {value
              ? data.find((item) => item.label === value)?.label
              : "Selecionar..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." className="h-9" />
            <CommandList>
              <CommandEmpty>Não há dados a serem exibidos.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={handleSelect}
                  >
                    {item.label}

                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}

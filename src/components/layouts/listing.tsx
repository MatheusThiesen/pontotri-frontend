"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";
import { Button, ButtonProps } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ListingPageProps = {
  children: ReactNode;
};
export const ListingPage = ({ children }: ListingPageProps) => {
  return (
    <div className="my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

type ListingHeaderProps = {
  children?: ReactNode;
  className?: ClassNameValue;
};
export const ListingHeader = ({ children, className }: ListingHeaderProps) => {
  return (
    <div className={cn("text-start mb-4 flex", className)}>{children}</div>
  );
};

type ListingTitle = {
  children?: ReactNode;
  className?: ClassNameValue;
};
export const ListingTitle = ({ children, className }: ListingTitle) => {
  return (
    <h1 className={cn("text-2xl font-semibold text-gray-900", className)}>
      {children}
    </h1>
  );
};

interface ListingSubtitle {
  children?: ReactNode;
  className?: ClassNameValue;
}
export const ListingSubtitle = ({ children, className }: ListingSubtitle) => {
  return (
    <p className={cn("mt-2 text-sm text-gray-700", className)}>{children}</p>
  );
};

type ListingMainProps = {
  children?: ReactNode;
};
export const ListingMain = ({ children }: ListingMainProps) => {
  return <div className="bg-box rounded-lg">{children}</div>;
};

type ListingActionButtonProps = ButtonProps & {
  className?: ClassNameValue;
};
export const ListingActionButton = ({
  children,
  className,
  ...rest
}: ListingActionButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-red-600 hover:bg-red-500 font-normal text-white border-2 border-red-700 ml-auto",
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

type ListingOptionsActionsProps = {
  data: {
    description: string;
    handle: () => void;
  }[];
};
export const ListingOptionsActions = ({ data }: ListingOptionsActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-5">
          Mais ações <ChevronDown className="ml-2 size-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-8 ">
        {data.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.description}
            className="text-center p-2 "
            onClick={() => item.handle()}
          >
            {item.description}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

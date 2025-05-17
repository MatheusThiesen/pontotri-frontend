"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignInForm } from "./_components/sign-in-form";

export default function LoginPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-500 hover:text-gray-700"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="mb-8 flex items-center">
        <img src="/assets/logo-short.png" alt="logo" className="h-10 mr-2" />
        <span className="text-2xl font-bold">
          Ponto<span className="text-primary">TRI</span>
        </span>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Acessar
          </CardTitle>
          <CardDescription className="text-center">
            Entre para acessar seu painel de controle de ponto
          </CardDescription>
        </CardHeader>

        <SignInForm />
      </Card>

      <p className="mt-6 text-center text-sm text-gray-600">
        Ainda não tem uma conta?{" "}
        <a href="/sign-up" className="font-medium text-primary hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}

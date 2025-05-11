"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula requisição
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Botão Voltar */}
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

      {/* Logo */}
      <div className="mb-8 flex items-center">
        <img src="/assets/logo-short.png" alt="logo" className="h-10 mr-2" />
        <span className="text-2xl font-bold">
          Ponto<span className="text-primary">TRI</span>
        </span>
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Redefinir Senha
          </CardTitle>
          <CardDescription className="text-center">
            Informe seu e-mail para receber o link de redefinição de senha
          </CardDescription>
        </CardHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full py-6 text-base font-medium mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Link de redefinição enviado para {email}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Verifique seu e-mail e siga as instruções para redefinir sua
              senha.
            </p>
          </CardContent>
        )}
      </Card>

      <p className="mt-6 text-center text-sm text-gray-600">
        Lembrou sua senha?{" "}
        <a href="/sign-in" className="font-medium text-primary hover:underline">
          Voltar para o login
        </a>
      </p>
    </div>
  );
}

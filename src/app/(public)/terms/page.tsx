"use client";

import { DetailBox } from "@/components/layouts/detail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <DetailBox>
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

      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Termos de Serviço</h1>
        <p className="mb-4">
          Ao criar uma conta ou utilizar os serviços da plataforma PontoTRI,
          você concorda com os termos e condições aqui descritos. Caso não
          concorde, por favor, não utilize nossos serviços.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Descrição do Serviço
        </h2>
        <p className="mb-4">
          O PontoTRI é uma plataforma online para controle de ponto digital, com
          recursos como reconhecimento facial, validação por GPS e geração de
          relatórios.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Responsabilidades do Usuário
        </h2>
        <p className="mb-4">
          Você é responsável por fornecer informações verdadeiras no cadastro e
          manter a confidencialidade dos seus dados de acesso. O uso indevido da
          plataforma poderá resultar no cancelamento da conta.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Privacidade</h2>
        <p className="mb-4">
          A coleta e uso de dados seguem as diretrizes descritas na nossa
          Política de Privacidade.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Cancelamento e Exclusão
        </h2>
        <p className="mb-4">
          Você pode cancelar sua conta a qualquer momento. Reservamo-nos o
          direito de encerrar contas em caso de violação dos termos.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Modificações</h2>
        <p>
          Os termos podem ser atualizados periodicamente. A versão mais recente
          estará sempre disponível neste endereço.
        </p>
      </div>
    </DetailBox>
  );
}

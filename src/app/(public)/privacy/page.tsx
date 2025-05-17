"use client";

import { DetailBox } from "@/components/layouts/detail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          Coleta de Informações
        </h2>
        <p className="mb-4">
          Coletamos dados pessoais como nome, e-mail, CNPJ, localização e foto
          no momento do registro de ponto, apenas para uso interno e
          funcionalidade do sistema.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Uso das Informações</h2>
        <p className="mb-4">
          Os dados são usados exclusivamente para fornecer os serviços
          contratados, como marcação de ponto, relatórios e suporte.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Compartilhamento</h2>
        <p className="mb-4">
          Não compartilhamos seus dados com terceiros, exceto quando exigido por
          lei ou mediante solicitação do contratante (empresa).
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Segurança</h2>
        <p className="mb-4">
          Utilizamos medidas técnicas e organizacionais para proteger seus dados
          contra acessos não autorizados, perda ou vazamento.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Armazenamento</h2>
        <p className="mb-4">
          Os dados são armazenados em servidores seguros e mantidos enquanto sua
          conta estiver ativa.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Direitos do Usuário</h2>
        <p className="mb-4">
          Você pode solicitar a atualização ou exclusão dos seus dados a
          qualquer momento entrando em contato com nosso suporte.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Alterações</h2>
        <p>
          Esta política pode ser modificada. Notificaremos os usuários em caso
          de mudanças significativas.
        </p>
      </div>
    </DetailBox>
  );
}

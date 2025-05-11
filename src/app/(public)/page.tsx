import { PricingSection } from "@/components/pricing-section";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, ChevronRight, MapPin, Scan } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Seção Hero */}

      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-24 text-center md:py-32">
        <img src="/assets/logo-short.png" alt="logo" className="h-32 mb-4" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 opacity-20 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Ponto<span className="text-primary">TRI</span>
            <span className="ml-2 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Controle de Ponto
            </span>
          </h1>

          <p className="mb-10 text-xl text-gray-600 md:text-2xl">
            Solução moderna de registro de ponto para empresas de todos os
            tamanhos. Simplifique a gestão de presença com tecnologia avançada.
          </p>
          <Link href="sign-in" passHref>
            <Button
              size="lg"
              className="group h-12 rounded-full bg-gradient-to-r from-primary to-blue-400 px-8 text-base"
            >
              Acessar o sistema
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Imagem Hero */}
        <div className="relative mt-16 w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl">
          <div className="aspect-[16/9] bg-gray-100">
            <img
              src="/assets/placeholder.png" //1280x720
              alt="Visualização do Painel do PontoTRI"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Seção Benefícios */}
      <section className="py-24 flex justify-center ">
        <div className="container px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Principais Benefícios
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Benefício 1 */}
            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-gray-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <Scan className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Reconhecimento Facial
              </h3>
              <p className="text-gray-600">
                Registro seguro e sem contato utilizando tecnologia de
                reconhecimento facial.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-gray-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Validação por GPS</h3>
              <p className="text-gray-600">
                Verifique a localização do colaborador no momento do ponto com
                validação precisa via GPS.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-gray-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Relatórios de Ponto
              </h3>
              <p className="text-gray-600">
                Relatórios completos e análises para acompanhar presença e horas
                trabalhadas.
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-gray-50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Controle de Jornada
              </h3>
              <p className="text-gray-600">
                Gerencie facilmente escalas, pausas e horas extras com
                ferramentas flexíveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section className="flex justify-center bg-gradient-to-r from-primary to-blue-400 bg-primary py-20 text-white">
        <div className="container px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Pronto para simplificar o controle de ponto?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Comece agora a transformar a gestão de ponto da sua empresa com o
            PontoTRI.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-12 rounded-full px-8 text-base font-medium"
          >
            Comece agora
          </Button>
        </div>
      </section>

      <PricingSection />

      {/* Rodapé */}
      <footer className="border-t border-gray-200 bg-white py-12 flex justify-center">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <img
                src="/assets/logo-short.png"
                alt="logo"
                className="h-7 mr-2"
              />
              <span className="text-lg font-bold">
                Ponto<span className="text-primary">TRI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} PontoTRI. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

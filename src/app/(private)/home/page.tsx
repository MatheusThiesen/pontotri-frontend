import {
  DetailPage,
  DetailSubtitle,
  DetailTitle,
} from "@/components/layouts/detail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Home() {
  return (
    <DetailPage>
      <DetailTitle>Início</DetailTitle>
      <DetailSubtitle>
        Bem-vindo de volta! Aqui está um resumo da sua frequência.
      </DetailSubtitle>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totais</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164.5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dias Presentes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21/23</div>
            <p className="text-xs text-muted-foreground">
              91.3% de taxa de presença
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Membros da empresa
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Sua atividade recente de registro de tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    {i % 2 === 0 ? (
                      <Clock className="h-5 w-5 text-gray-500" />
                    ) : (
                      <MapPin className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {i % 2 === 0 ? "Entrada registrada" : "Saída registrada"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(
                        Date.now() - i * 24 * 60 * 60 * 1000
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Horários</CardTitle>
            <CardDescription>
              Sua agenda de trabalho para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i + 1);
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-sm font-medium">
                          {date.getDate()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {date.toLocaleDateString(undefined, {
                            weekday: "long",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {i % 5 === 4 ? "Folga" : "9:00 - 18:00"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-500">
                      {i % 5 === 4
                        ? "Fim de Semana"
                        : i % 3 === 0
                        ? "Escritório Principal"
                        : i % 3 === 1
                        ? "Filial"
                        : "Remoto"}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailPage>
  );
}

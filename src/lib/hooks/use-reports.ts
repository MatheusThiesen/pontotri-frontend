import { Clock, LucideProps } from "lucide-react";

export type Report = {
  key: string;
  title: string;
  description: string;
  icon: React.FC<LucideProps>;
};

export const reports: Report[] = [
  {
    title: "Espelho Ponto",
    key: "time-mirror",
    description: "Visualize seu registro de ponto completo",
    icon: Clock,
  },
  // {
  //   title: "Horas Extras",
  //   key: "overtime",
  //   description: "Acompanhe suas horas extras trabalhadas",
  //   icon: Timer,
  // },
  // {
  //   title: "Atrasos",
  //   key: "delays",
  //   description: "Verifique seus atrasos e justificativas",
  //   icon: AlertCircle,
  // },
  // {
  //   title: "Relatório Detalhado",
  //   key: "detailed",
  //   description: "Relatório completo com todos os registros",
  //   icon: FileText,
  // },
];

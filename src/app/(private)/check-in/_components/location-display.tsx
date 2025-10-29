"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, MapPin, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function LocationDisplay() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador.");
      setLoading(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao obter localização:", err);

        let message = "Não foi possível obter sua localização.";
        if (err.code === err.PERMISSION_DENIED) {
          message =
            "Permissão de localização negada. Clique em 'Tentar novamente' para autorizar.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Informações de localização indisponíveis.";
        } else if (err.code === err.TIMEOUT) {
          message = "Tempo esgotado ao tentar obter localização.";
        }

        setError(message);
        setLoading(false);
      },
      geoOptions
    );
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center mb-2">
        <MapPin className="h-4 w-4 text-teal-600 mr-1" />
        <h3 className="text-sm font-medium">Localização Atual</h3>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="py-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={getLocation}
              className="text-xs ml-2"
            >
              <RefreshCcw className="h-3 w-3 mr-1" />
              Tentar novamente
            </Button>
          </div>
        </Alert>
      ) : location ? (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Latitude</span>
            <span className="font-mono">{location.latitude.toFixed(6)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Longitude</span>
            <span className="font-mono">{location.longitude.toFixed(6)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

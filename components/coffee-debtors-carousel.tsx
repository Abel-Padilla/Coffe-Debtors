"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { X, Grid, List, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoffeeDebtor {
  id: string | number;
  name: string;
  avatar: string;
  coffees: number;
  since: string;
  reason: string;
  img?: string;
}

const debtors: CoffeeDebtor[] = [
  
];

interface CoffeeDebtorsCarouselProps {
  viewMode?: "carousel" | "grid";
  onViewModeChange?: (mode: "carousel" | "grid") => void;
  showViewToggle?: boolean;
}

export function CoffeeDebtorsCarousel({ 
  viewMode = "carousel",
  onViewModeChange,
  showViewToggle = true
}: CoffeeDebtorsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState<"grid" | "carousel">(viewMode);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleViewModeChange = useCallback((mode: "carousel" | "grid") => {
    setCurrentViewMode(mode);
    onViewModeChange?.(mode);
  }, [onViewModeChange]);

  useEffect(() => {
    if (!api || currentViewMode !== "carousel") return;

    const intervalId = setInterval(() => {
      scrollNext();
    }, 30000);

    const container = api.rootNode();
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(() => {
        scrollNext();
      }, 30000);
      return () => clearInterval(newIntervalId);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api, scrollNext, currentViewMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, closeModal]);

  const DebtorCard = ({ debtor, index }: { debtor: CoffeeDebtor; index: number }) => (
    <Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50 h-full">
      <CardContent className="flex flex-col gap-4 p-6 h-full">
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
          #{index + 1}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-600 text-xl font-bold text-white shadow-lg">
              <img
                src={`//3ms.huawei.com/api/expert/face/${debtor.id}/120`}
                alt={debtor.name}
                className="h-16 w-16 rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-bold text-card-foreground leading-tight">
              {debtor.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Café para el team
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground">
            </span>
            <span>Desde {debtor.since}</span>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-3 dark:from-amber-950 dark:to-orange-950 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
              {debtor.reason}
              {debtor.img && (
                <img 
                  src={debtor.img} 
                  alt="Debtor" 
                  className="mt-2 w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity" 
                  onClick={() => setSelectedImage(debtor.img!)}
                />
              )}  
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Mostrar mensaje cuando no hay deudores
  if (debtors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-4">
          <Coffee className="h-16 w-16 mx-auto text-amber-500 opacity-50" />
          <p className="text-xl text-muted-foreground">
            Sin deudores
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showViewToggle && (
        <div className="flex justify-end gap-2">
          <Button
            variant={currentViewMode === "carousel" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("carousel")}
            title="Vista Carousel"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={currentViewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("grid")}
            title="Vista Grid"
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      )}

      {currentViewMode === "carousel" ? (
        <div className="mx-auto max-w-5xl">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-4">
              {debtors.map((debtor, index) => (
                <CarouselItem
                  key={debtor.id}
                  className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3 relative"
                >
                  <DebtorCard debtor={debtor} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="inline-block animate-pulse">●</span>
              Auto-deslizando • Pausa al pasar el cursor
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {debtors.map((debtor, index) => (
            <div key={debtor.id} className="relative">
              <DebtorCard debtor={debtor} index={index} />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-2xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Expandida" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
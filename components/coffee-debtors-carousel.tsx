"use client"
import { useState, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

interface CoffeeDebtor {
  id: string | number
  name: string
  avatar: string
  coffees: number
  since: string
  reason: string
}

const debtors: CoffeeDebtor[] = [
  {
    id: '00879534',
    name: "Gerardo",
    avatar: "GP",
    coffees: 1,
    since: "Septiembre 2025",
    reason: "Llegó tarde a la daily de los jueves 👁️",
  },
  {
    id: '00872618',
    name: "César",
    avatar: "CS",
    coffees: 1,
    since: "Septiembre 2025",
    reason: "Llegó tarde a la daily de los jueves 👁️",
  },
  {
    id: '00963527',
    name: "Nohemi",
    avatar: "NH",
    coffees: 1,
    since: "Diciembre 2025",
    reason: "Dejó su laptop desbloqueada 🔒",
  },
  {
    id: "00880153",
    name : "Eduardo Rafael",
     avatar: "ER",
     coffees: 1,
    since: "Febrero 2025",
    reason: "Mandó mensaje: invito los cafes del canteen",
  }
];

export function CoffeeDebtorsCarousel() {
  const [api, setApi] = useState<CarouselApi>()

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      scrollNext()
    }, 30000)

    const container = api.rootNode()
    const handleMouseEnter = () => clearInterval(intervalId)
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(() => {
        scrollNext()
      }, 30000)
      return () => clearInterval(newIntervalId)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearInterval(intervalId)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [api, scrollNext])

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {debtors.map((debtor, index) => (
            <CarouselItem key={debtor.id} className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3 relative">
              <Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50 h-full">
                <CardContent className="flex flex-col gap-4 p-6 h-full">
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                    #{index + 1}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-600 text-xl font-bold text-white shadow-lg">
                        <img src={`//3ms.huawei.com/api/expert/face/${debtor.id}/120`} alt={debtor.name} className="h-16 w-16 rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-bold text-card-foreground leading-tight">{debtor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Café para el team
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                      <span>Desde {debtor.since}</span>
                    </div>
                    
                    <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-3">
                      <p className="text-sm text-amber-900 leading-relaxed">{debtor.reason}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
  )
}
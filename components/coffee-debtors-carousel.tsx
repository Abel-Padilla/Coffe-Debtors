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
  id: number
  name: string
  coffees: number
  since: string
  reason: string
}

const debtors: CoffeeDebtor[] = [
  {
    id: 1,
    name: "Sharon ",
    coffees: 1,
    since: "Junio 2025",
    reason: "Llegó tarde a la daily de los jueves 👁️",
  },
  {
    id: 2,
    name: "Gerardo Palma",
    coffees: 1,
    since: "Septiembre 2025",
    reason: "Llegó tarde a la daily de los jueves 👁️",
  },
  {
    id: 3,
    name: "César",
    coffees: 1,
    since: "Septiembre 2025",
    reason: "Llegó tarde a la daily de los jueves 👁️",
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
    }, 3000)

    const container = api.rootNode()
    const handleMouseEnter = () => clearInterval(intervalId)
    const handleMouseLeave = () => {
      const newIntervalId = setInterval(() => {
        scrollNext()
      }, 3000)
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
              <Card className="border-2 transition-all hover:shadow-lg">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    #{index + 1}
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl">
                      ☕
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-card-foreground">{debtor.name}</h3>
                    <p className="text-sm text-muted-foreground">Desde {debtor.since}</p>
                  </div>

                  <div className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-sm font-medium text-secondary-foreground">{debtor.reason}</p>
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
        <p className="text-sm text-muted-foreground">Auto-deslizando • Pausa al pasar el cursor →</p>
      </div>
    </div>
  )
}

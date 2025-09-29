import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ArrowRightLeft } from "lucide-react"

export default function PassePage() {
  const tradeCards = [
    { name: "Lightning Bolt", set: "Alpha", rarity: "Common", condition: "Near Mint" },
    { name: "Squirtle", set: "Base Set", rarity: "Common", condition: "Lightly Played" },
    { name: "Dark Magician", set: "LOB", rarity: "Ultra Rare", condition: "Near Mint" },
    { name: "Professor Oak", set: "Base Set", rarity: "Uncommon", condition: "Moderately Played" },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Trade Binder (Passe)</h1>
              <p className="text-lg text-muted-foreground">Cards available for trade</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search your trade binder..." className="pl-10" />
            </div>
          </div>

          {/* Trade Cards */}
          <div className="grid gap-4">
            {tradeCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ArrowRightLeft className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">{card.name}</h3>
                        <p className="text-muted-foreground">{card.set}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{card.rarity}</Badge>
                      <Badge
                        variant={
                          card.condition === "Near Mint"
                            ? "default"
                            : card.condition === "Lightly Played"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {card.condition}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

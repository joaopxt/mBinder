import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Heart } from "lucide-react"

export default function WantsPage() {
  const wantedCards = [
    { name: "Black Lotus", set: "Alpha", rarity: "Mythic", priority: "High" },
    { name: "Charizard", set: "Base Set", rarity: "Rare", priority: "Medium" },
    { name: "Blue-Eyes White Dragon", set: "LOB", rarity: "Ultra Rare", priority: "High" },
    { name: "Pikachu Illustrator", set: "Promo", rarity: "Promo", priority: "Low" },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Want List</h1>
              <p className="text-lg text-muted-foreground">Cards you're actively looking for</p>
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
              <Input placeholder="Search your want list..." className="pl-10" />
            </div>
          </div>

          {/* Want List */}
          <div className="grid gap-4">
            {wantedCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">{card.name}</h3>
                        <p className="text-muted-foreground">{card.set}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{card.rarity}</Badge>
                      <Badge
                        variant={
                          card.priority === "High"
                            ? "destructive"
                            : card.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {card.priority} Priority
                      </Badge>
                      <Button variant="outline" size="sm">
                        Remove
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

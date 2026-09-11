import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
        <main className="flex justify-center flext-1">
          <h1 className="text-6xl font-bold">Welcome to the quiz Page 👋</h1>
        </main>
        <footer className="footer pb-9 px-6 relative mb-0">
          <Button> Start </Button>
        </footer>
    </div>
  )
}

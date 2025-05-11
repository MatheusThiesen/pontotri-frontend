import { MainNavigation } from "@/components/main-navigation";

export default function Home() {
  return (
    <MainNavigation>
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Home Page</h1>
        <p className="text-muted-foreground">
          This is the home page content. The navigation adapts based on screen
          size.
        </p>
      </div>
    </MainNavigation>
  );
}

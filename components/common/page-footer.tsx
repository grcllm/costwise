export function PageFooter() {
  return (
    <footer className="border-t bg-muted mt-12">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CostWise. Empowering Filipinos with inflation awareness and practical budgeting.
        </p>
      </div>
    </footer>
  );
}

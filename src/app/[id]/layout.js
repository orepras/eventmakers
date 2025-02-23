export default function Layout({ children }) {
  return (
    <main className="max-w-3xl m-auto py-12 flex flex-col justify-between min-h-[88vh]">
      {children}
    </main>
  );
}

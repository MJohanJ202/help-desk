import AuthForm from "@/components/auth/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-10">
        <AuthForm type="sign-up" />
      </main>
    </div>
  );
}

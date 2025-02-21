import { Button, Input } from "@heroui/react"; // Verify correct package name
import Link from "next/link";
import { OauthButton } from "../_components/oauth";
import { useFormState } from "react-dom"; // If using Next.js Server Actions

export default function Page() {
  const [state, formAction] = useFormState(registerAction, null);

  return (
    <main className="space-y-6">
      <section>
        <h3>Register</h3>
        <p>Create an account to continue</p>
      </section>
      <section className="space-y-2">
        <form className="space-y-5" action={formAction}>
          <Input name="fullName" placeholder="Full name" variant="underlined" />
          <Input name="email" placeholder="Email" variant="underlined" />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            variant="underlined"
          />
          <Button fullWidth color="primary" radius="sm">
            Register
          </Button>
        </form>

        {state?.status === "error" && (
          <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
            {state.message}
          </div>
        )}
        {state?.status === "success" && (
          <div className="text-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">
            {state.message}
          </div>
        )}

        <OauthButton />
      </section>
      <section>
        <p>
          Have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

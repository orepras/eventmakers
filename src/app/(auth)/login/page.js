import { Button, Input } from "@heroui/react";
import { OauthButton } from "../_components/oauth";
import { useFormState } from "react-dom"; // Changed from useActionState
import { loginAction } from "./action";

export default function Page() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <main className="space-y-6">
      <section>
        <h3>Login</h3>
        <p>Sign in to continue</p>
      </section>
      <section className="space-y-2">
        <form className="space-y-5" action={formAction}>
          <Input placeholder="Email" variant="underlined" />
          <Input type="password" placeholder="Password" variant="underlined" />
          <Button fullWidth color="primary" radius="sm">
            Login
          </Button>
        </form>

        {state?.status === "error" && <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">{state.message}</div>}
        {state?.status === "success" && <div className="text-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">{state.message}</div>}

        <OauthButton />
      </section>
    </main>
  );
}

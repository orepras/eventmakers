'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { OauthButton } from '../_components/oauth';
import { registerAction } from './action';
import { useActionState } from 'react';

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full space-y-8 border border-slate-100">
        <section className="text-center">
          <h3 className="text-2xl font-bold text-slate-800">Register</h3>
          <p className="text-slate-600 mt-2">Create an account to continue</p>
        </section>

        <section className="space-y-6">
          <form className="space-y-5" action={formAction}>
            <Input
              name="fullname"
              placeholder="Full name"
              variant="underlined"
              className="w-full"
            />
            <Input
              name="email"
              placeholder="Email"
              variant="underlined"
              className="w-full"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              variant="underlined"
              className="w-full"
            />
            <Input
              name="rePassword"
              type="password"
              placeholder="Confirm Password"
              variant="underlined"
              className="w-full"
            />
            <Button
              type="submit"
              fullWidth
              color="primary"
              radius="sm"
              className="mt-6"
              isDisabled={pending}
            >
              {pending ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          {state?.status === 'error' && (
            <div className="text-center text-rose-600 bg-rose-50 p-3 rounded-lg text-sm">
              {state.message}
            </div>
          )}
          {state?.status === 'success' && (
            <div className="text-center text-emerald-600 bg-emerald-50 p-3 rounded-lg text-sm">
              {state.message}
            </div>
          )}

          <div className="pt-4">
            <OauthButton />
          </div>
        </section>

        <section className="text-center text-slate-600">
          <p>
            Have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

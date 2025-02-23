import { Geist, Geist_Mono } from 'next/font/google';
import { auth } from '@/libs/auth';
import { Button } from '@heroui/react';
import Link from 'next/link';
import './globals.css';
import Avatar from 'boring-avatars';
import { FaPlusCircle } from 'react-icons/fa';
import { Providers } from '@/components/shared/providers';
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Eventmakers',
  description: 'Eventmakers by Aethrix',
};

export default async function Layout({ children }) {
  const session = await auth();

  async function logoutSession() {
    'use server';
    try {
      if (session) {
        await prisma.session.delete({
          where: {
            id: session.id,
          },
        });
      }
      revalidatePath('/');
    } catch (error) {
      console.log(`Error failed to logout: ${error}`);
      return null;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative">
          <header className="w-full px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-medium text-lg">
              eventmakers.
            </Link>

            <div className="flex flex-row space-x-4 items-center">
              <Link href="/create">
                <Button
                  className="text-black"
                  variant="bordered"
                  startContent={<FaPlusCircle className="w-4 h-4" />}
                >
                  Buat Event
                </Button>
              </Link>

              {session ? (
                <div className="flex gap-2 items-center">
                  <form action={logoutSession}>
                    <Button variant="light" type="submit" color="danger">
                      Logout
                    </Button>
                  </form>
                  <div>{session.user.name}</div>
                  <Avatar
                    size={40}
                    name={session.user.name}
                    variant="marble"
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F8AB3D',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button as={Link} href="/login" variant="bordered">
                    Sign in
                  </Button>
                  <Button as={Link} href="/register" variant="bordered">
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </header>
          <main className="max-2-3xl m-auto flex flex-col justify-between min-h-[88vh]">
            <Providers>{children}</Providers>
          </main>
          <footer className="max-w-3xl m-auto px-4 border-t py-4 flex justify-between items-center">
            <div className="flex gap-5">
              <div className="font-medium">events.</div>
              <div className="font-medium">categories.</div>
              <div className="font-medium">eventmakers.</div>
            </div>
            <div className="font-medium">@2025.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}

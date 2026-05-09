import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { login } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-sm rounded-xl border-slate-200 shadow-sm">
        <CardHeader className="space-y-2 px-5 pt-6 text-center sm:px-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-950">
            Wholesale Hub
          </CardTitle>
          <p className="text-sm leading-6 text-slate-500">
            Sign in to manage inventory, sales, and receipts.
          </p>
        </CardHeader>

        <CardContent className="px-5 pb-6 sm:px-6">
          <form action={login} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Password
              <Input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter app password"
                className="h-12 rounded-lg border-slate-200 bg-white px-4 text-sm focus-visible:border-slate-400 focus-visible:ring-4 focus-visible:ring-slate-100"
              />
            </label>

            {hasError ? (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                Incorrect password. Please try again.
              </p>
            ) : null}

            <Button type="submit" className="h-12 w-full rounded-lg">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

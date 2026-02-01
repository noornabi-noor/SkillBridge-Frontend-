"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginWithGoogle, register } from "@/services/auth/authClient";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register({ name, email, password, phone, role, image });
      setSuccessMessage(
        "A verification email has been sent to your inbox. Please check it and verify your email before logging in.",
      );
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880123456789"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <select
                  id="role"
                  name="role"
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="STUDENT">STUDENT</option>
                  <option value="TUTOR">TUTOR</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
                <FieldDescription>
                  Provide a link to your profile image.
                </FieldDescription>
              </Field>

              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                  </Field>
                </div>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 text-center">
                  {successMessage}
                </p>
              )}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={loginWithGoogle}
                >
                  Sign up with Google
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/login" className="underline">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}

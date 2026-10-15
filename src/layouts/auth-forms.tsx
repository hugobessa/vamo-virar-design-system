"use client";

import { Eye, EyeOff, MailCheck } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../shadcn/alert";
import { Button } from "../shadcn/button";
import { Checkbox } from "../shadcn/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../shadcn/field";
import { Input } from "../shadcn/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../shadcn/input-group";
import { Spinner } from "../shadcn/spinner";
import { cn } from "../web/utils";

type Common = {
  /** A message from the server (wrong password, expired link…), shown above the form. */
  error?: ReactNode;
  /** Disables the form and shows a spinner on the button while the request runs. */
  busy?: boolean;
  className?: string;
};

export type AuthProvider = { label: string; icon?: ReactNode; onClick: () => void };

/** The heading of an auth page: condensed upper-case title and a line under it. */
export function AuthHeader({ title, description }: { title: ReactNode; description?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-condensed text-[40px] leading-[40px] font-black tracking-[-0.8px] uppercase">{title}</h1>
      {description ? <p className="text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function ServerError({ error }: { error?: ReactNode }) {
  return error ? (
    <Alert variant="destructive">
      <AlertTitle>Não deu certo</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : null;
}

function Submit({ busy, children }: { busy?: boolean; children: ReactNode }) {
  return (
    <Button type="submit" className="w-full" disabled={busy} aria-busy={busy || undefined}>
      {busy ? <Spinner /> : null}
      {children}
    </Button>
  );
}

/** A password field with a show/hide button. */
export function PasswordInput({ id, name, autoComplete, invalid, minLength = 8 }: { id: string; name: string; autoComplete: string; invalid?: boolean; minLength?: number }) {
  const [shown, setShown] = useState(false);
  return (
    <InputGroup>
      <InputGroupInput id={id} name={name} type={shown ? "text" : "password"} autoComplete={autoComplete} required minLength={minLength} aria-invalid={invalid || undefined} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" aria-label={shown ? "Esconder a senha" : "Mostrar a senha"} aria-pressed={shown} onClick={() => setShown((v) => !v)}>
          {shown ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

const values = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  return new FormData(e.currentTarget);
};

/** E-mail and password, "remember me", a link to recover the password, providers and a link to sign up. */
export function LoginForm({
  onSubmit,
  forgotPasswordHref,
  signUpHref,
  providers,
  error,
  busy,
  className,
}: Common & {
  onSubmit: (v: { email: string; password: string; remember: boolean }) => void;
  forgotPasswordHref?: string;
  signUpHref?: string;
  providers?: AuthProvider[];
}) {
  const id = useId();
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        const f = values(e);
        onSubmit({ email: String(f.get("email")), password: String(f.get("password")), remember: f.get("remember") === "on" });
      }}
    >
      <AuthHeader title="Entrar" description="Que bom ver você de novo." />
      <ServerError error={error} />
      <fieldset disabled={busy} className="contents">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${id}-email`}>E-mail</FieldLabel>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required />
          </Field>
          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor={`${id}-password`}>Senha</FieldLabel>
              {forgotPasswordHref ? (
                <a href={forgotPasswordHref} className="text-[15px] font-bold text-primary underline-offset-4 hover:underline">
                  Esqueci a senha
                </a>
              ) : null}
            </div>
            <PasswordInput id={`${id}-password`} name="password" autoComplete="current-password" minLength={1} />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id={`${id}-remember`} name="remember" defaultChecked />
            <FieldLabel htmlFor={`${id}-remember`} className="font-semibold">
              Manter conectado neste aparelho
            </FieldLabel>
          </Field>
          <Submit busy={busy}>Entrar</Submit>
          {providers?.length ? (
            <>
              <FieldSeparator>ou</FieldSeparator>
              <div className="flex flex-col gap-3">
                {providers.map((p) => (
                  <Button key={p.label} type="button" variant="outline" className="w-full" onClick={p.onClick}>
                    {p.icon}
                    {p.label}
                  </Button>
                ))}
              </div>
            </>
          ) : null}
          {signUpHref ? (
            <FieldDescription className="text-center text-[15px]">
              Ainda não tem conta?{" "}
              <a href={signUpHref} className="font-bold text-primary">
                Criar conta
              </a>
            </FieldDescription>
          ) : null}
        </FieldGroup>
      </fieldset>
    </form>
  );
}

/** Name, e-mail and a password of at least 8 characters, with links to the terms and to sign in. */
export function SignUpForm({
  onSubmit,
  signInHref,
  termsHref,
  privacyHref,
  providers,
  error,
  busy,
  className,
}: Common & {
  onSubmit: (v: { name: string; email: string; password: string }) => void;
  signInHref?: string;
  termsHref?: string;
  privacyHref?: string;
  providers?: AuthProvider[];
}) {
  const id = useId();
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        const f = values(e);
        onSubmit({ name: String(f.get("name")), email: String(f.get("email")), password: String(f.get("password")) });
      }}
    >
      <AuthHeader title="Criar conta" description="Leva um minuto. Depois é só entrar numa comunidade." />
      <ServerError error={error} />
      <fieldset disabled={busy} className="contents">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${id}-name`}>Seu nome</FieldLabel>
            <Input id={`${id}-name`} name="name" autoComplete="name" placeholder="Como as pessoas vão ver você" required />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${id}-email`}>E-mail</FieldLabel>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${id}-password`}>Senha</FieldLabel>
            <PasswordInput id={`${id}-password`} name="password" autoComplete="new-password" />
            <FieldDescription>Pelo menos 8 caracteres.</FieldDescription>
          </Field>
          <Submit busy={busy}>Criar conta</Submit>
          {providers?.length ? (
            <>
              <FieldSeparator>ou</FieldSeparator>
              {providers.map((p) => (
                <Button key={p.label} type="button" variant="outline" className="w-full" onClick={p.onClick}>
                  {p.icon}
                  {p.label}
                </Button>
              ))}
            </>
          ) : null}
          {termsHref || privacyHref ? (
            <FieldDescription className="text-center">
              Ao criar a conta você concorda com os{" "}
              {termsHref ? (
                <a href={termsHref} className="font-bold">
                  termos de uso
                </a>
              ) : (
                "termos de uso"
              )}{" "}
              e a{" "}
              {privacyHref ? (
                <a href={privacyHref} className="font-bold">
                  política de privacidade
                </a>
              ) : (
                "política de privacidade"
              )}
              .
            </FieldDescription>
          ) : null}
          {signInHref ? (
            <FieldDescription className="text-center text-[15px]">
              Já tem conta?{" "}
              <a href={signInHref} className="font-bold text-primary">
                Entrar
              </a>
            </FieldDescription>
          ) : null}
        </FieldGroup>
      </fieldset>
    </form>
  );
}

/** Asks for the e-mail and, once `sent`, says to check the inbox. */
export function ForgotPasswordForm({
  onSubmit,
  signInHref,
  sent,
  error,
  busy,
  className,
}: Common & { onSubmit: (v: { email: string }) => void; signInHref?: string; sent?: boolean }) {
  const id = useId();
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        const f = values(e);
        onSubmit({ email: String(f.get("email")) });
      }}
    >
      <AuthHeader title="Esqueci a senha" description="Mandamos um link para você criar uma senha nova." />
      <ServerError error={error} />
      {sent ? (
        <Alert variant="ok">
          <MailCheck />
          <AlertTitle>Confira seu e-mail</AlertTitle>
          <AlertDescription>Se houver uma conta com esse endereço, o link chega em alguns minutos. Olhe também o spam.</AlertDescription>
        </Alert>
      ) : null}
      <fieldset disabled={busy} className="contents">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${id}-email`}>E-mail</FieldLabel>
            <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required />
          </Field>
          <Submit busy={busy}>{sent ? "Mandar de novo" : "Mandar link"}</Submit>
          {signInHref ? (
            <FieldDescription className="text-center text-[15px]">
              Lembrou?{" "}
              <a href={signInHref} className="font-bold text-primary">
                Voltar para entrar
              </a>
            </FieldDescription>
          ) : null}
        </FieldGroup>
      </fieldset>
    </form>
  );
}

/** A new password typed twice; the second must match before it submits. */
export function ResetPasswordForm({ onSubmit, error, busy, className }: Common & { onSubmit: (v: { password: string }) => void }) {
  const id = useId();
  const [mismatch, setMismatch] = useState(false);
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        const f = values(e);
        const password = String(f.get("password"));
        if (password !== String(f.get("confirm"))) {
          setMismatch(true);
          return;
        }
        setMismatch(false);
        onSubmit({ password });
      }}
    >
      <AuthHeader title="Nova senha" description="Escolha uma senha que você não usa em outro lugar." />
      <ServerError error={error} />
      <fieldset disabled={busy} className="contents">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`${id}-password`}>Nova senha</FieldLabel>
            <PasswordInput id={`${id}-password`} name="password" autoComplete="new-password" />
            <FieldDescription>Pelo menos 8 caracteres.</FieldDescription>
          </Field>
          <Field data-invalid={mismatch || undefined}>
            <FieldLabel htmlFor={`${id}-confirm`}>Repita a senha</FieldLabel>
            <PasswordInput id={`${id}-confirm`} name="confirm" autoComplete="new-password" invalid={mismatch} />
            {mismatch ? <FieldError>As duas senhas não são iguais.</FieldError> : null}
          </Field>
          <Submit busy={busy}>Salvar senha</Submit>
        </FieldGroup>
      </fieldset>
    </form>
  );
}

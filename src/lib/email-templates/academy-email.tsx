import React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

export type AcademyEmailKind = "signup" | "login" | "payment" | "support" | "blog" | "contact";
export const emailSenders: Record<AcademyEmailKind, string> = {
  signup: "noreply@candlesticksacademy.online",
  login: "noreply@candlesticksacademy.online",
  payment: "payments@candlesticksacademy.online",
  support: "support@candlesticksacademy.online",
  blog: "info@candlesticksacademy.online",
  contact: "contact@candlesticksacademy.online",
};
export const emailSubjects: Record<AcademyEmailKind, string> = {
  signup: "Welcome to Candlesticks Academy",
  login: "New sign-in to Candlesticks Academy",
  payment: "Your Candlesticks Academy payment receipt",
  support: "Your Candlesticks Academy support request",
  blog: "Candlesticks Academy journal",
  contact: "We received your message — Candlesticks Academy",
};
interface Props {
  kind: AcademyEmailKind;
  name?: string;
  reference?: string;
  amount?: string;
  message?: string;
  actionUrl?: string;
}
const brand = {
  ink: "#121417",
  surface: "#1c1f24",
  accent: "#ffb600",
  text: "#f7f7f3",
  muted: "#9299a5",
  border: "#30343a",
};
export function AcademyEmail({ kind, name, reference, amount, message, actionUrl }: Props) {
  const copy: Record<AcademyEmailKind, string> = {
    signup: "Your account is ready. Welcome to your trading journey.",
    login:
      "A new sign-in was completed for your account. If this was not you, reset your password and contact support.",
    payment: "Moolre has confirmed your payment. Your membership record has been updated.",
    support: "Your support request has been received. Our team will reply to you here.",
    blog: "The latest from the Candlesticks Academy journal.",
    contact: "Thank you for contacting Candlesticks Academy. Your message has been received.",
  };
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Manrope"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{emailSubjects[kind]}</Preview>
      <Body style={{ margin: 0, backgroundColor: "#ffffff", fontFamily: "Manrope" }}>
        <Container style={{ maxWidth: 600, padding: "32px 20px" }}>
          <Section
            style={{
              backgroundColor: brand.ink,
              padding: "32px",
              borderRadius: 8,
              color: brand.text,
            }}
          >
            <Text
              style={{ color: brand.accent, fontWeight: 800, fontSize: 20, margin: "0 0 28px" }}
            >
              CANDLESTICKS ACADEMY
            </Text>
            <Hr style={{ borderColor: brand.border }} />
            <Heading style={{ fontSize: 26, lineHeight: "34px", fontWeight: 800 }}>
              {emailSubjects[kind]}
            </Heading>
            <Text style={{ fontSize: 15, lineHeight: "26px" }}>Hello {name || "Trader"},</Text>
            <Text style={{ fontSize: 15, lineHeight: "26px" }}>{message || copy[kind]}</Text>
            {reference && (
              <Text style={{ color: brand.muted, fontSize: 13 }}>Reference: {reference}</Text>
            )}
            {amount && (
              <Text style={{ color: brand.accent, fontSize: 22, fontWeight: 800 }}>{amount}</Text>
            )}
            {actionUrl && (
              <Button
                href={actionUrl}
                style={{
                  backgroundColor: brand.accent,
                  color: brand.ink,
                  padding: "14px 22px",
                  borderRadius: 6,
                  fontWeight: 800,
                  marginTop: 16,
                }}
              >
                Open Candlesticks Academy
              </Button>
            )}
            <Hr style={{ borderColor: brand.border, marginTop: 28 }} />
            <Text style={{ color: brand.muted, fontSize: 12 }}>
              Candlesticks Academy · candlesticksacademy.online
            </Text>
          </Section>
          <Text style={{ fontSize: 12, color: brand.ink, textAlign: "center" }}>
            Reply to {emailSenders[kind]} for this message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
export const SignupEmail = (props: Omit<Props, "kind">) => (
  <AcademyEmail {...props} kind="signup" />
);
export const LoginEmail = (props: Omit<Props, "kind">) => <AcademyEmail {...props} kind="login" />;
export const PaymentEmail = (props: Omit<Props, "kind">) => (
  <AcademyEmail {...props} kind="payment" />
);
export const SupportEmail = (props: Omit<Props, "kind">) => (
  <AcademyEmail {...props} kind="support" />
);
export const BlogEmail = (props: Omit<Props, "kind">) => <AcademyEmail {...props} kind="blog" />;
export const ContactEmail = (props: Omit<Props, "kind">) => (
  <AcademyEmail {...props} kind="contact" />
);

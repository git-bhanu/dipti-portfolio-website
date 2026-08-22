'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SERVICES = ['Brand Strategy', 'Brand Indentity', 'Website Design'];
const BUDGETS = ['₹1L–₹2L', '₹2L–₹4L', '₹4L–₹7L', '₹7L+', 'Not Sure'];
const PHONE_MAX_LENGTH = 15; // E.164 max

function sanitizePhone(raw: string) {
  const hasLeadingPlus = raw.trim().startsWith('+');
  const digits = raw.replace(/\D/g, '');
  return (hasLeadingPlus ? '+' : '') + digits.slice(0, PHONE_MAX_LENGTH);
}

function Pill({ value, children }: { value: string; children: ReactNode }) {
  return (
    <ToggleGroupItem value={value} className="group">
      <Check className="hidden size-3 group-data-[state=on]:inline" strokeWidth={3} />
      {children}
    </ToggleGroupItem>
  );
}

export default function ContactForm({ toEmail, onSubmitted }: { toEmail: string; onSubmitted: () => void }) {
  const [services, setServices] = useState<string[]>(['Brand Strategy']);
  const [budget, setBudget] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!budget) {
      setBudgetError(true);
      return;
    }
    setBudgetError(false);
    setSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      services,
      budget,
      message: formData.get('message'),
      callMe: formData.get('callMe') === 'on',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      onSubmitted();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[480px] flex-col items-start gap-[20px]">
      <div className="w-full">
        <Label htmlFor="name" className="sr-only">
          Name
        </Label>
        <Input id="name" name="name" placeholder="Name*" required />
      </div>

      <div className="w-full">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input id="email" name="email" type="email" placeholder="Email*" required />
      </div>

      <div className="w-full">
        <Label htmlFor="phone" className="sr-only">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="Phone*"
          required
          value={phone}
          onChange={(e) => setPhone(sanitizePhone(e.target.value))}
          minLength={7}
          maxLength={PHONE_MAX_LENGTH}
          pattern="\+?[0-9]{7,15}"
          title="7 to 15 digits, optionally starting with +"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-[8px] pt-[8px]">
        <Label className="leading-[32px]">What services are you looking for?</Label>
        <ToggleGroup
          type="multiple"
          value={services}
          onValueChange={(value: string[]) => value.length && setServices(value)}
          className="flex w-full flex-wrap justify-start gap-[8px]"
        >
          {SERVICES.map((service) => (
            <Pill key={service} value={service}>
              {service}
            </Pill>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex w-full flex-col items-start gap-[8px] pt-[8px]">
        <Label className="leading-[32px]">Estimated budget*</Label>
        <ToggleGroup
          type="single"
          value={budget}
          onValueChange={(value: string) => {
            if (!value) return;
            setBudget(value);
            setBudgetError(false);
          }}
          className="flex w-full flex-wrap justify-start gap-[8px]"
        >
          {BUDGETS.map((b) => (
            <Pill key={b} value={b}>
              {b}
            </Pill>
          ))}
        </ToggleGroup>
        {budgetError && <p className="text-[12px] text-red-400">Please select a budget.</p>}
      </div>

      <div className="w-full">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea id="message" name="message" placeholder="Tell us about your project." />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send Project Brief'}
      </Button>

      {error && (
        <p className="text-[12px] text-brand-muted">
          Something went wrong. Try again, or email us directly at{' '}
          <a href={`mailto:${toEmail}`} className="underline text-brand-white">
            {toEmail}
          </a>
          .
        </p>
      )}

      <div className="flex h-[24px] items-center gap-[4px]">
        <Checkbox id="callMe" name="callMe" />
        <Label htmlFor="callMe" className="text-[10px] font-normal text-brand-white">
          Please call me to discuss my project.
        </Label>
      </div>
    </form>
  );
}

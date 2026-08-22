'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SERVICES = ['Brand Strategy', 'Brand Indentity', 'Packaging Design', 'Website Design'];
const BUDGETS = ['$1,000-$2,500', '$2,500-$5,000', '$5,000-$10,000', '$10,000+', 'Not Sure'];
const CONNECT_OPTIONS = ['Please call me to discuss my project', 'Email me'];
const TIME_SLOTS = ['10:30-11:00 AM', '11:00-11:30 AM', '11:30 AM-12:00 PM', '12:00-12:30 PM', 'Not Sure'];
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

export default function BriefForm({ toEmail, onSubmitted }: { toEmail: string; onSubmitted: () => void }) {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [connect, setConnect] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [budgetError, setBudgetError] = useState(false);
  const wantsCall = connect === CONNECT_OPTIONS[0];
  const wantsEmail = connect === CONNECT_OPTIONS[1];

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
    const message = (formData.get('message') as string) ?? '';
    const payload = {
      name: formData.get('name'),
      email: wantsCall ? '' : formData.get('email'),
      phone: wantsCall ? formData.get('phone') : '',
      services,
      budget,
      message: wantsCall && time ? `Preferred time to call: ${time}\n\n${message}` : message,
      callMe: wantsCall,
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
        <Label className="leading-[32px]">Project investment*</Label>
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

      <div className="flex w-full flex-col items-start gap-[8px] pt-[8px]">
        <Label className="leading-[32px]">How would you like to connect?</Label>
        <ToggleGroup
          type="single"
          value={connect}
          onValueChange={(value: string) => value && setConnect(value)}
          className="flex w-full flex-wrap justify-start gap-[8px]"
        >
          {CONNECT_OPTIONS.map((option) => (
            <Pill key={option} value={option}>
              {option}
            </Pill>
          ))}
        </ToggleGroup>
      </div>

      {wantsCall && (
        <>
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
            <Label className="leading-[32px]">Preferred time to reach you · Mon–Fri (CT)</Label>
            <ToggleGroup
              type="single"
              value={time}
              onValueChange={(value: string) => value && setTime(value)}
              className="flex w-full flex-wrap justify-start gap-[8px]"
            >
              {TIME_SLOTS.map((slot) => (
                <Pill key={slot} value={slot}>
                  {slot}
                </Pill>
              ))}
            </ToggleGroup>
          </div>
        </>
      )}

      {wantsEmail && (
        <div className="w-full">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" name="email" type="email" placeholder="Email*" required />
        </div>
      )}

      <div className="w-full">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea id="message" name="message" placeholder="Tell us about your project." />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send Project Brief'}
      </Button>

      <p className="text-[12px] text-brand-muted">A remote-first studio working with brands worldwide.</p>

      {error && (
        <p className="text-[12px] text-brand-muted">
          Something went wrong. Try again, or email us directly at{' '}
          <a href={`mailto:${toEmail}`} className="underline text-brand-white">
            {toEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}

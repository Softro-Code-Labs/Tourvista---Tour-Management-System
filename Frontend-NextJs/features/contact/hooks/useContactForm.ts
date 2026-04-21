'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { ContactFormData } from '../types/contact.types';
import { sendContactMessage } from '../services/contact.service';
import { contactSchema } from '../schemas/contact.schema';
import toast from 'react-hot-toast';

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  // Auto fill email and name
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;

    setForm((prev) => ({
      ...prev,
      email: user.emailAddresses[0]?.emailAddress ?? '',
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
    }));
  }, [isLoaded, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error(firstError.message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await sendContactMessage(form);

      toast.success('Message sent successfully ✈️');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      toast.error('Failed to send message. Please try again later. 😞');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  };
}

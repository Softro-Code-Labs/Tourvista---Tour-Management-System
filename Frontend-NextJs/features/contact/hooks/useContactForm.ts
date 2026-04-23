'use client';

import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { ContactFormData } from '../types/contact.types';
import { sendContactMessage } from '../services/contact.service';
import { contactSchema } from '../schemas/contact.schema';
import toast from 'react-hot-toast';

const INITIAL_STATE: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      setForm((prev) => ({
        ...prev,
        email: prev.email || user.emailAddresses[0]?.emailAddress || '',
        name:
          prev.name || `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      }));
    }
  }, [isLoaded, user]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      await sendContactMessage(validation.data);

      toast.success('Message sent successfully ✈️');
      setForm(INITIAL_STATE);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send message');
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

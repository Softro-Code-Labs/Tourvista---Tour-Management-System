'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

import { ContactFormData } from '../types/contact.types';
import { contactService } from '../services/contact.service';
import { contactSchema } from '../schemas/contact.schema';

export function useContactForm() {
  const { user, isLoaded } = useUser();

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // AUTO-FILL NAME AND EMAIL IF USER IS LOGGED IN
  useEffect(() => {
    if (isLoaded && user) {
      setValue('email', user.emailAddresses[0]?.emailAddress || '');
      setValue('name', `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim());
    }
  }, [isLoaded, user, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await contactService.create(data);
      if (res?.success) {
        toast.success('Message sent! We will get back to you soon.');
        reset();
      } else {
        toast.error(
          res?.message || 'Failed to send message. Please try again.',
        );
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    }
  };

  return {
    methods,
    onSubmit: handleSubmit(onSubmit),
    loading: isSubmitting,
  };
}

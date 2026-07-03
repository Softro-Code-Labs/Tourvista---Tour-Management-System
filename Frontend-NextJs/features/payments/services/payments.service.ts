import { PaymentFormData } from '../schema/payments.schema';

export const paymentService = {
  async create(data: PaymentFormData) {
    const res = await fetch(`/api/v1/payments/initiate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // async update(id: number) {
  //   const res = await fetch(`/api/v1/payments/${id}`, {
  //     method: 'PATCH',
  //   });
  //   return res.json();
  // },
};

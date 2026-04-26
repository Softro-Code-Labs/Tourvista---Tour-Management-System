export async function getMessages(params: Record<string, any> = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/v1/contact?${query}`);
  return res.json();
}

export async function markMessageRead(id: number, isRead: boolean) {
  const res = await fetch(`/api/v1/contact/${id}/read`, {
    method: 'PATCH',
    body: JSON.stringify({ isRead }),
  });
  return res.json();
}

export async function deleteMessageById(id: number) {
  const res = await fetch(`/api/v1/contact/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

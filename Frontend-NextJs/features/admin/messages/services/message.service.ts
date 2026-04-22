export async function getMessages(query: string) {
  const res = await fetch(`/api/v1/contact?${query}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch messages');
  }

  return data.data;
}

export async function markMessageRead(id: number, isRead: boolean) {
  const res = await fetch(`/api/v1/contact/${id}/read`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isRead }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update message');
  }

  return data;
}

export async function deleteMessageById(id: number) {
  const res = await fetch(`/api/v1/contact/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete message');
  }

  return data;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  credits?: number;
  membership?: string;
}

export const purchaseCredits = async (userId: string, credits: number): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/credits/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, credits })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { success: false, message: data?.message || 'Payment failed' };
    }
    const data = await response.json();
    return { success: true, message: data.message || 'Payment successful', credits: data.credits };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

export const upgradeMembership = async (userId: string, membership: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/membership/upgrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, membership })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { success: false, message: data?.message || 'Upgrade failed' };
    }
    const data = await response.json();
    return { success: true, message: data.message || 'Upgrade successful', membership: data.membership };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
};

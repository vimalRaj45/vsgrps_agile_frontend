import axios from '../api/client';

const VAPID_PUBLIC_KEY = "BOZj0Xn-ovaxN5U2b0tNJfQlUNcVYxEJgYUV8KAHw9teItdlSj9Hqd4VypiH_bZ8QfVfmRe3TO3Xdpp83OYZT90";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Get or create subscription
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
      console.log('✅ New Push Subscription created');
    }

    // Always send/sync subscription to backend
    await axios.post('/notifications/subscribe', { subscription });
    localStorage.setItem('push_subscribed', 'true');
    console.log('✅ Push Subscription synced with server');
  } catch (error) {
    console.error('❌ Failed to subscribe to push notifications:', error);
  }
}
export async function unsubscribeFromPush() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      console.log('✅ Browser Push Subscription removed');
    }
    localStorage.removeItem('push_subscribed');
  } catch (error) {
    console.error('❌ Failed to unsubscribe from push notifications:', error);
  }
}

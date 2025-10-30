import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Mock payment webhook
export const paymentMock = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { order_id } = req.body;

    if (!order_id) {
      res.status(400).json({ error: 'Missing order_id' });
      return;
    }

    // Update order status
    const db = admin.firestore();
    const orderQuery = await db.collection('orders')
      .where('order_id', '==', order_id)
      .limit(1)
      .get();

    if (orderQuery.empty) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    const orderDoc = orderQuery.docs[0];
    await orderDoc.ref.update({
      'payment.status': 'paid',
      'status': 'confirmed',
      'timestamps.paid': Date.now()
    });

    // Log the webhook call
    await db.collection('logs').add({
      type: 'payment_webhook',
      order_id: order_id,
      timestamp: Date.now(),
      status: 'success'
    });

    // Call LINE Notify
    await lineNotifyStub({
      type: 'order',
      payload: {
        order_id: order_id,
        status: 'paid',
        message: `Order ${order_id} has been paid successfully`
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Payment processed successfully',
      order_id: order_id
    });

  } catch (error) {
    console.error('Payment webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LINE Notify stub
export const lineNotifyStub = functions.https.onCall(async (data, context) => {
  try {
    const { type, payload } = data;

    // Log the notification request
    const db = admin.firestore();
    await db.collection('logs').add({
      type: 'line_notify_stub',
      notification_type: type,
      payload: payload,
      timestamp: Date.now(),
      user_agent: context?.rawRequest?.headers['user-agent'] || 'unknown'
    });

    // Simulate LINE notification logic
    let message = '';
    
    switch (type) {
      case 'order':
        message = `🛒 New Order Alert!\n` +
                 `Order ID: ${payload.order_id}\n` +
                 `Status: ${payload.status}\n` +
                 `Time: ${new Date().toLocaleString('th-TH')}`;
        break;
        
      case 'lead':
        message = `🏢 New Property Inquiry!\n` +
                 `Lead ID: ${payload.lead_id}\n` +
                 `Unit: ${payload.unit_id}\n` +
                 `Contact: ${payload.buyer?.name} (${payload.buyer?.phone})\n` +
                 `Preferred Time: ${payload.preferred_time}\n` +
                 `Time: ${new Date().toLocaleString('th-TH')}`;
        break;
        
      default:
        message = `📢 System Notification\n` +
                 `Type: ${type}\n` +
                 `Data: ${JSON.stringify(payload)}\n` +
                 `Time: ${new Date().toLocaleString('th-TH')}`;
    }

    console.log('LINE Notify Stub - Message:', message);
    console.log('LINE Notify Stub - Payload:', JSON.stringify(payload, null, 2));

    // In a real implementation, you would send this to LINE Notify API:
    // const response = await fetch('https://notify-api.line.me/api/notify', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': `Bearer ${process.env.LINE_NOTIFY_TOKEN}`
    //   },
    //   body: `message=${encodeURIComponent(message)}`
    // });

    return {
      success: true,
      message: 'Notification logged successfully',
      stub_message: message,
      type: type
    };

  } catch (error) {
    console.error('LINE Notify stub error:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to process notification',
      { error: error.message }
    );
  }
});

// Order status change trigger
export const onOrderStatusChange = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Check if payment status changed to 'paid'
    if (before.payment?.status !== 'paid' && after.payment?.status === 'paid') {
      try {
        // Notify via LINE
        await lineNotifyStub({
          type: 'order',
          payload: {
            order_id: after.order_id,
            status: 'paid',
            shop_id: after.shop_id,
            total_amount: after.items?.reduce((sum: number, item: any) => 
              sum + (item.price * item.qty), 0
            ) || 0,
            buyer: after.buyer,
            message: `Order ${after.order_id} payment confirmed`
          }
        });

        console.log(`Order ${after.order_id} payment notification sent`);
      } catch (error) {
        console.error('Failed to send order notification:', error);
      }
    }
  });

// Lead creation trigger
export const onLeadCreate = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snap, context) => {
    const leadData = snap.data();

    try {
      // Notify via LINE
      await lineNotifyStub({
        type: 'lead',
        payload: {
          lead_id: leadData.lead_id,
          unit_id: leadData.unit_id,
          buyer: leadData.buyer,
          preferred_time: leadData.preferred_time,
          notes: leadData.notes,
          source_device: leadData.source_device,
          message: `New property inquiry for unit ${leadData.unit_id}`
        }
      });

      console.log(`Lead ${leadData.lead_id} notification sent`);
    } catch (error) {
      console.error('Failed to send lead notification:', error);
    }
  });

// Health check endpoint
export const healthCheck = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send('');
    return;
  }

  res.status(200).json({
    status: 'healthy',
    timestamp: Date.now(),
    version: '1.0.0',
    functions: [
      'paymentMock',
      'lineNotifyStub',
      'onOrderStatusChange',
      'onLeadCreate',
      'healthCheck'
    ]
  });
});

// Scheduled cleanup of old logs (runs daily)
export const cleanupLogs = functions.pubsub.schedule('0 2 * * *').onRun(async (context) => {
  const db = admin.firestore();
  const cutoffDate = Date.now() - (30 * 24 * 60 * 60 * 1000); // 30 days ago

  try {
    const oldLogs = await db.collection('logs')
      .where('timestamp', '<', cutoffDate)
      .limit(100)
      .get();

    const batch = db.batch();
    oldLogs.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Deleted ${oldLogs.size} old log entries`);
  } catch (error) {
    console.error('Failed to cleanup logs:', error);
  }
});
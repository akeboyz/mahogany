'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Device } from '@/lib/types';

export default function DevicesAdmin() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devicesSnapshot = await getDocs(collection(db, 'devices'));
        const devicesData = devicesSnapshot.docs.map(doc => ({ 
          ...doc.data(),
          device_id: doc.id 
        } as Device));
        setDevices(devicesData);
      } catch (error) {
        console.error('Failed to load devices:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  const handleDeviceSelect = async (deviceId: string) => {
    try {
      const deviceDoc = await getDoc(doc(db, 'devices', deviceId));
      if (deviceDoc.exists()) {
        setSelectedDevice({ ...deviceDoc.data(), device_id: deviceId } as Device);
      }
    } catch (error) {
      console.error('Failed to load device details:', error);
    }
  };

  const getStatusColor = (device: Device) => {
    const lastSeen = Date.now() - device.heartbeat_ts;
    const fiveMinutes = 5 * 60 * 1000;
    
    if (lastSeen < fiveMinutes) return 'text-green-400';
    if (lastSeen < fiveMinutes * 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusText = (device: Device) => {
    const lastSeen = Date.now() - device.heartbeat_ts;
    const minutes = Math.floor(lastSeen / (1000 * 60));
    
    if (minutes < 5) return 'Online';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading devices...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Devices</h2>
        <div className="text-sm text-gray-400">
          Total: {devices.length} devices
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices List */}
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.device_id}
              onClick={() => handleDeviceSelect(device.device_id)}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                selectedDevice?.device_id === device.device_id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{device.device_id}</h3>
                  <p className="text-gray-400 text-sm">{device.venue_id}</p>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getStatusColor(device)}`}>
                    {getStatusText(device)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {device.content_profile}
                  </div>
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {device.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {devices.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No devices found
            </div>
          )}
        </div>

        {/* Device Details */}
        <div className="bg-gray-800 rounded-lg p-6">
          {selectedDevice ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">{selectedDevice.device_id}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Venue ID:</strong><br />
                  {selectedDevice.venue_id}
                </div>
                <div>
                  <strong>Content Profile:</strong><br />
                  {selectedDevice.content_profile}
                </div>
                <div>
                  <strong>Playlist:</strong><br />
                  {selectedDevice.current_playlist_id}
                </div>
                <div>
                  <strong>Language:</strong><br />
                  {selectedDevice.app_config.lang_default}
                </div>
              </div>

              <div>
                <strong>Capabilities:</strong>
                <div className="mt-1 space-y-1 text-sm">
                  <div>Touch: {selectedDevice.capabilities.touch ? '✅' : '❌'}</div>
                  <div>Max Resolution: {selectedDevice.capabilities.max_res}</div>
                </div>
              </div>

              <div>
                <strong>Configuration:</strong>
                <div className="mt-1 space-y-1 text-sm">
                  <div>Idle Timeout: {selectedDevice.app_config.idle_timeout_sec}s</div>
                  <div>QR Base URL: {selectedDevice.app_config.qr_base_url}</div>
                </div>
              </div>

              <div>
                <strong>Tags:</strong>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedDevice.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong>Last Heartbeat:</strong><br />
                <span className={getStatusColor(selectedDevice)}>
                  {new Date(selectedDevice.heartbeat_ts).toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Select a device to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
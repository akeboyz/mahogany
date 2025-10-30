'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Device, Unit, Lead } from '@/lib/types';
import { trackLeadSubmit } from '@/lib/analytics';
import UnitList from './UnitList';
import UnitDetails from './UnitDetails';
import LeadForm from './LeadForm';
import QRHandoff from './QRHandoff';

interface PropertyFlowProps {
  device: Device;
  onBack: () => void;
}

export default function PropertyFlow({ device, onBack }: PropertyFlowProps) {
  const [currentStep, setCurrentStep] = useState<'units' | 'details' | 'lead' | 'success'>('units');
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const lang = device.app_config.lang_default;

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const unitsSnapshot = await getDocs(collection(db, 'units'));
        const unitsData = unitsSnapshot.docs.map((doc: any) => ({ ...doc.data() } as Unit));
        // Filter available units
        const availableUnits = unitsData.filter((unit: Unit) => 
          unit.condition.for_sale || unit.condition.for_rent
        );
        setUnits(availableUnits);
      } catch (error) {
        console.error('Failed to load units:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnits();
  }, []);

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentStep('details');
  };

  const handleLeadSubmit = async (leadData: {
    name: string;
    phone: string;
    preferredTime: string;
    notes?: string;
  }) => {
    if (!selectedUnit) return;

    try {
      const newLeadId = `LEAD-${Date.now()}`;
      
      const lead: Lead = {
        lead_id: newLeadId,
        source_device: device.device_id,
        unit_id: selectedUnit.unit_id,
        buyer: {
          name: leadData.name,
          phone: leadData.phone
        },
        preferred_time: leadData.preferredTime,
        notes: leadData.notes,
        status: 'new',
        created_at: Date.now()
      };

      await addDoc(collection(db, 'leads'), lead);
      trackLeadSubmit(device.device_id, selectedUnit.unit_id);
      
      setLeadId(newLeadId);
      setCurrentStep('success');
    } catch (error) {
      console.error('Failed to submit lead:', error);
      alert(lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'Error occurred. Please try again.');
    }
  };

  const handleStartOver = () => {
    setCurrentStep('units');
    setSelectedUnit(null);
    setLeadId('');
  };

  if (loading) {
    return (
      <div className="kiosk-layout flex items-center justify-center">
        <div className="text-2xl">{lang === 'th' ? 'กำลังโหลด...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="kiosk-layout bg-gray-900">
      {currentStep === 'units' && (
        <UnitList
          units={units}
          device={device}
          onSelect={handleUnitSelect}
          onBack={onBack}
        />
      )}

      {currentStep === 'details' && selectedUnit && (
        <UnitDetails
          unit={selectedUnit}
          device={device}
          onRequestCallback={() => setCurrentStep('lead')}
          onBack={() => setCurrentStep('units')}
        />
      )}

      {currentStep === 'lead' && selectedUnit && (
        <LeadForm
          unit={selectedUnit}
          device={device}
          onSubmit={handleLeadSubmit}
          onBack={() => setCurrentStep('details')}
        />
      )}

      {currentStep === 'success' && (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-400 mb-2">
              {lang === 'th' ? 'ส่งข้อมูลสำเร็จ!' : 'Request Submitted!'}
            </h2>
            <p className="text-gray-300 mb-4">
              {lang === 'th' 
                ? `หมายเลขคำขอ: ${leadId}`
                : `Request ID: ${leadId}`
              }
            </p>
            <p className="text-gray-400 text-sm max-w-md">
              {lang === 'th' 
                ? 'เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง'
                : 'Our team will contact you within 24 hours'
              }
            </p>
          </div>

          <QRHandoff
            device={device}
            currentRoute="/lead-status"
            params={{ leadId }}
          />

          <button
            onClick={handleStartOver}
            className="touch-button mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold"
          >
            {lang === 'th' ? 'ดูห้องอื่น' : 'View Other Units'}
          </button>
        </div>
      )}
    </div>
  );
}
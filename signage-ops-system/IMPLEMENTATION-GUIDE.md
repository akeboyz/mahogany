# Implementation Guide - Digital Signage Operations System

## Overview
Step-by-step guide to build and deploy the internal operations management system for digital signage business.

---

## PHASE 1: PROJECT SETUP (Week 1)

### 1.1 Initialize Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest signage-ops-system --typescript --tailwind --app

# Navigate to project
cd signage-ops-system

# Install dependencies
npm install firebase
npm install react-hook-form zod @hookform/resolvers
npm install @tanstack/react-table
npm install date-fns
npm install recharts
npm install jspdf
npm install react-hot-toast
npm install lucide-react  # Icons
```

### 1.2 Firebase Setup

```bash
# Initialize Firebase
npm install -g firebase-tools
firebase login
firebase init

# Select:
# - Firestore
# - Storage
# - Functions
# - Hosting (optional)
```

**Create Firebase Project:**
1. Go to Firebase Console
2. Create new project: "signage-ops-system"
3. Enable Firestore Database
4. Enable Storage
5. Enable Authentication (Email/Password)
6. Get Firebase config

**Environment Variables (.env.local):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 1.3 Project Structure Setup

```bash
# Create directory structure
mkdir -p app/dashboard
mkdir -p app/operations/projects
mkdir -p app/operations/signages
mkdir -p app/operations/devices
mkdir -p app/operations/networks
mkdir -p app/operations/installations
mkdir -p app/operations/vendors
mkdir -p app/requests/new
mkdir -p app/approvals
mkdir -p app/reports
mkdir -p components/layout
mkdir -p components/forms
mkdir -p components/ui
mkdir -p components/dashboard
mkdir -p lib/firebase
mkdir -p lib/types
mkdir -p lib/utils
mkdir -p lib/hooks
mkdir -p contexts
```

### 1.4 Install UI Component Library

**Option A: shadcn/ui (Recommended)**
```bash
npx shadcn-ui@latest init

# Install components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
```

---

## PHASE 2: DATA MODELS & FIREBASE (Week 2)

### 2.1 Firestore Collections Setup

**Create Firestore Collections:**
1. Open Firebase Console → Firestore Database
2. Create collections with sample data:
   - `projects`
   - `signages`
   - `devices`
   - `networks`
   - `installations`
   - `maintenance`
   - `vendors`
   - `requests`
   - `users`

### 2.2 Firestore Security Rules

**firestore.rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function: User is authenticated
    function isSignedIn() {
      return request.auth != null;
    }

    // Helper function: User has role
    function hasRole(role) {
      return isSignedIn() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }

    // Helper function: User is admin or manager
    function isAdminOrManager() {
      return hasRole('admin') || hasRole('manager');
    }

    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if hasRole('admin');
    }

    // Projects collection
    match /projects/{projectId} {
      allow read: if isSignedIn();
      allow create: if hasRole('sales') || isAdminOrManager();
      allow update: if isAdminOrManager();
      allow delete: if hasRole('admin');
    }

    // Signages collection
    match /signages/{signageId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || isAdminOrManager();
    }

    // Devices collection
    match /devices/{deviceId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || isAdminOrManager();
    }

    // Networks collection
    match /networks/{networkId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || isAdminOrManager();
    }

    // Installations collection
    match /installations/{installationId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || isAdminOrManager();
    }

    // Vendors collection
    match /vendors/{vendorId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || hasRole('finance') || isAdminOrManager();
    }

    // Requests collection
    match /requests/{requestId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn();
      allow delete: if hasRole('admin');
    }

    // Maintenance collection
    match /maintenance/{maintenanceId} {
      allow read: if isSignedIn();
      allow write: if hasRole('operations') || isAdminOrManager();
    }
  }
}
```

### 2.3 TypeScript Types

**lib/types/index.ts:**
```typescript
// Enums
export type ProjectStatus = 'planning' | 'quotation' | 'contracted' | 'installing' | 'active' | 'maintenance' | 'inactive';
export type RequestType = 'project_request' | 'quotation_request' | 'contract_request' | 'installation_request' | 'payment_request';
export type RequestStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'completed';
export type UserRole = 'sales' | 'operations' | 'finance' | 'manager' | 'admin';
export type SignageStatus = 'in_stock' | 'ready_for_installation' | 'active' | 'maintenance' | 'faulty' | 'retired';
export type DeviceType = 'raspberry_pi' | 'wifi_router' | 'pocket_wifi' | 'other';

// Audit fields
export interface AuditFields {
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
}

// Project interface
export interface Project extends AuditFields {
  project_id: string;
  project_name: string;
  project_type: string;
  project_address: string;
  project_status: ProjectStatus;
  signage_operations: {
    signage_ids: string[];
    device_ids: string[];
    network_ids: string[];
    installation_ids: string[];
    costs: {
      signage_cost: number;
      device_cost: number;
      network_cost_monthly: number;
      installation_cost: number;
      total_investment: number;
    };
    deployment_status: string;
    go_live_date?: string;
  };
  contact_person: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  // ... other fields from project.json
}

// Signage interface
export interface Signage extends AuditFields {
  signage_id: string;
  project_id: string;
  screen_size_inch: number;
  resolution: string;
  orientation: 'portrait' | 'landscape';
  brand: string;
  model: string;
  serial_number: string;
  vendor_name: string;
  acquired_date: string;
  cost: number;
  warranty_expiry: string;
  status: SignageStatus;
  location_building?: string;
  location_floor?: string;
  location_zone?: string;
  device_id?: string;
  network_id?: string;
  go_live_date?: string;
}

// Device interface
export interface Device extends AuditFields {
  device_id: string;
  project_id: string;
  signage_id?: string;
  device_type: DeviceType;
  brand: string;
  model: string;
  serial_number: string;
  mac_address?: string;
  vendor_name: string;
  acquired_date: string;
  cost: number;
  warranty_expiry: string;
  status: SignageStatus;
}

// Request interface
export interface Request extends AuditFields {
  request_id: string;
  request_type: RequestType;
  project_id?: string;
  status: RequestStatus;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  submitted_by: string;
  submitted_date: string;
  reviewed_by?: string;
  reviewed_date?: string;
  approved_by?: string;
  approved_date?: string;
  request_data: any; // Type varies by request_type
  attachments: string[];
  comments: Comment[];
}

// User interface
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  created_date: string;
}

// ... Add other interfaces as needed
```

### 2.4 Firebase Client Setup

**lib/firebase/config.ts:**
```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
```

**lib/firebase/firestore.ts:**
```typescript
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { Project, Signage, Device, Request } from '../types';

// Generic CRUD operations
export async function getDocument<T>(collectionName: string, documentId: string): Promise<T | null> {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

export async function getAllDocuments<T>(collectionName: string): Promise<T[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

export async function addDocument<T>(collectionName: string, data: Partial<T>, userId: string): Promise<string> {
  const now = new Date().toISOString();
  const docData = {
    ...data,
    created_by: userId,
    created_date: now,
    updated_by: userId,
    updated_date: now,
  };

  const docRef = await addDoc(collection(db, collectionName), docData);
  return docRef.id;
}

export async function updateDocument<T>(
  collectionName: string,
  documentId: string,
  data: Partial<T>,
  userId: string
): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updated_by: userId,
    updated_date: new Date().toISOString(),
  });
}

export async function deleteDocument(collectionName: string, documentId: string): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}

// Specific queries
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const q = query(
    collection(db, 'projects'),
    where('project_status', '==', status),
    orderBy('created_date', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
}

export async function getRequestsByStatus(status: string): Promise<Request[]> {
  const q = query(
    collection(db, 'requests'),
    where('status', '==', status),
    orderBy('submitted_date', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request));
}

// ... Add more specific query functions as needed
```

---

## PHASE 3: AUTHENTICATION & LAYOUT (Week 3)

### 3.1 Authentication Context

**contexts/AuthContext.tsx:**
```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || '',
            ...userDoc.data(),
          } as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 3.2 Main Layout Components

**components/layout/MainLayout.tsx:**
```typescript
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuth } from '@/contexts/AuthContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**components/layout/Sidebar.tsx:**
```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Monitor,
  Cpu,
  Wifi,
  Wrench,
  FileText,
  CheckSquare,
  BarChart3,
  Users,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'Operations',
    icon: FolderKanban,
    children: [
      { name: 'Projects', href: '/operations/projects', icon: FolderKanban },
      { name: 'Signages', href: '/operations/signages', icon: Monitor },
      { name: 'Devices', href: '/operations/devices', icon: Cpu },
      { name: 'Networks', href: '/operations/networks', icon: Wifi },
      { name: 'Installations', href: '/operations/installations', icon: Wrench },
      { name: 'Vendors', href: '/operations/vendors', icon: Users },
    ],
  },
  {
    name: 'Requests',
    icon: FileText,
    children: [
      { name: 'New Request', href: '/requests/new', icon: FileText },
      { name: 'All Requests', href: '/requests', icon: FileText },
    ],
  },
  { name: 'Approvals', href: '/approvals', icon: CheckSquare, badge: 3 },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>
          SignageOps
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavItem key={item.name} item={item} isOpen={isOpen} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}

// NavItem component with collapsible children...
```

### 3.3 Protected Routes

**middleware.ts (root):**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  // Redirect to login if not authenticated

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/operations/:path*', '/requests/:path*'],
};
```

---

## PHASE 4: DASHBOARD & OPERATIONS (Week 4-5)

### 4.1 Dashboard Page

**app/dashboard/page.tsx:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getAllDocuments } from '@/lib/firebase/firestore';
import type { Project, Signage, Network } from '@/lib/types';
import MetricCard from '@/components/dashboard/MetricCard';
import AlertsList from '@/components/dashboard/AlertsList';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import CostChart from '@/components/dashboard/CostChart';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [signages, setSignages] = useState<Signage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [projectsData, signagesData] = await Promise.all([
        getAllDocuments<Project>('projects'),
        getAllDocuments<Signage>('signages'),
      ]);

      setProjects(projectsData);
      setSignages(signagesData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const activeProjects = projects.filter(p => p.project_status === 'active').length;
  const activeSignages = signages.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`+${projects.length - activeProjects} in pipeline`}
          icon="project"
        />
        <MetricCard
          title="Signages Deployed"
          value={activeSignages}
          subtitle={`${signages.length - activeSignages} pending`}
          icon="signage"
        />
        {/* More metrics... */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CostChart projects={projects} />
        {/* More charts... */}
      </div>

      {/* Alerts & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertsList />
        <ActivityFeed />
      </div>
    </div>
  );
}
```

### 4.2 Operations Pages

**app/operations/projects/page.tsx:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getAllDocuments } from '@/lib/firebase/firestore';
import type { Project } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getAllDocuments<Project>('projects');
      setProjects(data);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects ({projects.length})</h1>
        <Link href="/requests/new?type=project">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project Request
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={projects} />
    </div>
  );
}
```

**app/operations/projects/columns.tsx:**
```typescript
import { ColumnDef } from '@tanstack/react-table';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'project_id',
    header: 'ID',
  },
  {
    accessorKey: 'project_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'project_status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('project_status') as string;
      return <Badge variant={status === 'active' ? 'success' : 'default'}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'signage_operations.signage_ids',
    header: 'Signages',
    cell: ({ row }) => {
      const signages = row.original.signage_operations?.signage_ids || [];
      return <span>{signages.length}</span>;
    },
  },
  {
    accessorKey: 'signage_operations.go_live_date',
    header: 'Go-Live',
    cell: ({ row }) => {
      const date = row.original.signage_operations?.go_live_date;
      return date ? new Date(date).toLocaleDateString() : '-';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      );
    },
  },
];
```

---

## PHASE 5: REQUEST FORMS (Week 6-8)

### 5.1 Form Components with React Hook Form

**components/forms/ProjectRequestForm.tsx:**
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { addDocument } from '@/lib/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

const projectRequestSchema = z.object({
  project_name: z.string().min(1, 'Project name is required'),
  project_type: z.enum(['condominium', 'apartment', 'office', 'mixed-use']),
  project_address: z.string().min(1, 'Address is required'),
  total_units: z.number().min(1),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_phone: z.string().min(1, 'Phone is required'),
  contact_email: z.string().email('Valid email required'),
  num_signages: z.number().min(1).max(20),
  budget: z.number().min(0),
  go_live_date: z.string(),
  notes: z.string().optional(),
});

type ProjectRequestFormData = z.infer<typeof projectRequestSchema>;

export default function ProjectRequestForm() {
  const { user } = useAuth();
  const form = useForm<ProjectRequestFormData>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: {
      project_type: 'condominium',
      num_signages: 1,
    },
  });

  const onSubmit = async (data: ProjectRequestFormData) => {
    try {
      const requestId = await addDocument('requests', {
        request_type: 'project_request',
        status: 'submitted',
        priority: 'normal',
        submitted_by: user!.email,
        submitted_date: new Date().toISOString(),
        request_data: data,
        attachments: [],
        comments: [],
      }, user!.uid);

      toast.success('Project request submitted successfully!');
      // Redirect to request detail page
    } catch (error) {
      toast.error('Failed to submit request');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name *</FormLabel>
              <FormControl>
                <Input placeholder="The Sukhumvit Residence" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <option value="condominium">Condominium</option>
                <option value="apartment">Apartment</option>
                <option value="office">Office Building</option>
                <option value="mixed-use">Mixed-use</option>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* More fields... */}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

### 5.2 Multi-step Form (Payment Request with Asset Recording)

Implement similar pattern with useState to track current step, validation per step, and progress indicator.

---

## PHASE 6: APPROVAL WORKFLOW (Week 9)

### 6.1 Approval Queue Page

**app/approvals/page.tsx:**
```typescript
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import type { Request } from '@/lib/types';
import ApprovalCard from '@/components/approvals/ApprovalCard';

export default function ApprovalsPage() {
  const { user } = useAuth();
  const [pendingApprovals, setPendingApprovals] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingApprovals() {
      // Query requests where current user is the next approver
      // This logic depends on your approval chain implementation

      const q = query(
        collection(db, 'requests'),
        where('status', '==', 'pending_approval'),
        // Add condition for current approver
      );

      const snapshot = await getDocs(q);
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Request[];

      setPendingApprovals(requests);
      setLoading(false);
    }

    fetchPendingApprovals();
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Pending Your Approval ({pendingApprovals.length})
      </h1>

      {pendingApprovals.map(request => (
        <ApprovalCard
          key={request.request_id}
          request={request}
          onApprove={() => handleApprove(request.request_id)}
          onReject={() => handleReject(request.request_id)}
        />
      ))}
    </div>
  );
}
```

### 6.2 Approval Actions

**lib/workflows/approval.ts:**
```typescript
import { updateDocument } from '@/lib/firebase/firestore';
import { sendEmail } from './notifications';

export async function approveRequest(
  requestId: string,
  approverId: string,
  comments: string
): Promise<void> {
  // Update request with approval
  await updateDocument('requests', requestId, {
    status: 'approved',
    approved_by: approverId,
    approved_date: new Date().toISOString(),
    approval_comments: comments,
  }, approverId);

  // Send notification email
  await sendEmail({
    to: 'requester@company.com',
    subject: 'Request Approved',
    body: `Your request ${requestId} has been approved.`,
  });

  // Trigger next workflow step
  // ...
}

export async function rejectRequest(
  requestId: string,
  approverId: string,
  reason: string
): Promise<void> {
  await updateDocument('requests', requestId, {
    status: 'rejected',
    rejected_by: approverId,
    rejected_date: new Date().toISOString(),
    rejection_reason: reason,
  }, approverId);

  // Send notification
  // ...
}
```

---

## PHASE 7: NOTIFICATIONS & INTEGRATIONS (Week 10)

### 7.1 Email Notifications (Firebase Functions)

**functions/src/index.ts:**
```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});

// Trigger on request submission
export const onRequestSubmitted = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async (snap, context) => {
    const request = snap.data();

    if (request.status === 'submitted') {
      // Send email to approver
      await transporter.sendMail({
        from: 'noreply@signageops.com',
        to: 'manager@company.com',
        subject: `New ${request.request_type} requires approval`,
        html: `
          <h2>New Request Submitted</h2>
          <p>Request ID: ${context.params.requestId}</p>
          <p>Type: ${request.request_type}</p>
          <p>Submitted by: ${request.submitted_by}</p>
          <a href="https://yourapp.com/requests/${context.params.requestId}">View Request</a>
        `,
      });
    }
  });

// Trigger on approval
export const onRequestApproved = functions.firestore
  .document('requests/{requestId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== 'approved' && after.status === 'approved') {
      // Send email to requester
      await transporter.sendMail({
        from: 'noreply@signageops.com',
        to: after.submitted_by,
        subject: 'Request Approved',
        html: `
          <h2>Your Request Has Been Approved</h2>
          <p>Request ID: ${context.params.requestId}</p>
          <p>Approved by: ${after.approved_by}</p>
          <a href="https://yourapp.com/requests/${context.params.requestId}">View Request</a>
        `,
      });
    }
  });

// Deploy: firebase deploy --only functions
```

### 7.2 PDF Generation

**lib/utils/pdf-generator.ts:**
```typescript
import jsPDF from 'jspdf';
import type { Request } from '../types';

export function generateQuotationPDF(request: Request): Blob {
  const doc = new jsPDF();

  // Company header
  doc.setFontSize(20);
  doc.text('QUOTATION', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Quotation No: ${request.request_data.quotation_number}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

  // Client info
  doc.text('TO:', 20, 70);
  doc.text(request.request_data.client_name, 20, 80);
  doc.text(request.request_data.client_address, 20, 90);

  // Items table
  let y = 110;
  doc.text('Item', 20, y);
  doc.text('Qty', 100, y);
  doc.text('Price', 140, y);
  doc.text('Total', 170, y);

  y += 10;
  request.request_data.items.forEach((item: any) => {
    doc.text(item.description, 20, y);
    doc.text(item.quantity.toString(), 100, y);
    doc.text(item.unit_price.toLocaleString(), 140, y);
    doc.text(item.total_price.toLocaleString(), 170, y);
    y += 10;
  });

  // Total
  y += 20;
  doc.text(`Total: ${request.request_data.total} THB`, 140, y);

  return doc.output('blob');
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## PHASE 8: TESTING & QA (Week 11)

### 8.1 Test Data Setup

**scripts/seed-test-data.ts:**
```typescript
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase/config';

async function seedTestData() {
  // Create test users
  const users = [
    { email: 'sales@test.com', role: 'sales', displayName: 'Sales User' },
    { email: 'ops@test.com', role: 'operations', displayName: 'Ops User' },
    { email: 'finance@test.com', role: 'finance', displayName: 'Finance User' },
    { email: 'manager@test.com', role: 'manager', displayName: 'Manager' },
  ];

  for (const user of users) {
    await addDoc(collection(db, 'users'), user);
  }

  // Create test projects
  const projects = [
    {
      project_id: 'prj001',
      project_name: 'Test Project 1',
      project_status: 'active',
      // ... more fields
    },
  ];

  for (const project of projects) {
    await addDoc(collection(db, 'projects'), project);
  }

  console.log('Test data seeded successfully');
}

seedTestData();
```

### 8.2 E2E Testing (Optional - Playwright)

```bash
npm install -D @playwright/test
npx playwright install
```

**tests/request-flow.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';

test('complete project request flow', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000/login');
  await page.fill('[name="email"]', 'sales@test.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // Create project request
  await page.goto('http://localhost:3000/requests/new');
  await page.click('text=Project Request');

  await page.fill('[name="project_name"]', 'Test Project');
  // ... fill other fields

  await page.click('text=Submit Request');

  // Verify success
  await expect(page.locator('text=Request submitted successfully')).toBeVisible();
});
```

---

## PHASE 9: DEPLOYMENT (Week 12)

### 9.1 Production Build

```bash
# Environment variables
cp .env.local .env.production

# Build
npm run build

# Test production build locally
npm run start
```

### 9.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### 9.3 Firebase Deployment

```bash
# Build Next.js
npm run build

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firebase Functions
firebase deploy --only functions

# Deploy Storage rules
firebase deploy --only storage

# Or deploy all
firebase deploy
```

### 9.4 Post-Deployment Checklist

```
[ ] All environment variables set in production
[ ] Firebase security rules deployed
[ ] Test authentication flow
[ ] Test all request types (create, approve, reject)
[ ] Test file uploads
[ ] Test PDF generation
[ ] Test email notifications
[ ] Verify mobile responsiveness
[ ] Check browser compatibility
[ ] Set up error monitoring (Sentry)
[ ] Set up analytics (Google Analytics)
[ ] Create backup strategy
[ ] Document admin procedures
[ ] Train team members
```

---

## PHASE 10: POST-LAUNCH (Ongoing)

### 10.1 Monitoring & Maintenance

```bash
# Monitor Firebase usage
firebase console

# Monitor application errors
# Set up Sentry or similar

# Monitor performance
# Lighthouse CI

# Database backups
# Firebase automatic backups enabled

# Update dependencies monthly
npm update
npm audit fix
```

### 10.2 Feature Additions

**Priority enhancements:**
1. Advanced search (Algolia integration)
2. Real-time collaboration (multiple users editing)
3. Mobile app (React Native)
4. Reporting improvements
5. Integration with accounting software
6. Client portal (for juristic offices)
7. Automated reminders (contract expiry, maintenance due)
8. Dashboard customization
9. Export/import functionality
10. API for third-party integrations

### 10.3 Training Materials

Create documentation:
- User manual (PDF)
- Video tutorials for each workflow
- Quick reference guides
- FAQ document
- Admin guide
- Troubleshooting guide

---

## ESTIMATED TIMELINE

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1. Project Setup | 1 week | Dev environment ready |
| 2. Data Models & Firebase | 1 week | Database structure complete |
| 3. Auth & Layout | 1 week | Login + basic navigation |
| 4. Dashboard & Operations | 2 weeks | View/list functionality |
| 5. Request Forms | 3 weeks | All 5 form types |
| 6. Approval Workflow | 1 week | Approval system working |
| 7. Notifications & PDF | 1 week | Email + PDF generation |
| 8. Testing & QA | 1 week | Bug fixes, polish |
| 9. Deployment | 1 week | Live production system |
| 10. Training & Handover | 1 week | Team trained |
| **TOTAL** | **12 weeks** | **Fully operational system** |

---

## COST ESTIMATION

### Development Costs (If hiring):
- Full-stack developer: $5,000 - $10,000/month × 3 months = **$15,000 - $30,000**
- UI/UX designer: $3,000 - $5,000 (one-time) = **$3,000 - $5,000**

### Infrastructure Costs (Monthly):
- Firebase Blaze Plan: ~$50-200/month (usage-based)
- Vercel Pro (optional): $20/month
- Domain + Email: $15/month
- **Total: ~$100-250/month**

### Alternative: DIY Implementation
- **Cost: Time only** (12 weeks if full-time, 24 weeks if part-time)
- Follow this guide step-by-step
- Use ChatGPT/Claude for code assistance

---

## SUPPORT & RESOURCES

### Official Documentation:
- Next.js: https://nextjs.org/docs
- Firebase: https://firebase.google.com/docs
- TailwindCSS: https://tailwindcss.com/docs
- React Hook Form: https://react-hook-form.com
- TanStack Table: https://tanstack.com/table

### Learning Resources:
- Next.js 14 App Router course (free): https://nextjs.org/learn
- Firebase Firestore course: YouTube tutorials
- React Hook Form tutorial: Official docs

### Community Support:
- Next.js Discord
- Firebase Discord
- Stack Overflow
- GitHub Issues

---

## NEXT STEPS

1. **Review all documentation files:**
   - DATA-MODELS.md
   - REQUEST-FORMS.md
   - WORKFLOWS.md
   - WEB-APP-DESIGN.md
   - IMPLEMENTATION-GUIDE.md (this file)

2. **Make decisions:**
   - DIY or hire developer?
   - Timeline requirements?
   - Budget availability?
   - Team availability for training?

3. **Start Phase 1:**
   - Set up development environment
   - Create Firebase project
   - Initialize Next.js app
   - Install dependencies

4. **Iterate:**
   - Build MVP with core features first
   - Test with real users
   - Gather feedback
   - Add enhancements

---

**You now have a complete blueprint to build your digital signage operations system!**

Good luck with your implementation! 🚀

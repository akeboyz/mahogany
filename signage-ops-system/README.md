# Digital Signage Operations Management System

## 📋 Overview

Complete internal operations management system for digital signage business serving condominium projects. Manages the entire lifecycle from initial opportunity to live deployment and ongoing operations.

**Business Model:** Deploy digital signage in condo buildings for property marketing, facility bookings, and juristic announcements. Revenue from rental fees paid by juristic offices.

---

## 🎯 Key Features

### 1. Management Dashboard
- Real-time metrics (projects, signages, revenue)
- Cost analytics and investment tracking
- Alerts and notifications
- Activity feed
- Performance monitoring

### 2. Operations Summary
- Complete inventory management
- Projects, signages, devices, networks
- Installation history
- Maintenance tracking
- Vendor management

### 3. Request Workflows
Five request types covering the complete business process:

**a. Project Request**
- Capture new business opportunities
- Initial project information
- Feasibility assessment

**b. Quotation Request**
- Detailed cost proposals
- Equipment and service costs
- Payment schedules
- Terms and conditions

**c. Contract Request**
- Formal agreements
- Legal terms
- Signature management
- Contract tracking

**d. Installation Request**
- Schedule installations
- Vendor coordination
- Site logistics
- Acceptance process

**e. Payment Request**
- Approve payments
- Record assets (signages & devices)
- Cost tracking
- Budget management

### 4. Approval System
- Role-based approval chains
- Multi-level approvals based on amount
- Email notifications
- Commenting and feedback

### 5. Comprehensive Tracking
- Full audit trail (created_by, updated_by, dates)
- Cost accumulation per project
- Asset lifecycle management
- Workflow status tracking

---

## 📁 Documentation Files

This repository contains complete system design documentation:

| File | Description |
|------|-------------|
| **DATA-MODELS.md** | Complete JSON schema for all entities (projects, signages, devices, networks, installations, requests, vendors) |
| **REQUEST-FORMS.md** | Detailed form designs with all fields, validation rules, and UI specs for 5 request types |
| **WORKFLOWS.md** | End-to-end workflow diagrams, status transitions, and automated actions |
| **WEB-APP-DESIGN.md** | UI/UX design, page layouts, component library, responsive design |
| **IMPLEMENTATION-GUIDE.md** | Step-by-step development guide, code examples, timeline (12 weeks) |

---

## 🏗️ System Architecture

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend:** Firebase (Firestore, Storage, Functions, Auth)
- **Forms:** React Hook Form + Zod validation
- **Tables:** TanStack Table
- **Charts:** Recharts
- **PDF:** jsPDF
- **Notifications:** react-hot-toast, Email (NodeMailer)

### Data Structure
```
Firebase Firestore Collections:
├── projects          # Condo project master data
├── signages          # Digital signage inventory
├── devices           # Supporting devices (Raspberry Pi, WiFi)
├── networks          # Network connections (SIM cards)
├── installations     # Installation records
├── maintenance       # Maintenance history
├── vendors           # Vendor master data
├── requests          # All request types
└── users             # User accounts and roles
```

### User Roles
- **Sales:** Create project/quotation/contract requests
- **Operations:** Create installation/maintenance requests
- **Finance:** Create payment requests, financial approvals
- **Manager:** Approve requests, oversight
- **Admin:** System administration

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- Git

### Installation

```bash
# Clone repository (if using git)
git clone <repository-url>
cd signage-ops-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run development server
npm run dev

# Open http://localhost:3000
```

### Firebase Setup

1. Create Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Firebase Authentication (Email/Password)
5. Create Firebase Functions
6. Copy config to `.env.local`
7. Deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## 📊 Data Models Summary

### Enhanced Project Schema
```json
{
  "project_id": "prj001",
  "project_name": "The Sukhumvit Residence",
  "signage_operations": {
    "signage_ids": ["sg001", "sg002", "sg003"],
    "device_ids": ["dev001", "dev002", "dev003"],
    "costs": {
      "total_investment": 174376.00,
      "signage_cost": 75000.00,
      "device_cost": 25000.00
    },
    "deployment_status": "active"
  },
  "created_by": "user@company.com",
  "created_date": "2024-01-15T10:30:00Z"
}
```

### Asset Recording (Signages & Devices)
When payment requests are processed, assets are automatically created:
- Signage records with serial numbers, specs, warranty
- Device records with MAC addresses, configurations
- Linked to projects for complete tracking

---

## 🔄 Complete Workflow

```
1. Project Request
   ↓ (Manager approves)

2. Quotation Request
   ↓ (Client accepts)

3. Contract Request
   ↓ (Both parties sign)

4. Payment Request + Installation Request (parallel)
   ↓ (Equipment purchased, installed)

5. Project Goes LIVE
   ↓

6. Ongoing Operations
   - Monthly rental payments
   - Network renewals
   - Maintenance as needed
```

---

## 🎨 UI Design Highlights

### Dashboard
- Key metrics cards (projects, signages, revenue)
- Investment breakdown charts
- Alerts for expiring networks/warranties
- Recent activity feed
- Pending approvals widget

### Operations Summary
- Tabbed interface (Projects | Signages | Devices | ...)
- Searchable, sortable tables
- Filters and bulk actions
- Export to CSV
- Detail slide-outs

### Request Forms
- Multi-step wizard for complex forms
- Real-time validation
- Auto-save drafts
- Progress indicators
- Asset recording modals
- PDF generation

### Mobile Responsive
- Collapsible sidebar
- Stacked cards on mobile
- Touch-friendly controls
- Optimized for tablets (field use)

---

## 📈 Implementation Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup & Firebase | 1 week | Dev environment |
| Auth & Layout | 1 week | Login + navigation |
| Dashboard & Ops | 2 weeks | Viewing data |
| Request Forms | 3 weeks | All 5 forms |
| Approvals | 1 week | Workflow system |
| Notifications | 1 week | Email + PDF |
| Testing | 1 week | QA & fixes |
| Deployment | 1 week | Production live |
| **TOTAL** | **12 weeks** | **Complete system** |

---

## 💰 Cost Estimation

### DIY (Your Team)
- **Cost:** Time investment only
- **Duration:** 12 weeks full-time
- **Infrastructure:** ~$100-250/month (Firebase + hosting)

### Hire Developer
- **Development:** $15,000 - $30,000
- **Design:** $3,000 - $5,000
- **Infrastructure:** ~$100-250/month
- **Total:** $18,000 - $35,000 + monthly costs

---

## 🔐 Security

- Firebase Authentication
- Role-based access control (RBAC)
- Firestore security rules
- Audit trail for all changes
- Secure file storage
- HTTPS only

---

## 📱 Key Screens

1. **Dashboard** - Overview metrics and alerts
2. **Projects List** - All projects with status
3. **Project Detail** - Complete project information
4. **Signage Inventory** - All signages with filters
5. **Request Form** - Create new requests
6. **Request Detail** - View/edit with timeline
7. **Approvals Queue** - Pending approvals
8. **Reports** - Analytics and charts

---

## 🧪 Testing

```bash
# Run tests
npm test

# E2E tests (Playwright)
npx playwright test

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Environment Variables (Production)
- Set all `NEXT_PUBLIC_FIREBASE_*` variables
- Configure email credentials
- Set up backup strategy

---

## 📚 Learning Resources

### Next.js
- Official Docs: https://nextjs.org/docs
- Learn Course: https://nextjs.org/learn

### Firebase
- Firestore Guide: https://firebase.google.com/docs/firestore
- Security Rules: https://firebase.google.com/docs/rules

### React Hook Form
- Official Docs: https://react-hook-form.com

---

## 🎯 Recommended Development Approach

### Phase 1: MVP (4 weeks)
**Goal:** Basic functionality to test with real users

**Features:**
- Login/authentication
- Dashboard with basic metrics
- Project list and detail view
- Project Request form (simplified)
- Basic approval workflow

**Why:** Validate the concept before building everything

### Phase 2: Core Workflows (4 weeks)
**Goal:** Complete request-to-deployment workflow

**Add:**
- Quotation Request form
- Contract Request form
- Payment Request with asset recording
- Installation Request
- Email notifications

### Phase 3: Polish & Scale (4 weeks)
**Goal:** Production-ready system

**Add:**
- Reports and analytics
- Advanced search
- PDF generation
- Mobile optimization
- Performance tuning
- Documentation

---

## 🤝 Contributing

If building as a team:

1. Create feature branches
2. Use pull requests
3. Code review required
4. Write tests
5. Update documentation

---

## 📞 Support

### For Implementation Questions:
- Review IMPLEMENTATION-GUIDE.md
- Check Firebase documentation
- Use ChatGPT/Claude for code help
- Stack Overflow

### For Business Questions:
- Review WORKFLOWS.md for process flows
- Check REQUEST-FORMS.md for required fields

---

## 🎉 Success Criteria

System is successful when:

1. ✅ All 5 request types work end-to-end
2. ✅ Approvals route correctly based on user roles
3. ✅ Assets are recorded accurately from payment requests
4. ✅ Project costs update automatically
5. ✅ Email notifications sent at key milestones
6. ✅ Reports show accurate financial data
7. ✅ Team can operate without manual spreadsheets
8. ✅ Full audit trail for compliance
9. ✅ Mobile-friendly for field use
10. ✅ Fast performance (<2s page loads)

---

## 🔮 Future Enhancements

**Phase 4+ (Post-Launch):**
- [ ] Advanced analytics dashboard
- [ ] Client portal (for juristic offices)
- [ ] Mobile app (React Native)
- [ ] Integration with accounting software
- [ ] Automated maintenance scheduling
- [ ] IoT monitoring (signage uptime)
- [ ] Content management system
- [ ] Multi-language support (Thai/English)
- [ ] Export to Excel/PDF reports
- [ ] API for third-party integrations

---

## 📄 License

Internal use only - Proprietary system for your digital signage business.

---

## 👥 Team

Designed for internal operations team:
- Sales team
- Operations team
- Finance team
- Management

---

**Built with ❤️ for efficient digital signage operations management**

---

## 🚦 Next Steps

1. **Review all documentation** (5 MD files)
2. **Make go/no-go decision** (DIY vs hire)
3. **Set up Firebase project** (1 day)
4. **Start Phase 1** (MVP development)
5. **Test with pilot project** (real condo)
6. **Iterate based on feedback**
7. **Roll out to full team**

**Ready to transform your operations? Let's build it! 🚀**

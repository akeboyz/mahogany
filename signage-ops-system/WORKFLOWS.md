# Workflow Diagrams - Digital Signage Operations System

## Overview
This document outlines the complete workflows from initial opportunity to live deployment, including approval chains, status transitions, and automated actions.

---

## MASTER WORKFLOW: End-to-End Process

```
START: New Business Opportunity
│
├─> 1. PROJECT REQUEST WORKFLOW
│   │
│   ├─> Create Project Request Form
│   │   - Sales/BD inputs opportunity details
│   │   - Status: Draft
│   │
│   ├─> Submit for Review
│   │   - Status: Submitted
│   │   - Email → Manager
│   │
│   ├─> Manager Review
│   │   ├─> Approve → Status: Approved
│   │   │   - Project record created in project.json (status: planning)
│   │   │   - Email → Sales team
│   │   │   - Enable Quotation Request creation
│   │   │
│   │   ├─> Request More Info → Status: Info Requested
│   │   │   - Email → Requester with comments
│   │   │   - Requester updates and resubmits
│   │   │
│   │   └─> Reject → Status: Rejected
│   │       - Email → Requester with reason
│   │       - Request archived
│   │
│   └─> APPROVED: Proceed to Quotation
│
├─> 2. QUOTATION REQUEST WORKFLOW
│   │
│   ├─> Create Quotation Form
│   │   - Pre-filled from Project Request
│   │   - Sales inputs costs and terms
│   │   - Status: Draft
│   │
│   ├─> Generate Quotation PDF
│   │   - Review and adjust
│   │
│   ├─> Submit for Internal Approval
│   │   - Status: Submitted
│   │   - Email → Finance Manager
│   │
│   ├─> Finance Manager Review
│   │   ├─> Approve → Status: Approved
│   │   │   - Email → Sales Manager
│   │   │
│   │   ├─> Request Changes → Status: Revision Needed
│   │   │   - Email → Requester with comments
│   │   │   - Requester revises and resubmits
│   │   │
│   │   └─> Reject → Status: Rejected
│   │       - End workflow
│   │
│   ├─> Sales Manager Final Review
│   │   - Status: Final Approval
│   │   - Ready to send to client
│   │
│   ├─> Send to Client (Juristic)
│   │   - Status: Sent to Client
│   │   - Email with quotation PDF → Juristic Manager
│   │   - Follow-up reminders (auto: +3 days, +7 days, +14 days)
│   │
│   ├─> Client Response
│   │   ├─> Accepted → Status: Accepted by Client
│   │   │   - Email → Sales team
│   │   │   - Project status → "Quotation Accepted"
│   │   │   - Enable Contract Request creation
│   │   │
│   │   ├─> Negotiation → Status: In Negotiation
│   │   │   - Create revised quotation
│   │   │   - Repeat approval cycle
│   │   │
│   │   └─> Rejected → Status: Rejected by Client
│   │       - Project status → "Lost"
│   │       - Request reason and archive
│   │
│   └─> ACCEPTED: Proceed to Contract
│
├─> 3. CONTRACT REQUEST WORKFLOW
│   │
│   ├─> Create Contract Form
│   │   - Pre-filled from Quotation
│   │   - Legal/Sales inputs contract terms
│   │   - Status: Draft
│   │
│   ├─> Generate Contract PDF
│   │   - Review contract document
│   │
│   ├─> Submit for Internal Approval
│   │   - Status: Submitted
│   │   - Email → Legal (if exists)
│   │
│   ├─> Legal Review (optional)
│   │   ├─> Approve → Status: Legal Approved
│   │   │   - Email → Director
│   │   │
│   │   └─> Request Changes → Status: Legal Review
│   │       - Email → Requester
│   │       - Revise and resubmit
│   │
│   ├─> Director Approval
│   │   ├─> Approve → Status: Internal Approved
│   │   │   - Ready to send to client
│   │   │
│   │   └─> Reject → Status: Rejected
│   │       - Back to quotation stage
│   │
│   ├─> Send to Client for Signature
│   │   - Status: Sent to Client
│   │   - Email with contract PDF → Juristic Manager
│   │   - Include signing instructions
│   │
│   ├─> Provider Signs First (Alternative Flow)
│   │   - Director signs contract
│   │   - Status: Provider Signed
│   │   - Send to client for signature
│   │
│   ├─> Client Signature Process
│   │   - Client reviews contract
│   │   - Juristic committee approval (if required)
│   │   - Status: Pending Client Signature
│   │
│   ├─> Client Signs Contract
│   │   - Client uploads signed contract
│   │   - Status: Client Signed
│   │   - Email → Sales team
│   │
│   ├─> Both Parties Signed
│   │   - Status: Fully Executed
│   │   - Contract start date recorded
│   │   - Project status → "Contracted"
│   │   - Email → All stakeholders
│   │   - Enable Installation Request and Payment Request creation
│   │
│   └─> EXECUTED: Proceed to Implementation
│
├─> 4A. PAYMENT REQUEST WORKFLOW (Equipment)
│   │   (Runs in parallel with Installation Request)
│   │
│   ├─> Create Payment Request (Equipment)
│   │   - Procurement team inputs purchase details
│   │   - Add items from quotation
│   │   - Status: Draft
│   │
│   ├─> Record Asset Details
│   │   - For each signage: Enter serial numbers, specs
│   │   - For each device: Enter serial numbers, MAC address
│   │   - Create signage.json entries (status: in_stock)
│   │   - Create device.json entries (status: in_stock)
│   │
│   ├─> Attach Invoice & Documents
│   │   - Upload vendor invoice
│   │   - Upload tax invoice
│   │   - Upload delivery documents
│   │
│   ├─> Submit for Approval
│   │   - Status: Pending Approval
│   │   - Email → Project Manager
│   │
│   ├─> Approval Chain (Based on Amount)
│   │   │
│   │   ├─> < 50,000 THB:
│   │   │   1. Project Manager → Approve
│   │   │   2. Finance Manager → Approve
│   │   │   └─> Status: Approved
│   │   │
│   │   ├─> 50,000 - 200,000 THB:
│   │   │   1. Project Manager → Approve
│   │   │   2. Finance Manager → Approve
│   │   │   3. Operations Director → Approve
│   │   │   └─> Status: Approved
│   │   │
│   │   └─> > 200,000 THB:
│   │       1. Project Manager → Approve
│   │       2. Finance Manager → Approve
│   │       3. Operations Director → Approve
│   │       4. Managing Director → Approve
│   │       └─> Status: Approved
│   │
│   ├─> Any Approver Actions:
│   │   ├─> Approve → Next approver
│   │   ├─> Request Changes → Back to requester
│   │   └─> Reject → Status: Rejected, workflow ends
│   │
│   ├─> All Approved
│   │   - Status: Approved (Ready for Payment)
│   │   - Email → Finance team
│   │
│   ├─> Finance Processes Payment
│   │   - Schedule payment date
│   │   - Status: Payment Scheduled
│   │   - Execute bank transfer
│   │   - Upload payment slip
│   │   - Status: Paid
│   │   - Email → Requester
│   │
│   ├─> Update Records
│   │   - Signage/Device status → "Ready for installation"
│   │   - Project costs updated in project.json
│   │   - Project asset IDs added
│   │
│   ├─> Vendor Confirmation
│   │   - Vendor confirms payment received
│   │   - Vendor provides receipt
│   │   - Upload receipt
│   │   - Status: Completed
│   │
│   └─> COMPLETED: Equipment acquired
│
├─> 4B. INSTALLATION REQUEST WORKFLOW
│   │   (Runs in parallel with Payment Requests)
│   │
│   ├─> Create Installation Request
│   │   - Operations team inputs installation details
│   │   - Select signages to install
│   │   - Status: Draft
│   │
│   ├─> Select Vendor
│   │   - Choose installation vendor
│   │   - Get vendor quote
│   │   - Upload quote
│   │
│   ├─> Coordinate with Building
│   │   - Contact juristic manager
│   │   - Reserve elevator
│   │   - Arrange parking
│   │   - Get access cards
│   │   - Notify residents
│   │
│   ├─> Submit for Approval
│   │   - Status: Pending Approval
│   │   - Email → Operations Manager
│   │
│   ├─> Operations Manager Review
│   │   ├─> Approve → Status: Approved
│   │   │   - Email → Installation vendor
│   │   │
│   │   └─> Request Changes → Status: Revision Needed
│   │       - Email → Requester
│   │
│   ├─> Schedule Installation
│   │   - Confirm date/time with vendor
│   │   - Confirm with juristic manager
│   │   - Status: Scheduled
│   │   - Email → All parties (vendor, juristic, internal team)
│   │   - Calendar invites sent
│   │   - Reminder emails (auto: -1 day, -2 hours)
│   │
│   ├─> Installation Day
│   │   - Status: In Progress
│   │   - Vendor arrives on site
│   │   - Real-time updates (optional)
│   │   - Upload progress photos
│   │
│   ├─> Installation Completion
│   │   - Vendor completes work
│   │   - Run acceptance tests
│   │   - Fill completion checklist
│   │   - Upload after photos
│   │   - Status: Completed (Pending Acceptance)
│   │
│   ├─> Juristic Manager Inspection
│   │   ├─> Accept → Status: Accepted
│   │   │   - Sign acceptance form
│   │   │   - Upload signed form
│   │   │   - Email → All parties
│   │   │
│   │   └─> Request Corrections → Status: Corrections Needed
│   │       - List issues
│   │       - Vendor returns to fix
│   │       - Repeat inspection
│   │
│   ├─> Update Records
│   │   - Create installation.json entry
│   │   - Update signage.json:
│   │     - Status → "Active"
│   │     - Go-live date recorded
│   │     - Installation ID linked
│   │     - Location details updated
│   │   - Update project.json:
│   │     - Deployment status → "Active"
│   │     - Go-live date recorded
│   │     - Installation cost added
│   │
│   └─> COMPLETED: Signage installed and live
│
├─> 5. POST-DEPLOYMENT
│   │
│   ├─> Training
│   │   - Schedule training session
│   │   - Train juristic staff on:
│   │     - Basic operation
│   │     - Content updates
│   │     - Troubleshooting
│   │   - Provide training materials
│   │
│   ├─> Go-Live Verification
│   │   - Check all signages online
│   │   - Verify content displaying
│   │   - Test remote access
│   │   - Status: Live ✓
│   │
│   ├─> Project Handover
│   │   - Provide documentation:
│   │     - Equipment manuals
│   │     - Contact list
│   │     - Troubleshooting guide
│   │     - Warranty cards
│   │   - Handover meeting
│   │   - Handover sign-off
│   │
│   └─> Ongoing Operations
│       ├─> Monthly Rental Payment
│       │   - Auto-generate payment request
│       │   - Process payment
│       │
│       ├─> Network Payment
│       │   - Track network expiry
│       │   - Alert before expiry (-30 days)
│       │   - Renew network service
│       │
│       ├─> Maintenance (as needed)
│       │   - Issue reported
│       │   - Create maintenance request
│       │   - Assign technician
│       │   - Complete repair
│       │   - Update maintenance.json
│       │
│       └─> Performance Monitoring
│           - Track uptime
│           - Monitor content updates
│           - Quarterly review
│
END: Project Live & Operating
```

---

## WORKFLOW 1: PROJECT REQUEST (Detailed)

```
┌─────────────────────────────────────────────────┐
│         PROJECT REQUEST WORKFLOW                │
└─────────────────────────────────────────────────┘

Actor: Sales/BD Team

1. CREATE REQUEST
   │
   ├─> User clicks "New Project Request"
   ├─> Form opens with empty fields
   ├─> Status: Draft (auto-save every 30s)
   │
   └─> User fills form:
       - Project basic info
       - Contact details
       - Signage requirements
       - Budget & timeline
       - Opportunity details
       - Notes & attachments

2. SAVE DRAFT (Optional)
   │
   ├─> Click "Save Draft"
   ├─> Validation: Basic validation only
   ├─> Save to request.json
   ├─> Status: Draft
   └─> User can return later to edit

3. SUBMIT FOR REVIEW
   │
   ├─> Click "Submit for Review"
   ├─> Validation: All required fields
   │   ├─> If invalid: Show errors, block submission
   │   └─> If valid: Continue
   │
   ├─> Status: Submitted
   ├─> Email notification → Manager
   │   Subject: "New Project Request: [Project Name]"
   │   Body: Key details, link to review
   │
   └─> User sees confirmation: "Request submitted successfully"

4. MANAGER REVIEW
   │
   ├─> Manager opens request
   ├─> Reviews details
   ├─> Checks:
   │   - Is this a real opportunity?
   │   - Budget realistic?
   │   - Timeline feasible?
   │   - Worth pursuing?
   │
   └─> Manager takes action:
       │
       ├─> OPTION A: APPROVE
       │   │
       │   ├─> Click "Approve"
       │   ├─> Add approval comments (optional)
       │   ├─> Status: Approved
       │   ├─> Trigger actions:
       │   │   ├─> Create project entry in project.json
       │   │   │   - project_id: auto-generated (prj00X)
       │   │   │   - Basic info from request
       │   │   │   - signage_operations: initialized
       │   │   │   - deployment_status: "planning"
       │   │   │   - costs: initialized to 0
       │   │   │   - created_by, created_date
       │   │   │
       │   │   ├─> Email → Requester
       │   │   │   Subject: "Project Request Approved: [Project Name]"
       │   │   │   Body: "Next step: Create quotation"
       │   │   │   Link to create quotation
       │   │   │
       │   │   └─> Enable in UI:
       │   │       - "Create Quotation" button
       │   │       - Project appears in dashboard
       │   │
       │   └─> Workflow advances to QUOTATION REQUEST
       │
       ├─> OPTION B: REQUEST MORE INFO
       │   │
       │   ├─> Click "Request More Info"
       │   ├─> Enter comments: "Please provide..."
       │   ├─> Status: Info Requested
       │   ├─> Email → Requester
       │   │   Subject: "More Info Needed: [Project Name]"
       │   │   Body: Manager's comments
       │   │   Link to edit request
       │   │
       │   ├─> Requester edits request
       │   ├─> Requester resubmits
       │   ├─> Status: Resubmitted
       │   ├─> Email → Manager
       │   └─> Return to Manager Review
       │
       └─> OPTION C: REJECT
           │
           ├─> Click "Reject"
           ├─> Enter rejection reason (required)
           ├─> Status: Rejected
           ├─> Email → Requester
           │   Subject: "Project Request Rejected: [Project Name]"
           │   Body: Rejection reason
           │
           ├─> Request archived
           └─> Workflow ends

STATUS FLOW:
Draft → Submitted → [Approved | Info Requested → Resubmitted → ... | Rejected]
```

---

## WORKFLOW 2: QUOTATION REQUEST (Detailed)

```
┌─────────────────────────────────────────────────┐
│       QUOTATION REQUEST WORKFLOW                │
└─────────────────────────────────────────────────┘

Prerequisites: Project Request approved

Actor: Sales Team

1. CREATE QUOTATION
   │
   ├─> From project dashboard, click "Create Quotation"
   ├─> Or from approved project request, click "Create Quotation"
   │
   ├─> Form pre-filled:
   │   - Parent project request
   │   - Project details
   │   - Contact info
   │   - Budget estimates
   │
   ├─> Status: Draft
   │
   └─> User fills quotation:
       - Rental terms
       - Equipment costs (add items)
       - Recurring costs
       - Payment schedule
       - Terms & conditions
       - Service scope

2. CALCULATE COSTS
   │
   ├─> As user adds items:
   │   - Subtotal auto-calculated
   │   - VAT auto-calculated (7%)
   │   - Total updated real-time
   │
   ├─> Payment milestones:
   │   - Must sum to 100%
   │   - Real-time validation
   │
   └─> Monthly costs calculated

3. GENERATE PDF PREVIEW
   │
   ├─> Click "Preview Quotation"
   ├─> System generates PDF:
   │   - Company letterhead
   │   - Quotation number
   │   - Client details
   │   - Itemized costs
   │   - Terms & conditions
   │   - Signature section
   │
   ├─> User reviews PDF
   ├─> If changes needed: Edit form, regenerate
   └─> If satisfied: Continue to submit

4. SUBMIT FOR INTERNAL APPROVAL
   │
   ├─> Click "Submit for Approval"
   ├─> Validation:
   │   - All costs > 0
   │   - Payment milestones = 100%
   │   - Terms complete
   │
   ├─> Status: Submitted
   │
   └─> Email → Finance Manager
       Subject: "Quotation Approval Needed: [Project Name]"
       Body: Cost summary, link to review

5. FINANCE MANAGER REVIEW
   │
   ├─> Finance Manager opens quotation
   ├─> Reviews:
   │   - Cost accuracy
   │   - Margins acceptable
   │   - Payment terms reasonable
   │   - Budget alignment
   │
   └─> Finance Manager action:
       │
       ├─> APPROVE
       │   ├─> Click "Approve"
       │   ├─> Status: Finance Approved
       │   └─> Email → Sales Manager
       │
       ├─> REQUEST CHANGES
       │   ├─> Click "Request Changes"
       │   ├─> Enter comments
       │   ├─> Status: Revision Needed
       │   ├─> Email → Requester
       │   ├─> Requester revises
       │   └─> Resubmit → Back to Finance Review
       │
       └─> REJECT
           ├─> Click "Reject"
           ├─> Enter reason
           ├─> Status: Rejected
           └─> Workflow ends

6. SALES MANAGER FINAL REVIEW
   │
   ├─> Sales Manager opens quotation
   ├─> Reviews:
   │   - Competitive pricing
   │   - Client expectations
   │   - Market positioning
   │   - Negotiation room
   │
   └─> Sales Manager action:
       │
       ├─> APPROVE
       │   ├─> Click "Approve"
       │   ├─> Status: Final Approved
       │   ├─> Ready to send to client
       │   └─> Email → Sales team
       │
       └─> REQUEST CHANGES
           ├─> Back to Sales team for revision
           └─> Resubmit through approval chain

7. SEND TO CLIENT
   │
   ├─> Click "Send to Client"
   ├─> Final PDF generated
   ├─> Status: Sent to Client
   │
   ├─> Email → Juristic Manager
   │   Subject: "Quotation: Digital Signage for [Project Name]"
   │   Body:
   │   - Personalized message
   │   - Quotation summary
   │   - Valid until date
   │   - Contact for questions
   │   Attachment: Quotation PDF
   │
   ├─> Copy → Sales team
   │
   └─> Set follow-up reminders:
       - Day 3: Gentle follow-up
       - Day 7: Check-in call
       - Day 14: Urgent follow-up
       - Day 25: Final reminder (5 days before expiry)

8. CLIENT DELIBERATION PERIOD
   │
   ├─> Client receives quotation
   ├─> Client reviews internally
   ├─> May have questions:
   │   - Sales team answers
   │   - May need to revise quotation
   │
   └─> Sales team tracks:
       - Follow-up calls
       - Client feedback
       - Competitor activity
       - Decision timeline

9. CLIENT DECISION
   │
   └─> Client responds:
       │
       ├─> OPTION A: ACCEPT
       │   │
       │   ├─> Sales team marks: "Accepted by Client"
       │   ├─> Status: Accepted by Client
       │   ├─> Record acceptance:
       │   │   - Acceptance date
       │   │   - Accepted by (name)
       │   │   - Upload acceptance email/document
       │   │
       │   ├─> Update project.json:
       │   │   - deployment_status: "quotation_accepted"
       │   │   - Store quotation values
       │   │
       │   ├─> Email → All stakeholders
       │   │   Subject: "Quotation Accepted: [Project Name]"
       │   │   Body: "Next step: Prepare contract"
       │   │
       │   ├─> Enable "Create Contract" button
       │   └─> Workflow advances to CONTRACT REQUEST
       │
       ├─> OPTION B: NEGOTIATE
       │   │
       │   ├─> Client requests changes:
       │   │   - Lower price
       │   │   - Different terms
       │   │   - Add/remove items
       │   │
       │   ├─> Status: In Negotiation
       │   ├─> Create revised quotation:
       │   │   - Version 2, 3, etc.
       │   │   - Track changes
       │   │
       │   └─> Repeat approval and sending process
       │
       └─> OPTION C: REJECT
           │
           ├─> Sales team marks: "Rejected by Client"
           ├─> Status: Rejected by Client
           ├─> Record:
           │   - Rejection reason
           │   - Competitor chosen (if known)
           │   - Lessons learned
           │
           ├─> Update project.json:
           │   - deployment_status: "lost"
           │   - Record reason
           │
           ├─> Archive request
           └─> Workflow ends

STATUS FLOW:
Draft → Submitted → Finance Approved → Final Approved → Sent to Client
→ [Accepted | In Negotiation → ... | Rejected]
```

---

## WORKFLOW 3: CONTRACT REQUEST (Detailed)

```
┌─────────────────────────────────────────────────┐
│        CONTRACT REQUEST WORKFLOW                │
└─────────────────────────────────────────────────┘

Prerequisites: Quotation accepted by client

Actor: Sales/Legal Team

1. CREATE CONTRACT
   │
   ├─> From quotation, click "Create Contract"
   │
   ├─> Form pre-filled:
   │   - All quotation terms
   │   - Project details
   │   - Client info
   │   - Costs and payment terms
   │
   ├─> Status: Draft
   │
   └─> User adds:
       - Contract start/end dates
       - Legal terms
       - Responsibilities
       - Content policy
       - Insurance & liability
       - Special conditions

2. GENERATE CONTRACT DOCUMENT
   │
   ├─> Click "Generate Contract PDF"
   ├─> Select options:
   │   - Language (Thai/English/Bilingual)
   │   - Template style
   │
   ├─> System generates:
   │   - Main contract
   │   - Appendix A: Locations
   │   - Appendix B: Equipment specs
   │   - Appendix C: Payment schedule
   │
   ├─> User reviews document
   └─> Make adjustments as needed

3. SUBMIT FOR INTERNAL APPROVAL
   │
   ├─> Click "Submit for Approval"
   ├─> Status: Submitted
   │
   └─> Routing (if Legal dept exists):
       ├─> Email → Legal team
       └─> If no Legal: Email → Director

4. LEGAL REVIEW (Optional)
   │
   ├─> Legal team reviews:
   │   - Contract terms compliant
   │   - Liability acceptable
   │   - Dispute resolution clear
   │   - Risk mitigation adequate
   │
   └─> Legal action:
       │
       ├─> APPROVE
       │   ├─> Status: Legal Approved
       │   └─> Email → Director
       │
       └─> REQUEST CHANGES
           ├─> Status: Legal Review
           ├─> Comments sent to Sales/Legal
           ├─> Revise contract
           └─> Resubmit

5. DIRECTOR APPROVAL
   │
   ├─> Director reviews:
   │   - Business terms acceptable
   │   - Profitability adequate
   │   - Risk acceptable
   │   - Strategic alignment
   │
   └─> Director action:
       │
       ├─> APPROVE
       │   ├─> Status: Internal Approved
       │   ├─> Ready to send to client
       │   └─> Email → Sales team
       │
       └─> REJECT
           ├─> Status: Rejected
           ├─> Back to negotiation
           └─> May need to revise quotation

6. SIGNING PROCESS

   TWO OPTIONS:

   ┌─────────────────────────────────────┐
   │ OPTION A: Provider Signs First      │
   └─────────────────────────────────────┘
   │
   ├─> Provider Signature
   │   ├─> Director signs contract
   │   ├─> Upload signed document
   │   ├─> Enter signature details:
   │   │   - Signed by
   │   │   - Position
   │   │   - Date
   │   │   - Upload signature image
   │   ├─> Status: Provider Signed
   │   └─> Email → Sales team
   │
   ├─> Send to Client
   │   ├─> Email → Juristic Manager
   │   │   Subject: "Contract for Digital Signage Service"
   │   │   Body:
   │   │   - Cover letter
   │   │   - Signing instructions
   │   │   - Return instructions
   │   │   Attachments:
   │   │   - Signed contract (2 copies)
   │   │   - Supporting documents
   │   │
   │   ├─> Status: Sent to Client
   │   └─> Set follow-up reminders
   │
   ├─> Client Review & Approval
   │   ├─> Juristic manager reviews
   │   ├─> May need committee approval
   │   ├─> Committee meeting
   │   ├─> Committee votes
   │   └─> If approved: Proceed to sign
   │
   ├─> Client Signature
   │   ├─> Juristic manager signs
   │   ├─> Affixes company seal
   │   ├─> Returns signed contract
   │   │   - Email scan
   │   │   - OR mail original
   │   │
   │   ├─> Sales uploads signed contract
   │   ├─> Enter client signature details
   │   ├─> Status: Client Signed
   │   └─> Email → Director, Finance, Operations
   │
   └─> Both Parties Signed
       ├─> Status: Fully Executed
       └─> Continue to "Contract Executed" section

   ┌─────────────────────────────────────┐
   │ OPTION B: Client Signs First        │
   │ (or simultaneous signing meeting)   │
   └─────────────────────────────────────┘
   │
   ├─> Send to Client Unsigned
   │   ├─> Status: Sent to Client
   │   └─> Email → Juristic with unsigned contract
   │
   ├─> Client Approval Process
   │   (Same as Option A)
   │
   ├─> Client Signature
   │   ├─> Status: Client Signed
   │   └─> Return to provider
   │
   ├─> Provider Countersignature
   │   ├─> Director signs
   │   ├─> Status: Provider Signed
   │   └─> Now: Fully Executed
   │
   └─> Continue to "Contract Executed"

7. CONTRACT EXECUTED
   │
   ├─> Status: Fully Executed
   ├─> Contract start date active
   │
   ├─> Update project.json:
   │   - deployment_status: "contracted"
   │   - contract.rental_start_date
   │   - contract.rental_end_date
   │   - contract_request_id: req-cont-XXX
   │
   ├─> Email → All stakeholders
   │   Subject: "Contract Executed: [Project Name] - Ready for Deployment"
   │   Recipients:
   │   - Sales team
   │   - Operations team
   │   - Procurement team
   │   - Finance team
   │   - Juristic manager
   │   Body:
   │   - Contract summary
   │   - Key dates
   │   - Next steps for each team
   │
   ├─> Enable actions:
   │   - "Create Installation Request"
   │   - "Create Payment Request"
   │
   ├─> Auto-create reminders:
   │   - Contract start date (-7 days): "Contract starts in 1 week"
   │   - Contract end date (-90 days): "Contract expires in 3 months"
   │   - Contract end date (-30 days): "Contract expires in 1 month"
   │
   └─> Workflow splits into parallel tracks:
       ├─> PAYMENT REQUEST (Equipment purchase)
       └─> INSTALLATION REQUEST (Schedule installation)

STATUS FLOW:
Draft → Submitted → Legal Approved → Internal Approved → Sent to Client
→ Provider Signed → Client Signed → Fully Executed
```

---

## WORKFLOW 4A: PAYMENT REQUEST (Detailed)

```
┌─────────────────────────────────────────────────┐
│      PAYMENT REQUEST WORKFLOW (Equipment)       │
└─────────────────────────────────────────────────┘

Prerequisites: Contract executed

Actor: Procurement Team

1. CREATE PAYMENT REQUEST
   │
   ├─> From project, click "Create Payment Request"
   ├─> Select payment type: "Equipment Purchase"
   │
   ├─> Form pre-filled:
   │   - Project details
   │   - Contract reference
   │
   ├─> Status: Draft
   │
   └─> User fills:
       - Vendor selection
       - Items to purchase
       - Invoice details

2. SELECT VENDOR & ITEMS
   │
   ├─> Select vendor from dropdown
   │   - Vendor details auto-filled
   │   - Bank details loaded
   │   - Tax info loaded
   │
   ├─> Add items:
   │   - Option: Import from quotation
   │   - OR: Add manually
   │
   └─> Items added:
       - 55" Samsung Display × 1 = 25,000
       - Raspberry Pi Kit × 1 = 3,500
       - Pocket WiFi × 1 = 2,990

3. RECORD ASSET DETAILS (Critical Step!)
   │
   ├─> For EACH item, click "Record Asset"
   │
   ├─> SIGNAGE ASSET MODAL:
   │   ├─> Signage ID: sg001 (auto-generated)
   │   ├─> Screen size: 55 inch
   │   ├─> Resolution: 1920x1080
   │   ├─> Orientation: Portrait
   │   ├─> Brand: Samsung
   │   ├─> Model: QM55B
   │   ├─> Serial Number: [USER ENTERS]
   │   ├─> Acquired date: [Today]
   │   ├─> Cost: 25,000 THB
   │   ├─> Warranty: 24 months
   │   ├─> Status: In stock
   │   └─> Click "Save Signage Record"
   │       │
   │       └─> Creates entry in signage.json:
   │           {
   │             "signage_id": "sg001",
   │             "project_id": "prj001",
   │             "payment_request_id": "req-pay-001",
   │             "status": "in_stock",
   │             ...
   │           }
   │
   ├─> DEVICE ASSET MODAL (Raspberry Pi):
   │   ├─> Device ID: dev001 (auto-generated)
   │   ├─> Device type: Raspberry Pi
   │   ├─> Brand: Raspberry Pi Foundation
   │   ├─> Model: Raspberry Pi 4B
   │   ├─> Serial Number: [USER ENTERS]
   │   ├─> MAC Address: [USER ENTERS]
   │   ├─> Acquired date: [Today]
   │   ├─> Cost: 3,500 THB
   │   ├─> Warranty: 12 months
   │   ├─> Status: In stock
   │   └─> Click "Save Device Record"
   │       │
   │       └─> Creates entry in device.json
   │
   └─> DEVICE ASSET MODAL (Pocket WiFi):
       └─> Similar process, creates dev002

4. ATTACH INVOICE
   │
   ├─> Enter invoice details:
   │   - Invoice number
   │   - Invoice date
   │   - Invoice amount
   │
   ├─> Upload documents:
   │   - Invoice PDF
   │   - Tax invoice
   │   - Delivery note
   │
   └─> Validation:
       - Invoice amount matches item total
       - Invoice date valid
       - Tax invoice format correct

5. CALCULATE PAYMENT
   │
   ├─> System calculates:
   │   - Subtotal: 31,490.00
   │   - VAT 7%: +2,204.30
   │   - Total before WHT: 33,694.30
   │   - WHT 3%: -944.70
   │   - **Payment amount: 32,749.60 THB**
   │
   └─> Display payment breakdown clearly

6. CHECK BUDGET
   │
   ├─> Load project budget:
   │   - Total budget: 200,000.00
   │   - Committed: 120,000.00
   │   - This payment: 32,749.60
   │   - Remaining: 47,250.40
   │
   ├─> Check status:
   │   - If remaining > 20%: ✓ OK (green)
   │   - If remaining < 10%: ⚠ Warning (orange)
   │   - If remaining < 0%: ✖ Over budget (red)
   │
   └─> If over budget:
       - Flag for special approval
       - Require director sign-off

7. SUBMIT FOR APPROVAL
   │
   ├─> Click "Submit for Approval"
   │
   ├─> Validation checklist:
   │   [ ] All items have asset records
   │   [ ] Invoice attached
   │   [ ] Payment amount > 0
   │   [ ] Vendor selected
   │   [ ] Budget checked
   │
   ├─> If validation fails:
   │   - Show errors
   │   - Block submission
   │
   ├─> If validation passes:
   │   - Status: Pending Approval
   │   - Start approval chain
   │
   └─> Determine approval chain based on amount:

8. APPROVAL CHAIN

   Payment: 32,749.60 THB (< 50,000)
   Required approvers: Project Manager + Finance Manager

   ┌─────────────────────────────┐
   │ LEVEL 1: Project Manager    │
   └─────────────────────────────┘
   │
   ├─> Email → Project Manager
   │   Subject: "Payment Approval Needed: 32,749.60 THB for [Project]"
   │   Body:
   │   - Payment details
   │   - Vendor info
   │   - Equipment list
   │   - Link to review
   │
   ├─> Project Manager reviews:
   │   - Equipment needed?
   │   - Specs correct?
   │   - Price reasonable?
   │   - Timeline OK?
   │
   └─> Project Manager action:
       │
       ├─> APPROVE
       │   ├─> Click "Approve"
       │   ├─> Add comments (optional)
       │   ├─> Timestamp recorded
       │   ├─> Email → Finance Manager
       │   └─> Advance to Level 2
       │
       ├─> REQUEST CHANGES
       │   ├─> Click "Request Changes"
       │   ├─> Enter required changes
       │   ├─> Status: Changes Requested
       │   ├─> Email → Requester
       │   ├─> Requester makes changes
       │   └─> Resubmit → Back to Level 1
       │
       └─> REJECT
           ├─> Click "Reject"
           ├─> Enter rejection reason
           ├─> Status: Rejected
           ├─> Email → Requester
           └─> Workflow ends

   ┌─────────────────────────────┐
   │ LEVEL 2: Finance Manager    │
   └─────────────────────────────┘
   │
   ├─> Email → Finance Manager
   │   Subject: "Finance Approval Needed: 32,749.60 THB"
   │   Body:
   │   - Payment details
   │   - Budget impact
   │   - Project Manager approved
   │   - Link to review
   │
   ├─> Finance Manager reviews:
   │   - Budget available?
   │   - Invoice correct?
   │   - Tax calculations OK?
   │   - Payment terms acceptable?
   │
   └─> Finance Manager action:
       │
       ├─> APPROVE
       │   ├─> Click "Approve"
       │   ├─> Status: Approved (All approvals complete)
       │   ├─> Email → Finance team (payment processing)
       │   ├─> Email → Requester (approval notification)
       │   └─> Advance to Payment Processing
       │
       ├─> REQUEST CHANGES
       │   (Similar to Level 1)
       │
       └─> REJECT
           (Similar to Level 1)

   [Note: For higher amounts, additional approval levels trigger automatically]

9. PAYMENT PROCESSING
   │
   ├─> Status: Approved (Ready for Payment)
   │
   ├─> Finance team receives notification
   ├─> Finance reviews:
   │   - All approvals complete ✓
   │   - Documents attached ✓
   │   - Bank details verified ✓
   │
   ├─> Schedule payment:
   │   - Add to payment batch
   │   - Schedule payment date
   │   - Status: Payment Scheduled
   │
   ├─> Execute payment:
   │   - Log into bank system
   │   - Create transfer: 32,749.60 THB
   │   - To: Vendor account
   │   - Reference: req-pay-001
   │   - Execute transfer
   │
   ├─> Record payment:
   │   - Status: Paid
   │   - Paid by: finance@company.com
   │   - Payment date: [Today]
   │   - Payment reference: [Bank ref number]
   │   - Upload payment slip (screenshot/PDF)
   │
   └─> Email notifications:
       - To: Requester ("Payment completed")
       - To: Project Manager ("Equipment payment done")
       - Copy: Vendor (optional - "Payment sent")

10. UPDATE RECORDS (Automatic)
    │
    ├─> Update signage.json:
    │   - sg001 status: "in_stock" → "ready_for_installation"
    │   - acquired_date: [Today]
    │   - payment_request_id: req-pay-001
    │
    ├─> Update device.json:
    │   - dev001, dev002 status: "in_stock" → "ready_for_installation"
    │   - acquired_date: [Today]
    │   - payment_request_id: req-pay-001
    │
    ├─> Update project.json:
    │   - Add signage_ids: ["sg001"]
    │   - Add device_ids: ["dev001", "dev002"]
    │   - Update costs.signage_cost: +25,000
    │   - Update costs.device_cost: +6,490
    │   - Update costs.total_investment: +32,749.60
    │   - Add payment_request_ids: ["req-pay-001"]
    │
    └─> Update request.json:
        - Link asset_ids to payment request

11. VENDOR CONFIRMATION
    │
    ├─> Vendor receives payment
    ├─> Vendor sends confirmation email
    │
    ├─> Finance uploads:
    │   - Receipt from vendor
    │   - Official tax invoice (if not yet received)
    │
    ├─> Status: Completed
    │
    └─> Payment request archived (completed)

PARALLEL: Installation Request can proceed once equipment ready

STATUS FLOW:
Draft → Pending Approval → Level 1 Approved → Level 2 Approved → ...
→ Approved → Payment Scheduled → Paid → Completed
```

---

## WORKFLOW 4B: INSTALLATION REQUEST (Detailed)

```
┌─────────────────────────────────────────────────┐
│      INSTALLATION REQUEST WORKFLOW              │
└─────────────────────────────────────────────────┘

Prerequisites: Contract executed, Equipment purchased (or on order)

Actor: Operations Team

1. CREATE INSTALLATION REQUEST
   │
   ├─> From project, click "Create Installation Request"
   │
   ├─> Form pre-filled:
   │   - Project details
   │   - Contract reference
   │   - Signages from project (sg001, sg002, sg003)
   │
   ├─> Status: Draft
   │
   └─> User configures installation

2. SELECT SIGNAGES & CONFIGURE
   │
   ├─> Select signages to install:
   │   [x] sg001 - Ground Floor Lobby
   │   [x] sg002 - Floor 15 Elevator
   │   [x] sg003 - Floor 20 Co-working
   │
   ├─> For each signage, specify:
   │   - Exact location
   │   - Installation type (wall mount/stand)
   │   - Power requirements
   │   - Network setup
   │   - Special requirements
   │   - Estimated time
   │
   └─> Total installation time: 9 hours

3. SELECT INSTALLATION VENDOR
   │
   ├─> Choose vendor from dropdown:
   │   - Filter: vendor_type = "installation"
   │   - Shows: Pro Install Co., Ltd.
   │
   ├─> Vendor details auto-filled:
   │   - Contact person
   │   - Phone
   │   - Email
   │   - Rating
   │
   ├─> Selection reason:
   │   "Recommended by building management. Prior experience with similar projects."
   │
   └─> Request quote from vendor (optional):
       - Send installation specs
       - Vendor provides quote
       - Upload quote document

4. COORDINATE WITH BUILDING
   │
   ├─> Contact juristic manager:
   │   - Phone: 081-234-5678
   │   - Email: somchai@juristic.com
   │
   ├─> Discuss:
   │   - Preferred installation dates
   │   - Access requirements
   │   - Resident notification needed
   │   - Building regulations
   │
   ├─> Arrange logistics:
   │   [ ] Building management notified
   │   [ ] Elevator reserved: Date, Time
   │   [ ] Parking arranged: 2 spaces, Basement
   │   [ ] Access cards: 3 cards requested
   │   [ ] Safety briefing: Scheduled for [Date]
   │   [ ] Resident notification: Posted on [Date]
   │
   └─> Record coordinator details:
       - Name: คุณสมชาย สมบูรณ์
       - Phone: 081-234-5678
       - Best contact time: 9am-5pm weekdays

5. SCHEDULE INSTALLATION
   │
   ├─> Select preferred date:
   │   - Date picker (min: today + 3 days)
   │   - Preferred: 2024-01-25
   │
   ├─> Select time:
   │   - Start: 09:00
   │   - End: 17:00
   │
   ├─> Alternative dates:
   │   - Alt 1: 2024-01-26
   │   - Alt 2: 2024-01-27
   │
   ├─> Special timing requirements:
   │   "Lobby installation after 2pm (post cleaning).
   │    Co-working space before 8am (before opening)."
   │
   └─> Estimated completion: 16:30 (9 hours work + breaks)

6. SPECIFY MATERIALS & COSTS
   │
   ├─> Materials checklist:
   │   [ ] Wall mount brackets × 3 = 10,500
   │   [ ] Cable tray 30m = 7,500
   │   [ ] Electric wire 45m = 2,025
   │   [ ] Power outlets × 2 = 1,600
   │   [ ] HDMI cables × 3 = 1,050
   │   [ ] Transportation = 1,500
   │
   ├─> Cost breakdown:
   │   - Labor: 9,000
   │   - Materials: 22,675
   │   - Other: 1,500
   │   - Subtotal: 33,175
   │   - VAT 7%: 2,322.25
   │   - **Total: 35,497.25 THB**
   │
   └─> Upload vendor quote

7. SAFETY & COMPLIANCE
   │
   ├─> Safety checklist:
   │   [ ] Safety briefing completed
   │   [ ] PPE required (specified)
   │   [ ] Building guidelines provided
   │   [ ] Emergency contacts shared
   │   [ ] Fire safety protocols reviewed
   │   [ ] Electrical certification verified
   │   [ ] Insurance certificate verified
   │
   └─> Upload documents:
       - Vendor insurance certificate
       - Electrical certification
       - Building approval letter

8. SUBMIT FOR APPROVAL
   │
   ├─> Click "Submit for Approval"
   │
   ├─> Validation:
   │   - At least 1 signage selected ✓
   │   - Installation date ≥ today + 3 days ✓
   │   - All locations have specs ✓
   │   - Vendor selected ✓
   │   - Coordinator contact provided ✓
   │   - Total cost > 0 ✓
   │
   ├─> Status: Pending Approval
   │
   └─> Email → Operations Manager
       Subject: "Installation Approval Needed: [Project Name]"
       Body:
       - Installation summary
       - 3 signages, 9 hours
       - Date: 2024-01-25
       - Cost: 35,497.25 THB
       - Link to review

9. OPERATIONS MANAGER REVIEW
   │
   ├─> Operations Manager opens request
   │
   ├─> Reviews:
   │   - Schedule feasible?
   │   - Vendor capable?
   │   - Coordination complete?
   │   - Safety requirements met?
   │   - Cost reasonable?
   │
   └─> Operations Manager action:
       │
       ├─> APPROVE
       │   ├─> Click "Approve"
       │   ├─> Add approval comments
       │   ├─> Status: Approved
       │   ├─> Email → Operations team
       │   │   "Installation approved. Proceed to schedule."
       │   │
       │   └─> Email → Installation vendor
       │       Subject: "Installation Work Order: [Project Name]"
       │       Attachments:
       │       - Work order PDF
       │       - Site diagrams
       │       - Contact list
       │
       └─> REQUEST CHANGES
           ├─> Status: Revision Needed
           ├─> Enter required changes
           ├─> Email → Requester
           ├─> Requester revises
           └─> Resubmit

10. CONFIRM SCHEDULE WITH ALL PARTIES
    │
    ├─> Operations coordinator contacts:
    │   - Vendor: Confirm availability for Jan 25
    │   - Juristic manager: Confirm building access
    │   - Internal team: Assign supervisor
    │
    ├─> All parties confirm
    │
    ├─> Status: Scheduled
    │
    ├─> Send calendar invites:
    │   - To: Vendor technicians
    │   - To: Juristic manager
    │   - To: Internal supervisor
    │   - To: Project manager
    │   Time: 09:00-17:00, Jan 25, 2024
    │   Location: [Project address]
    │   Description: Installation details
    │   Attachments: Work order, contacts
    │
    ├─> Set automated reminders:
    │   - 1 day before: "Installation tomorrow at [Project]"
    │   - 2 hours before: "Installation starts in 2 hours"
    │   - Morning of: "Installation starting today"
    │
    └─> Update project.json:
        - deployment_status: "installation_scheduled"
        - installation_request_ids: ["req-inst-001"]

11. INSTALLATION DAY - MORNING
    │
    ├─> Status: In Progress
    │
    ├─> Vendor arrives:
    │   - Time: 09:15 (actual)
    │   - Team: 2 technicians
    │   - Equipment check: ✓
    │
    ├─> Site check-in:
    │   - Meet juristic manager
    │   - Receive access cards
    │   - Review locations
    │   - Safety briefing
    │
    ├─> Take "Before" photos:
    │   - Each location
    │   - Wall conditions
    │   - Surrounding area
    │   - Upload to system
    │
    └─> Begin installation:
        - Location 1: Floor 20 Co-working (before 8am)
        - Location 2: Ground Floor Lobby (after 2pm)
        - Location 3: Floor 15 Elevator

12. INSTALLATION DAY - PROGRESS TRACKING
    │
    ├─> Technician updates (via mobile/tablet):
    │   - 10:00: "Co-working installation complete"
    │   - 12:00: "Break for lunch"
    │   - 14:00: "Starting lobby installation"
    │   - 15:30: "Lobby complete, moving to Floor 15"
    │   - 16:30: "All installations complete"
    │
    ├─> Upload "During" photos:
    │   - Mounting process
    │   - Cable routing
    │   - Power connections
    │
    └─> Internal supervisor monitors:
        - Site visit at key milestones
        - Quality spot checks
        - Address any issues real-time

13. INSTALLATION DAY - COMPLETION
    │
    ├─> Final tasks:
    │   - All signages powered on
    │   - Network connectivity tested
    │   - Content loaded and displaying
    │   - Remote access verified
    │   - Clean up completed
    │
    ├─> Take "After" photos:
    │   - Each installed signage
    │   - Clean work area
    │   - Overall result
    │   - Upload to system
    │
    ├─> Fill completion checklist:
    │   [x] All signages installed securely
    │   [x] No building damage
    │   [x] Cables properly routed
    │   [x] Power tested
    │   [x] Network tested
    │   [x] Content displaying
    │   [x] Remote access working
    │   [x] Area cleaned
    │
    ├─> Status: Completed (Pending Acceptance)
    │
    └─> Request juristic manager inspection

14. JURISTIC MANAGER INSPECTION
    │
    ├─> Juristic manager inspects:
    │   - sg001 (Lobby): Visually check
    │   - sg002 (Floor 15): Visually check
    │   - sg003 (Co-working): Visually check
    │
    ├─> Inspection criteria:
    │   - Installation quality
    │   - No damage to building
    │   - Content displaying correctly
    │   - Aesthetically acceptable
    │   - Safety (no exposed wires)
    │
    └─> Inspection result:
        │
        ├─> ACCEPT
        │   │
        │   ├─> Juristic manager signs acceptance form
        │   ├─> Upload signed form
        │   ├─> Status: Accepted
        │   ├─> Actual completion time: 16:30
        │   │
        │   └─> Email notifications:
        │       - To: All stakeholders
        │       Subject: "Installation Complete: [Project Name]"
        │       Body:
        │       - Installation successful
        │       - All 3 signages live
        │       - Acceptance form attached
        │       - Warranty starts today
        │
        └─> REQUEST CORRECTIONS
            │
            ├─> List issues:
            │   Example: "Cable cover loose on Floor 15"
            │
            ├─> Status: Corrections Needed
            ├─> Vendor returns to fix
            ├─> Complete corrections
            └─> Re-inspection → Accept

15. POST-INSTALLATION ACTIONS (Automatic)
    │
    ├─> Create installation.json entry:
    │   {
    │     "installation_id": "inst001",
    │     "project_id": "prj001",
    │     "signage_id": "sg001",
    │     "installation_request_id": "req-inst-001",
    │     "vendor_name": "Pro Install Co., Ltd.",
    │     "actual_completion_datetime": "2024-01-25T16:30:00Z",
    │     "status": "completed",
    │     "cost_summary": { "total_cost": 35497.25 },
    │     ...
    │   }
    │   (Repeat for sg002, sg003 or create combined entry)
    │
    ├─> Update signage.json (all 3 signages):
    │   - status: "ready_for_installation" → "active"
    │   - installation_id: "inst001"
    │   - go_live_date: "2024-01-25"
    │   - location_building: "Main Building"
    │   - location_floor: "Ground Floor" (etc.)
    │   - location_zone: "Lobby" (etc.)
    │
    ├─> Update project.json:
    │   - signage_operations.deployment_status: "active"
    │   - signage_operations.go_live_date: "2024-01-25"
    │   - signage_operations.installation_ids: ["inst001"]
    │   - costs.installation_cost: +35,497.25
    │   - costs.total_investment: updated
    │
    ├─> Update device.json (associated devices):
    │   - status: "ready_for_installation" → "active"
    │   - installation_date: "2024-01-25"
    │   - signage_id: linked
    │
    └─> Update request.json:
        - Status: Completed
        - Archive request

16. HANDOVER & TRAINING
    │
    ├─> Schedule training session:
    │   - Date: 2024-01-26 (day after installation)
    │   - Duration: 2 hours
    │   - Attendees: Juristic staff (2 persons)
    │
    ├─> Training topics:
    │   - Basic operation
    │   - Content management
    │   - Troubleshooting
    │   - Contacts for support
    │
    ├─> Provide documentation:
    │   - Equipment manuals
    │   - Contact list
    │   - Troubleshooting guide
    │   - Warranty cards
    │   - Access credentials (secured)
    │
    ├─> Handover sign-off:
    │   - Juristic manager signs handover form
    │   - Upload signed form
    │
    └─> Email → All parties:
        Subject: "Project Handover Complete: [Project Name]"
        Body:
        - Training completed
        - All documentation provided
        - Project now live
        - Warranty period started
        - Support contacts

17. PROJECT LIVE
    │
    ├─> Final project status: LIVE ✓
    │
    ├─> Dashboard updates:
    │   - Project shows as "Active"
    │   - All signages "Active"
    │   - All devices "Active"
    │   - Go-live date displayed
    │
    ├─> Monitoring starts:
    │   - Signage uptime tracking
    │   - Content display verification
    │   - Network connectivity monitoring
    │   - Health checks (daily auto)
    │
    └─> Ongoing operations commence:
        - Monthly rental payments
        - Network service payments
        - Maintenance (as needed)
        - Performance reviews

WORKFLOW COMPLETE: Installation successful, project live!

STATUS FLOW:
Draft → Submitted → Approved → Scheduled → In Progress
→ Completed (Pending Acceptance) → Accepted → [Create installation.json] → Live
```

---

## PARALLEL WORKFLOWS SUMMARY

After contract execution, these workflows run in parallel:

```
CONTRACT EXECUTED (req-cont-001)
    │
    ├─────────────────┬─────────────────┐
    │                 │                 │
    ▼                 ▼                 ▼
PAYMENT REQ 1     PAYMENT REQ 2   INSTALLATION REQ
(Equipment)       (Installation)   (Schedule work)
    │                 │                 │
    ├─> Buy signage   ├─> Pay vendor   ├─> Coordinate
    ├─> Buy devices   │   after work   ├─> Schedule
    ├─> Record assets │   complete      ├─> Install
    ├─> Create sg001, │                 ├─> Inspect
    │   dev001, dev002│                 └─> Accept
    └─> Assets ready  └─> Payment done      │
            │                                 │
            └─────────────┬───────────────────┘
                          │
                          ▼
                    PROJECT LIVE
                  Signages active
                 Monitoring starts
               Recurring ops begin
```

---

## STATUS TRANSITIONS MATRIX

| Request Type | Statuses |
|--------------|----------|
| **Project Request** | Draft → Submitted → [Approved \| Info Requested → Resubmitted \| Rejected] |
| **Quotation Request** | Draft → Submitted → Finance Approved → Final Approved → Sent to Client → [Accepted \| In Negotiation \| Rejected] |
| **Contract Request** | Draft → Submitted → Legal Approved → Internal Approved → Sent to Client → Provider Signed → Client Signed → Fully Executed |
| **Installation Request** | Draft → Submitted → Approved → Scheduled → In Progress → Completed → [Accepted \| Corrections Needed → ...] |
| **Payment Request** | Draft → Pending Approval → Lv1 Approved → Lv2 Approved → ... → Approved → Payment Scheduled → Paid → Completed |

---

## AUTOMATED ACTIONS SUMMARY

| Trigger | Automated Action |
|---------|------------------|
| Project Request approved | • Create project.json entry<br>• Email requester<br>• Enable "Create Quotation" |
| Quotation accepted | • Update project status<br>• Enable "Create Contract" |
| Contract executed | • Update project status<br>• Email all teams<br>• Enable "Create Installation Request"<br>• Enable "Create Payment Request"<br>• Create contract expiry reminders |
| Payment request paid | • Update asset records (signage.json, device.json)<br>• Update project costs<br>• Email stakeholders |
| Installation accepted | • Create installation.json<br>• Update signage status to "Active"<br>• Update project status to "Active"<br>• Set go-live date |
| Quotation sent to client | • Create follow-up reminders (Day 3, 7, 14, 25) |
| Installation scheduled | • Send calendar invites<br>• Create reminders (-1 day, -2 hours) |
| Contract nearing expiry | • Alert 90 days before<br>• Alert 30 days before |
| Network nearing expiry | • Alert 30 days before |

---

## ERROR HANDLING & EDGE CASES

### What if equipment arrives late?
- Reschedule installation
- Update installation request with new date
- Notify all parties
- Track delay reason

### What if installation fails inspection?
- Status: Corrections Needed
- Vendor schedules return visit
- Fix issues
- Re-inspection
- Accept when satisfied

### What if payment is rejected?
- Status: Rejected
- Email requester with reason
- Requester can:
  - Revise and resubmit
  - Appeal decision
  - Cancel request

### What if client never responds to quotation?
- Follow-up reminders (auto)
- Manual follow-ups
- After 30 days: Mark as "No Response"
- Archive after 60 days

### What if budget is exceeded?
- Flag payment request
- Require director approval
- Director reviews:
  - Approve with budget increase
  - Reject and request revision

---

This workflow documentation provides a complete operational guide for your digital signage business process from opportunity to live deployment!

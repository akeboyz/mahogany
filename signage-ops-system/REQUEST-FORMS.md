c# Request Forms Design - Digital Signage Operations System

## Overview
This document details the 5 request forms that drive the entire workflow from initial project interest to deployment.

---

## WORKFLOW SEQUENCE

```
1. PROJECT REQUEST
   ↓ (Approved)
2. QUOTATION REQUEST
   ↓ (Accepted by client)
3. CONTRACT REQUEST
   ↓ (Signed)
4. INSTALLATION REQUEST + PAYMENT REQUESTS (parallel)
   ↓ (Completed)
5. PROJECT GOES LIVE
```

---

## FORM 1: PROJECT REQUEST

**Purpose**: Capture initial project opportunity and evaluate feasibility
**Trigger**: Sales/BD identifies potential condo project
**Creates**: Project record (draft status) in project.json
**Next Step**: If approved → Quotation Request

### Form Sections

#### A. Request Information
```
Form Header:
- Request ID: [Auto-generated: req-prj-XXX]
- Request Type: Project Request
- Submitted By: [Auto-filled: current user email]
- Submitted Date: [Auto-filled: current date]
- Priority: [Dropdown: Normal | High | Urgent]
- Status: [Display only: Draft]
```

#### B. Project Basic Information
```
Project Details:
- Project Name: [Text input] *Required
  Example: "The Sukhumvit Residence"

- Project Type: [Dropdown] *Required
  Options: Condominium | Apartment | Office Building | Mixed-use

- Project Address: [Textarea]
  Example: "Sukhumvit 23, Bangkok, Thailand"

- Map Location: [Optional]
  - Latitude: [Number input]
  - Longitude: [Number input]
  - OR Google Maps URL: [URL input]

Building Information:
- Total Units: [Number input]
- Total Buildings: [Number input]
- Total Floors: [Number input]
- Completion Year: [Year picker]
```

#### C. Contact Information
```
Juristic Office Contact:
- Contact Person Name: [Text input] *Required
- Position/Role: [Text input]
  Default: "Juristic Manager"

- Phone Number: [Text input with format] *Required
  Format: 0XX-XXX-XXXX

- Email: [Email input] *Required
- LINE ID: [Text input]
- Preferred Contact Method: [Radio: Phone | Email | LINE]

Committee Contact (Optional):
- Committee Chair Name: [Text input]
- Phone: [Text input]
- Email: [Email input]
```

#### D. Signage Requirements
```
Deployment Scope:
- Number of Signages Required: [Number input] *Required
  Min: 1, Max: 20

- Preferred Locations: [Dynamic list with Add/Remove]
  [ ] Location 1: [Text input] e.g., "Ground Floor Lobby"
  [ ] Location 2: [Text input] e.g., "Elevator Hall Floor 15"
  [+ Add Location]

Content Purpose: [Checkboxes] *Select at least one
  [ ] Property listings (sale/rent)
  [ ] Facility booking system
  [ ] Juristic announcements
  [ ] Building directory
  [ ] Community events
  [ ] Other: [Text input]

Special Requirements: [Textarea]
  Example: "Need touch screen for interactive property search"
```

#### E. Budget & Timeline
```
Financial Information:
- Estimated Budget: [Number input] THB
  Help text: "Initial budget available for this project"

- Budget Authority: [Dropdown]
  Options: Juristic Fund | Committee Approved | Pending Approval

Timeline:
- Desired Go-Live Date: [Date picker] *Required
- Installation Flexibility: [Radio]
  Options: Fixed date | Flexible within month | Flexible within quarter

- Decision Timeline: [Dropdown]
  Options: Within 1 week | 2-4 weeks | 1-2 months | 3+ months
```

#### F. Opportunity Details
```
Lead Information:
- How did you find this opportunity? [Dropdown] *Required
  Options:
  - Cold call
  - Referral (specify source)
  - Website inquiry
  - Event/Trade show
  - Existing relationship
  - Other

- Referral Source: [Text input]
  Show if "Referral" selected

- Interest Level: [Radio] *Required
  Options: Hot (ready to proceed) | Warm (interested, needs details) | Cold (exploratory)

- Competition: [Checkboxes]
  [ ] No competitors known
  [ ] Existing provider (specify): [Text input]
  [ ] Evaluating multiple vendors
```

#### G. Notes & Attachments
```
Additional Information:
- Internal Notes: [Textarea]
  Placeholder: "Add any relevant information for internal review..."

- Client Notes: [Textarea]
  Placeholder: "Notes that can be shared with client if needed..."

Attachments: [File upload - Multiple files]
  Accept: .pdf, .doc, .docx, .jpg, .png
  Max size: 10MB per file

  Suggested attachments:
  - Site photos
  - Building layout
  - Existing signage photos
  - Meeting notes
```

#### H. Form Actions
```
Bottom Action Buttons:
- [Save as Draft] - Saves without submitting
- [Submit for Review] - Submits to manager
- [Cancel] - Discards changes
```

### Validation Rules
1. All fields marked *Required must be filled
2. Phone number must match Thai format
3. Email must be valid format
4. At least one content purpose must be selected
5. If interest level is "Hot", desired go-live date should be within 3 months

### After Submission
- Status changes to "Submitted"
- Email notification sent to designated reviewer (manager)
- Request appears in Operations Summary dashboard
- Reviewer can:
  - Approve → Enables creation of Quotation Request
  - Request More Info → Returns to submitter
  - Reject → Closes request with reason

---

## FORM 2: QUOTATION REQUEST

**Purpose**: Create detailed quotation for juristic office with costs and terms
**Trigger**: Project Request approved
**Creates**: Quotation document and formal proposal
**Next Step**: If accepted by client → Contract Request

### Form Sections

#### A. Request Information
```
Form Header:
- Request ID: [Auto-generated: req-quot-XXX]
- Parent Project Request: [Display: req-prj-XXX with link]
- Project Name: [Display from parent]
- Quotation Number: [Auto-generated: QUOT-2024-XXX]
- Submitted By: [Auto-filled]
- Submitted Date: [Auto-filled]
- Valid Until: [Date picker] Default: +30 days
```

#### B. Space Rental Terms
```
Rental Agreement:
- Monthly Rental Fee: [Number input] THB *Required
  Help: "Fee paid to juristic for space rental"

- Rental Period: [Number input] Months *Required
  Default: 24 months

- Rental Start Date: [Date picker]
- Rental End Date: [Auto-calculated from start + period]

- Deposit Amount: [Number input] THB *Required
  Help: "Refundable deposit (typically 2 months rental)"

- Deposit Refundable: [Radio: Yes | No]
  Default: Yes

- Revenue Share: [Number input] %
  Default: 0
  Range: 0-50%
  Help: "Percentage of ad revenue shared with juristic (if any)"

Payment Terms:
- Rental Payment Due: [Dropdown]
  Options: 1st of month | 5th of month | 15th of month
  Default: 1st of month

- Payment Method: [Dropdown]
  Options: Bank transfer | Cheque | Cash
  Default: Bank transfer

- Late Payment Penalty: [Number input] %
  Default: 1.5% per month
```

#### C. Equipment Costs
```
Digital Signage Units:
[Dynamic table with Add/Remove rows]
| Description | Quantity | Unit Price (THB) | Total (THB) | [Actions] |
|------------|----------|------------------|-------------|-----------|
| 55" Samsung Display | 3 | 25,000 | 75,000 | [Edit][Delete] |

[+ Add Signage Item]

Default templates available:
- 43" Portrait Display (22,000 THB)
- 55" Portrait Display (25,000 THB)
- 55" Landscape Display (24,000 THB)
- 65" Portrait Display (45,000 THB)

Supporting Devices:
[Dynamic table]
| Description | Quantity | Unit Price (THB) | Total (THB) | [Actions] |
|------------|----------|------------------|-------------|-----------|
| Raspberry Pi Kit | 3 | 3,500 | 10,500 | [Edit][Delete] |
| 4G Pocket WiFi | 2 | 2,990 | 5,980 | [Edit][Delete] |

[+ Add Device Item]

Default templates:
- Raspberry Pi 4B 4GB Kit (3,500 THB)
- 4G Pocket WiFi + Contract (2,990 THB)
- WiFi Router (2,500 THB)

Installation Services:
[Dynamic table]
| Description | Quantity | Unit Price (THB) | Total (THB) | [Actions] |
|------------|----------|------------------|-------------|-----------|
| Professional Installation | 3 units | 15,000 per unit | 45,000 | [Edit][Delete] |

[+ Add Installation Item]

Cost Summary (Auto-calculated):
- Subtotal: [Display: 136,480.00]
- VAT (7%): [Display: 9,553.60]
- Total One-time Cost: [Display: 146,033.60 THB]
```

#### D. Recurring Costs
```
Monthly Operating Costs:
| Service | Monthly Cost (THB) | Annual Cost (THB) |
|---------|-------------------|-------------------|
| Space Rental | 5,000.00 | 60,000.00 |
| Network (per line) | 599.00 × 2 | 14,376.00 |
| Content Management | 0.00 | 0.00 |
| Maintenance Support | 0.00 | 0.00 |
|---------|-------------------|-------------------|
| Total Monthly | 6,198.00 | 74,376.00 |

Network details editable:
- Number of network lines: [Number input]
- Cost per line: [Number input]
- Provider: [Dropdown: AIS | True | DTAC]
```

#### E. Payment Schedule
```
Payment Milestones:
[Dynamic table with Add/Remove]
| Milestone | % | Amount (THB) | Due Date | Status |
|-----------|---|--------------|----------|--------|
| Contract Signing | 50% | 73,016.80 | Upon signing | Pending |
| Installation Complete | 50% | 73,016.80 | Upon completion | Pending |

[+ Add Milestone]

Default templates:
- 50/50 split (Contract / Completion)
- 30/30/40 split (Contract / Installation / Completion)
- 100% upfront
- Net 30 days after completion
```

#### F. Terms and Conditions
```
Standard Terms: [Checkboxes with text editing]
[x] Quotation valid for 30 days
[x] Installation completed within 2 weeks after approval
[x] 12-month warranty on equipment and installation
[x] Content updates provided by client
[x] Network service subject to provider terms
[ ] Custom term: [Text input]

[+ Add Custom Term]

Special Conditions: [Textarea]
Example: "Special discount applied for 3-unit package. Promotional pricing valid until end of quarter."
```

#### G. Service Scope
```
What's Included:
[Checkboxes]
[x] Equipment supply and delivery
[x] Professional installation
[x] Initial content setup
[x] Staff training (2 hours)
[x] Technical support (business hours 9am-6pm, Mon-Fri)
[x] Remote monitoring
[ ] 24/7 technical support
[ ] Monthly content updates
[ ] On-site quarterly maintenance

Client Responsibilities:
[Checkboxes]
[x] Provide electrical power supply
[x] Provide installation access and coordination
[x] Content approval within 48 hours
[x] Designate contact person for operations
```

#### H. Notes & Documents
```
Internal Notes: [Textarea]
Visible only to internal team

Client-facing Notes: [Textarea]
Will appear on quotation document

Attachments:
- Upload supporting documents [File upload]
- Equipment spec sheets
- Sample content mockups
- Reference photos

Generate Quotation PDF:
[Button: Preview Quotation] - Opens PDF preview
Settings:
- Language: [Radio: Thai | English | Bilingual]
- Template: [Dropdown: Standard | Premium | Minimal]
- Include images: [Checkbox]
```

#### I. Form Actions
```
- [Save Draft]
- [Generate PDF] - Creates downloadable quotation
- [Submit for Approval] - Sends to manager
- [Send to Client] - Emails quotation to juristic (after approval)
- [Cancel]
```

### Validation Rules
1. All costs must be positive numbers
2. Payment milestones must sum to 100%
3. Valid until date must be in future
4. At least one signage item required
5. Rental terms must be complete if rental > 0

### After Submission
- PDF quotation auto-generated
- Email sent to designated approver
- Status tracking:
  - Draft → Submitted → Approved → Sent to Client → Accepted/Rejected
- If accepted by client → Enable Contract Request creation

---

## FORM 3: CONTRACT REQUEST

**Purpose**: Formalize agreement between company and juristic office
**Trigger**: Quotation accepted by client
**Creates**: Legal contract document
**Next Step**: After both parties sign → Enable Installation & Payment Requests

### Form Sections

#### A. Request Information
```
Form Header:
- Request ID: [Auto-generated: req-cont-XXX]
- Parent Quotation: [Display: req-quot-XXX with link]
- Contract Number: [Auto-generated: CONT-2024-XXX]
- Project Name: [Display from parent]
- Contract Type: [Display: Space Rental and Service Agreement]
- Submitted By: [Auto-filled]
- Submitted Date: [Auto-filled]
```

#### B. Parties Information
```
Provider (Our Company):
- Company Name: [Text input] *Required
  Default from settings

- Registration Number: [Text input] *Required
  Default from settings

- Address: [Textarea] *Required
  Default from settings

- Representative Name: [Text input] *Required
  Example: "Mr. John Doe"

- Representative Position: [Text input] *Required
  Example: "Managing Director"

- Phone: [Text input]
- Email: [Email input]

Client (Juristic Office):
- Company Name: [Text input] *Required
  Pre-filled from project: "[Project Name] Juristic Person"

- Registration Number: [Text input]

- Address: [Textarea]
  Pre-filled from project address

- Representative Name: [Text input] *Required
  Pre-filled from project contact

- Representative Position: [Text input]
  Default: "Juristic Manager"

- Phone: [Text input]
  Pre-filled from project

- Email: [Email input]
  Pre-filled from project
```

#### C. Contract Period
```
Duration:
- Contract Start Date: [Date picker] *Required
  Help: "Date when service begins"

- Contract End Date: [Date picker] *Required
  Help: "Date when contract expires"

- Contract Period: [Display: Auto-calculated months]

- Effective Date: [Date picker]
  Help: "Date when contract becomes effective (usually same as start date)"

Renewal Terms:
- Auto-Renewal: [Radio: Yes | No] *Required
  Default: No

- If Yes, Auto-Renewal Period: [Number input] months
  Default: 12

- Renewal Terms: [Textarea]
  Example: "Contract auto-renews for 12 months unless either party provides 60 days written notice"

Termination:
- Termination Notice Period: [Number input] days *Required
  Default: 60 days

- Early Termination Terms: [Textarea]
  Example: "Either party may terminate with 60 days notice. Early termination fee: 2 months rental fee"
```

#### D. Financial Terms
```
Rental Terms (Pre-filled from Quotation):
- Monthly Rental Fee: [Display: 5,000.00 THB]
- Payment Due Date: [Display: 1st of each month]
- Deposit Amount: [Display: 10,000.00 THB]
- Deposit Refundable: [Display: Yes]

Payment Terms:
- Payment Method: [Dropdown]
  Options: Bank transfer | Cheque | Cash
  Default: Bank transfer

- Late Payment Penalty: [Number input] %
  Default: 1.5% per month

- Grace Period: [Number input] days
  Default: 5 days
  Help: "Days after due date before penalty applies"

Bank Details (for payments to provider):
- Bank Name: [Text input]
- Account Number: [Text input]
- Account Name: [Text input]
- Branch: [Text input]

Revenue Share (if applicable):
- Revenue Share Applicable: [Radio: Yes | No]
  Pre-filled from quotation

- If Yes, Revenue Share %: [Number input]
- Revenue Calculation Method: [Dropdown]
  Options: Gross revenue | Net revenue
- Payment Frequency: [Dropdown]
  Options: Monthly | Quarterly | Annually
```

#### E. Scope of Service
```
Locations (Pre-filled from quotation/project):
[List with checkboxes]
[x] Ground Floor Lobby - Main Wall
[x] Floor 15 Elevator Hall
[x] Floor 20 Co-working Space

Service Scope:
Provider Responsibilities: [Dynamic checklist with text]
[x] Install and maintain digital signage equipment
    Details: [Textarea]
[x] Provide technical support during business hours (9am-6pm Mon-Fri)
[x] Ensure content compliance with building regulations
[x] Repair or replace faulty equipment within 48 hours
[x] Monthly equipment health checks
[x] Content management system access
[ ] Custom: [Text input]

[+ Add Responsibility]

Client Responsibilities: [Dynamic checklist with text]
[x] Provide electrical power supply
[x] Allow access for installation and maintenance
[x] Review and approve content within 48 hours
[x] Notify provider of equipment issues promptly
[x] Designate primary contact person
[x] Coordinate with residents/building users for installation
[ ] Custom: [Text input]

[+ Add Responsibility]
```

#### F. Content Policy
```
Content Guidelines:
- Content Approval Required: [Radio: Yes | No] *Required
  Default: Yes

- Approval Authority: [Text input]
  Example: "Juristic Manager or designated committee member"

- Approval Turnaround: [Number input] hours
  Default: 48 hours

Prohibited Content: [Dynamic list]
- Political content
- Adult content
- Competitor advertising
- Offensive or discriminatory content
[+ Add Item]

Content Priority Rules:
[Ordered list - drag to reorder]
1. Emergency announcements (fire, evacuation, etc.)
2. Juristic urgent announcements
3. Juristic general announcements
4. Facility booking information
5. Property listings
6. Community events

Special Content Terms: [Textarea]
Example: "Juristic announcements take absolute priority. Provider must display juristic content within 2 hours of request."
```

#### G. Equipment & Maintenance
```
Equipment Coverage:
- Equipment List: [Display from quotation]
  • 3× 55" Samsung QM55B Display
  • 3× Raspberry Pi 4B Media Player
  • 2× 4G Pocket WiFi
  [View Full List]

Ownership: [Radio] *Required
- Provider retains ownership (lease model)
- Client owns after payment complete
- Transfer ownership at contract end

Insurance & Liability:
- Equipment Insured By: [Dropdown]
  Options: Provider | Client | Shared
  Default: Provider

- Insurance Coverage Amount: [Number input] THB
  Default: Total equipment value

- Liability Coverage: [Number input] THB
  Default: 1,000,000 THB

- Property Damage Liability: [Textarea]
  Default: "Provider liable for damages caused during installation/maintenance up to 500,000 THB"

Maintenance Terms:
- Maintenance Included: [Radio: Yes | No]
  Default: Yes

- Maintenance Schedule: [Dropdown]
  Options: Monthly | Quarterly | Semi-annually | As needed

- Response Time for Issues: [Text input]
  Default: "48 hours for non-critical, 4 hours for critical"

- Replacement Timeline: [Text input]
  Default: "Faulty equipment replaced within 3 business days"

Warranty:
- Equipment Warranty Period: [Number input] months
  Default: 12 months

- Installation Warranty Period: [Number input] months
  Default: 12 months

- Warranty Coverage: [Textarea]
  Default: "Manufacturer defects, installation workmanship defects. Does not cover damage from misuse, accidents, or force majeure."
```

#### H. Special Conditions
```
Additional Terms: [Dynamic text fields]
- [Text input] Example: "Provider may display own promotional content max 10% of time"
- [Text input]
[+ Add Term]

Force Majeure: [Textarea]
Default: "Neither party liable for delays due to circumstances beyond reasonable control including natural disasters, government actions, pandemics, etc."

Confidentiality: [Textarea]
Default: "Both parties agree to keep confidential all non-public information obtained during this agreement."

Dispute Resolution: [Textarea]
Default: "Disputes shall be resolved through negotiation. If unresolved within 30 days, parties agree to mediation before pursuing legal action."

Applicable Law: [Text input]
Default: "Thai law"

Jurisdiction: [Text input]
Default: "Courts of Bangkok, Thailand"
```

#### I. Document Management
```
Contract Documents:
Main Contract: [Upload .pdf or auto-generate]
[Button: Generate Contract PDF]

Appendices:
- Appendix A: Location Details [Upload/Generate]
- Appendix B: Equipment Specifications [Upload/Generate]
- Appendix C: Payment Schedule [Upload/Generate]
- Appendix D: Custom [Upload]

Generate Settings:
- Language: [Radio: Thai | English | Bilingual]
- Template: [Dropdown: Standard | Formal | Minimal]
- Include signatures section: [Checkbox: checked]
- Include company seals section: [Checkbox: checked]
```

#### J. Signatures
```
Provider Signature:
- Signed: [Checkbox]
- Signed By: [Text input]
- Position: [Text input]
- Signature Date: [Date picker]
- Digital Signature: [Upload signature image]
- Witness Name: [Text input]
- Witness Signature: [Upload]

Client Signature:
- Signed: [Checkbox]
- Signed By: [Text input]
- Position: [Text input]
- Signature Date: [Date picker]
- Digital Signature: [Upload signature image]
- Committee Approval: [Upload approval document]
- Company Seal: [Upload seal image]

Signing Method:
[Radio]
- Physical signatures (print, sign, scan)
- Digital signatures (e-signature platform)
- Both (physical + digital)
```

#### K. Form Actions
```
- [Save Draft]
- [Generate Contract PDF]
- [Submit for Internal Approval]
- [Send to Client for Signature]
- [Mark as Fully Executed] (after both parties sign)
- [Cancel]
```

### Validation Rules
1. All party information must be complete
2. Contract dates must be valid (end > start)
3. Both signatures required before marking as executed
4. At least one location must be specified
5. All financial terms must match quotation

### After Submission
- Status workflow:
  - Draft → Internal Review → Sent to Client → Partially Signed → Fully Executed
- Once fully executed:
  - Enables creation of Installation Requests
  - Enables creation of Payment Requests
  - Project status updates to "Contracted"

---

## FORM 4: INSTALLATION REQUEST

**Purpose**: Schedule and coordinate signage installation at project site
**Trigger**: Contract fully executed
**Creates**: Installation record, work order for vendor
**Next Step**: After completion → Signage goes live

### Form Sections

#### A. Request Information
```
Form Header:
- Request ID: [Auto-generated: req-inst-XXX]
- Parent Contract: [Display: req-cont-XXX with link]
- Project Name: [Display from parent]
- Installation Type: [Display: New Installation]
- Submitted By: [Auto-filled]
- Submitted Date: [Auto-filled]
- Status: [Display: Draft]
```

#### B. Signage Selection
```
Signages to Install:
[Table with checkboxes - from project signage list]
| Select | Signage ID | Location | Screen Size | Status | Notes |
|--------|-----------|----------|-------------|---------|-------|
| [x] | sg001 | Ground Floor Lobby | 55" Portrait | Pending | Main entrance |
| [x] | sg002 | Floor 15 Elevator | 55" Portrait | Pending | |
| [x] | sg003 | Floor 20 Co-working | 55" Landscape | Pending | |

Summary:
- Total signages selected: [Display: 3]
- Total installation hours estimated: [Display: 9 hours]
```

#### C. Vendor Selection
```
Installation Vendor:
- Select Vendor: [Dropdown from vendor.json] *Required
  Options loaded from registered vendors with type "installation"

  Selected: Pro Install Co., Ltd.

- Vendor Contact Person: [Auto-filled from vendor]
  Display: คุณสมศักดิ์ ช่างเทพ

- Phone: [Auto-filled]
  Display: 089-123-4567

- Email: [Auto-filled]
  Display: somsak@proinstall.co.th

- Alternative Vendor: [Dropdown]
  Backup option if primary unavailable

Selection Reason: [Textarea]
Example: "Recommended by building management. Prior experience with similar condo projects."

[Button: View Vendor Profile] [Button: Add New Vendor]
```

#### D. Schedule Coordination
```
Preferred Schedule:
- Preferred Date: [Date picker] *Required
  Min: Today + 3 days

- Preferred Time Start: [Time picker] *Required
  Default: 09:00

- Preferred Time End: [Time picker] *Required
  Default: 17:00

- Estimated Duration: [Display: Auto-calculated]
  9 hours total (3 units × 3 hours each)

Alternative Dates:
- Alternative Date 1: [Date picker]
- Alternative Date 2: [Date picker]
- Alternative Date 3: [Date picker]

Scheduling Constraints: [Checkboxes]
[ ] Weekend installation preferred
[ ] Avoid business hours (9am-6pm)
[ ] Must install during building quiet hours
[ ] Staggered installation (one unit per day)
[ ] Must complete all units same day

Special Timing Notes: [Textarea]
Example: "Lobby installation must be after 2pm when lobby is cleaned. Co-working space before 8am."
```

#### E. Site Coordination
```
Building Coordination:
- Coordination Required: [Radio: Yes | No]
  Default: Yes

- Coordinator Name: [Text input] *Required
  Pre-filled from project contact: "คุณสมชาย สมบูรณ์"

- Coordinator Role: [Text input]
  Pre-filled: "Juristic Manager"

- Coordinator Phone: [Text input] *Required
  Pre-filled from project: "081-234-5678"

- Coordinator Email: [Email input]
- Best Contact Time: [Text input]
  Example: "9am-5pm weekdays"

Building Management Notifications:
[Checklist with dates]
[ ] Building management notified: [Date picker]
[ ] Elevator reserved: [Date picker] [Time range]
[ ] Parking arranged: [Number] spaces, [Location]
[ ] Access card provided: [Number] cards
[ ] Safety briefing completed: [Date picker]
[ ] Resident notification posted: [Date picker]

Site Access Details:
- Access Point: [Dropdown]
  Options: Main entrance | Service entrance | Loading dock

- Parking Location: [Text input]
  Example: "Basement Level 2, Service Area"

- Elevator Access: [Radio]
  Options: Passenger elevator | Service elevator | Freight elevator

- Access Restrictions: [Textarea]
  Example: "Service elevator only. Must complete ID registration at security desk."
```

#### F. Installation Details (Per Signage)
```
[Accordion/Tab for each signage]

SIGNAGE sg001 - Ground Floor Lobby:

Location Details:
- Building: [Text input] Default: "Main Building"
- Floor: [Text input] Default: "Ground Floor"
- Zone: [Text input] Default: "Lobby"
- Specific Location: [Textarea]
  Example: "Main wall facing entrance, right side"

- GPS Coordinates: [Optional]
  Latitude: [Number input]
  Longitude: [Number input]

Installation Specifications:
- Installation Type: [Radio] *Required
  Options: Wall mount | Ceiling mount | Floor stand | Custom

- Height from Floor: [Number input] cm
  Default: 180 cm (for portrait), 150 cm (for landscape)

- Viewing Distance: [Number input] meters
  Help: "Typical viewing distance for content optimization"

Power Requirements:
- Power Source: [Radio] *Required
  Options: Existing outlet | New outlet required | Extension from [location]

- If new outlet:
  - Distance from nearest power: [Number input] meters
  - Electrician needed: [Checkbox]

- Power Specifications: [Display]
  220V, 2A (from equipment spec)

Network Setup:
- Network Type: [Radio] *Required
  Options: 4G Pocket WiFi | Building WiFi | Wired ethernet | 5G

- If Building WiFi:
  - SSID: [Text input]
  - Password: [Text input] (secured)
  - Network access approved: [Checkbox]

- If Pocket WiFi:
  - Device ID: [Dropdown from device.json]
  - Network ID: [Dropdown from network.json]
  - SIM card activated: [Checkbox]

Installation Materials Needed:
[Checklist with quantities]
[ ] Wall mount bracket (heavy duty): [Number] sets
[ ] Floor stand: [Number] units
[ ] Cable tray 50x50mm: [Number] meters
[ ] Cable covers: [Number] meters
[ ] Power cable: [Number] meters
[ ] HDMI cable: [Number] meters (length)
[ ] Surge protector: [Number] units
[ ] Screws/anchors/bolts: [Text description]
[ ] Cable ties: [Number] packs
[ ] Other: [Text input]

Special Requirements:
[Textarea]
Example: "Install after lobby cleaning at 2pm. Protect marble floor during installation. Use building-approved mounting method only."

Estimated Installation Time:
[Number input] hours
Default: 3 hours

Photos/References:
- Upload site photos: [File upload - multiple]
- Upload installation diagrams: [File upload]
```

#### G. Cost Estimation
```
Cost Breakdown:
[Dynamic table]
| Category | Item | Quantity | Unit | Unit Price | Total | Actions |
|----------|------|----------|------|------------|-------|---------|
| Labor | Installation labor (2 technicians) | 9 | hours | 1,000 | 9,000 | [Edit] |
| Materials | Wall mount brackets | 3 | sets | 3,500 | 10,500 | [Edit] |
| Materials | Cable tray | 30 | meters | 250 | 7,500 | [Edit] |
| Materials | Electric wire | 45 | meters | 45 | 2,025 | [Edit] |
| Materials | Power outlets | 2 | sets | 800 | 1,600 | [Edit] |
| Materials | HDMI cables | 3 | pcs | 350 | 1,050 | [Edit] |
| Other | Transportation | 1 | job | 1,500 | 1,500 | [Edit] |

[+ Add Cost Item]

Cost Summary:
- Labor Cost: [Display: 9,000.00 THB]
- Materials Cost: [Display: 22,675.00 THB]
- Other Costs: [Display: 1,500.00 THB]
- Subtotal: [Display: 33,175.00 THB]
- VAT (7%): [Display: 2,322.25 THB]
- Total Installation Cost: [Display: 35,497.25 THB]

Quote Reference: [Upload vendor quote]
Quote Valid Until: [Date picker]
```

#### H. Safety & Compliance
```
Safety Requirements:
[Checklist]
[ ] Safety briefing completed with vendor
[ ] Personal protective equipment (PPE) required
[ ] Building safety guidelines provided to vendor
[ ] Emergency contact numbers shared
[ ] Fire safety protocols reviewed
[ ] Electrical safety certification verified
[ ] Insurance certificate verified

Required Permits/Approvals:
[ ] Building management approval obtained
[ ] Electrical work permit (if needed)
[ ] Renovation/modification permit
[ ] After-hours work permit (if applicable)

Upload Documents:
- Safety briefing document: [Upload]
- Vendor insurance certificate: [Upload]
- Electrical certification: [Upload]
- Building approval letter: [Upload]
```

#### I. Acceptance Criteria
```
Installation Completion Checklist:
[Template checklist - will be used during installation]
Hardware:
[ ] All signages physically installed securely
[ ] No visible damage to building/walls
[ ] All cables properly routed and hidden
[ ] Power connections tested and working
[ ] No exposed wires

Software & Network:
[ ] Media players installed and configured
[ ] Network connectivity tested (all units)
[ ] Content management system accessible
[ ] Test content displaying correctly
[ ] Remote access confirmed

Testing:
[ ] Display brightness optimal
[ ] Display orientation correct
[ ] Touch functionality working (if applicable)
[ ] Audio working (if applicable)
[ ] Schedule/dayparting tested
[ ] Graceful handling of network drop

Documentation:
[ ] Installation photos taken (before/during/after)
[ ] Equipment serial numbers recorded
[ ] Network credentials documented
[ ] Juristic manager walkthrough completed
[ ] Acceptance form signed

Clean-up:
[ ] All installation debris removed
[ ] Work area cleaned
[ ] Building property protected/restored
[ ] Tools and extra materials removed

Quality Standards:
- Minimum acceptable display brightness: [Number] cd/m²
- Maximum acceptable pixel defects: [Number]
- Network uptime requirement: [Number]%
- Content load time: < [Number] seconds
```

#### J. Warranty & Support
```
Warranty Terms:
- Installation Warranty: [Number input] months
  Default: 12 months

- Warranty Start Date: [Date picker]
  Default: Installation completion date

- Warranty Coverage: [Textarea]
  Default: "Material and workmanship defects. Free repair/replacement during warranty period."

Post-Installation Support:
- Technical Support Hours: [Text input]
  Default: "9am-6pm, Monday-Friday"

- Emergency Support: [Radio: Available | Not available]
- Emergency Contact: [Text input]

- First Maintenance Visit: [Date picker]
  Default: +30 days from installation

- Training Provided: [Checkbox]
  [ ] Basic operation training (1 hour)
  [ ] Content update training (2 hours)
  [ ] Troubleshooting training (1 hour)

- Training Date: [Date picker]
- Training Attendees: [Text input]
  Example: "Juristic staff (2 persons)"
```

#### K. Notes & Documentation
```
Internal Notes: [Textarea]
For operations team only

Installation Notes (shared with vendor): [Textarea]
Will be included in work order

Client Notes: [Textarea]
Visible to juristic office

Attachments:
- Work order template: [Download template]
- Custom work order: [Upload]
- Site survey photos: [Upload multiple]
- Installation diagrams: [Upload]
- Building regulations: [Upload]

Work Order Generation:
[Button: Generate Work Order PDF]
Settings:
- Language: [Radio: Thai | English]
- Include cost breakdown: [Checkbox]
- Include site photos: [Checkbox]
- Include contact list: [Checkbox]
```

#### L. Form Actions
```
- [Save Draft]
- [Generate Work Order] - Creates PDF for vendor
- [Submit for Approval] - Sends to manager
- [Send to Vendor] - Emails work order to installation vendor
- [Schedule Installation] - Confirms date/time
- [Cancel]
```

### Validation Rules
1. At least one signage must be selected
2. Installation date must be at least 3 days in future
3. All locations must have installation specs
4. Vendor must be selected and approved
5. Building coordinator contact required
6. Total cost must be > 0

### After Submission
- Status workflow:
  - Draft → Submitted → Approved → Scheduled → In Progress → Completed → Accepted
- Work order PDF generated and sent to vendor
- Calendar invite sent to all stakeholders
- On installation day:
  - Technician uploads progress photos
  - Completion checklist filled out
  - Juristic manager signs acceptance
- After acceptance:
  - Installation record created in installation.json
  - Signage status updates to "Active"
  - Go-live date recorded in project

---

## FORM 5: PAYMENT REQUEST

**Purpose**: Request approval to pay vendors and record asset acquisitions
**Trigger**: Contract executed, ready to purchase equipment/services
**Creates**: Payment record, assets in signage.json and device.json
**Next Step**: After payment → Assets recorded in inventory

### Form Sections

#### A. Request Information
```
Form Header:
- Request ID: [Auto-generated: req-pay-XXX]
- Parent Contract: [Display: req-cont-XXX with link]
- Project Name: [Display from parent]
- Payment Type: [Dropdown] *Required
  Options:
  - Equipment Purchase (Signage & Devices)
  - Installation Services
  - Rental Deposit
  - Monthly Rental Payment
  - Network Services
  - Maintenance Services
  - Other

- Payment Purpose: [Text input] *Required
  Example: "Purchase digital signage displays and media players for prj001"

- Submitted By: [Auto-filled]
- Submitted Date: [Auto-filled]
- Status: [Display: Draft]
- Priority: [Dropdown: Normal | High | Urgent]
```

#### B. Vendor Payment Details
```
Payee Information:
- Vendor Name: [Dropdown from vendor.json] *Required
  Options: Registered vendors + "Add new vendor"

Selected Vendor Details (Auto-filled):
- Vendor ID: [Display: vend001]
- Contact Person: [Display]
- Phone: [Display]
- Email: [Display]

Banking Information (Auto-filled from vendor):
- Bank Name: [Display: Bangkok Bank]
- Account Number: [Display: 123-4-56789-0]
- Account Name: [Display: Digital Display Co., Ltd.]
- Branch: [Display: Sukhumvit Branch]

Tax Information (Auto-filled):
- Tax ID: [Display: 0123456789012]
- VAT Registered: [Display: Yes]
- Withholding Tax Applicable: [Display: Yes]
- WHT Rate: [Display: 3%]

[Button: View Vendor Profile] [Button: Edit Vendor Info]
```

#### C. Purchase Items
```
Items to Purchase:
[Dynamic table with Add/Remove]

For Payment Type: "Equipment Purchase":

| Item Type | Description | Qty | Unit Price | Total | Record Asset | Actions |
|-----------|-------------|-----|------------|-------|--------------|---------|
| Signage | 55" Samsung QM55B | 1 | 25,000 | 25,000 | [Button: Record] | [Edit][Delete] |
| Device | Raspberry Pi 4B Kit | 1 | 3,500 | 3,500 | [Button: Record] | [Edit][Delete] |
| Device | 4G Pocket WiFi | 1 | 2,990 | 2,990 | [Button: Record] | [Edit][Delete] |

[+ Add Item]

Quick Add from Quotation:
[Button: Import from Quotation] - Loads all items from approved quotation
```

#### D. Asset Recording (for Equipment Purchases)

**When user clicks [Record Asset] button:**

```
=== MODAL: Record Signage Asset ===

Item Details:
- Description: [Display: 55" Samsung QM55B Portrait Display]
- Quantity to record: [Number input] (max: item quantity)
- Unit cost: [Display: 25,000.00 THB]

For each unit, create signage record:

UNIT 1 of 1:

Signage Information:
- Signage ID: [Auto-generated: sg001] (editable)
- Project ID: [Display: prj001]
- Payment Request ID: [Display: req-pay-XXX]

Hardware Specifications:
- Screen Size (inch): [Number input] *Required
  Default from item: 55

- Resolution: [Dropdown] *Required
  Options: 1920x1080 | 3840x2160 | Other
  Default: 1920x1080

- Orientation: [Radio] *Required
  Options: Portrait | Landscape
  Default: Portrait

- Brand: [Text input] *Required
  Default from item: Samsung

- Model: [Text input] *Required
  Default from item: QM55B

- Serial Number: [Text input] *Required
  Help: "Enter serial number from device"
  Placeholder: "SN-XXX-XXXXXX"

Procurement Details:
- Vendor Name: [Display: Auto-filled from vendor]
- Vendor Contact: [Display: Auto-filled]
- Acquired Date: [Date picker] *Required
  Default: Today

- Cost: [Display: 25,000.00 THB]
- Currency: [Display: THB]

Warranty:
- Warranty Period: [Number input] months *Required
  Default: 24

- Warranty Expiry Date: [Display: Auto-calculated]
  Formula: Acquired Date + Warranty Period

Deployment (Optional - can set later):
- Installation ID: [Dropdown from installations]
- Location Building: [Text input]
- Location Floor: [Text input]
- Location Zone: [Text input]
- Location Details: [Textarea]

Status:
- Current Status: [Dropdown]
  Options: In stock | In transit | Ready for installation | Active | Maintenance
  Default: In stock

- Go Live Date: [Date picker]
  Only if status = Active

Associated Devices:
- Device ID (Media Player): [Dropdown from devices]
  Optional - can link later

- Network ID: [Dropdown from networks]
  Optional - can link later

Notes:
[Textarea]
Example: "Main lobby signage unit"

[Button: Save Signage Record]
[Button: Save & Add Another Unit]
[Button: Cancel]

=== END MODAL ===
```

```
=== MODAL: Record Device Asset ===

Item Details:
- Description: [Display: Raspberry Pi 4B 4GB Kit]
- Quantity to record: [Number input] (max: item quantity)
- Unit cost: [Display: 3,500.00 THB]

For each unit, create device record:

UNIT 1 of 1:

Device Information:
- Device ID: [Auto-generated: dev001] (editable)
- Project ID: [Display: prj001]
- Payment Request ID: [Display: req-pay-XXX]

Device Specifications:
- Device Type: [Dropdown] *Required
  Options:
  - Raspberry Pi
  - WiFi Router
  - Pocket WiFi
  - Media Player (other)
  - Network Switch
  - Cables/Accessories
  - Other

- Brand: [Text input] *Required
  Default from item: Raspberry Pi Foundation

- Model: [Text input] *Required
  Default from item: Raspberry Pi 4 Model B

- Technical Specifications: [Key-value pairs]
  [+ Add Specification]
  - RAM: [4GB]
  - Storage: [64GB MicroSD]
  - OS: [Raspberry Pi OS Lite]

- Serial Number: [Text input] *Required
  Placeholder: "RPI4B-XXXXXXXXX"

- MAC Address: [Text input]
  Format: XX:XX:XX:XX:XX:XX
  Help: "For network devices"

Procurement Details:
- Vendor Name: [Display: Auto-filled]
- Vendor Contact: [Display: Auto-filled]
- Acquired Date: [Date picker] *Required
  Default: Today

- Cost: [Display: 3,500.00 THB]
- Currency: [Display: THB]

Warranty:
- Warranty Period: [Number input] months *Required
  Default: 12

- Warranty Expiry Date: [Display: Auto-calculated]

Assignment (Optional - can set later):
- Assigned to Signage ID: [Dropdown from signage.json]
- Installation Date: [Date picker]
- Last Update Date: [Date picker]

Status:
- Current Status: [Dropdown]
  Options: In stock | In transit | Active | Faulty | Retired
  Default: In stock

Notes:
[Textarea]
Example: "Primary media player for sg001"

[Button: Save Device Record]
[Button: Save & Add Another Unit]
[Button: Cancel]

=== END MODAL ===
```

**After Recording Assets:**
```
Items with Recorded Assets:
| Item | Qty | Assets Recorded | Status | Actions |
|------|-----|----------------|--------|---------|
| 55" Samsung Display | 1 | 1 signage (sg001) | ✓ Complete | [View][Edit] |
| Raspberry Pi Kit | 1 | 1 device (dev001) | ✓ Complete | [View][Edit] |
| 4G Pocket WiFi | 1 | 1 device (dev002) | ✓ Complete | [View][Edit] |

Assets Summary:
- Total Signages Created: 1 (sg001)
- Total Devices Created: 2 (dev001, dev002)
- All assets recorded: ✓ Yes
```

#### E. Cost Breakdown
```
Cost Calculation:
[Auto-calculated from items table]

Line Items:
- Item 1: 55" Samsung Display × 1 = 25,000.00 THB
- Item 2: Raspberry Pi Kit × 1 = 3,500.00 THB
- Item 3: 4G Pocket WiFi × 1 = 2,990.00 THB

Subtotal: [Display: 31,490.00 THB]

Tax & Deductions:
- VAT (7%): [Checkbox: Included in total | Added to total | Not applicable]
  If checked: [Display: 2,204.30 THB]

- Withholding Tax (3%): [Checkbox: Applicable]
  If checked: [Display: -944.70 THB]
  Note: Deducted from payment to vendor

- Other Deductions: [Number input]
  Description: [Text input]

Cost Summary:
- Subtotal: 31,490.00 THB
- VAT (+7%): 2,204.30 THB
- Total before WHT: 33,694.30 THB
- Withholding Tax (-3%): -944.70 THB
- **Total Payment Amount: 32,749.60 THB**

Payment Distribution:
- To Vendor: 32,749.60 THB
- To Revenue Department (WHT): 944.70 THB (via PND form)

[Display currency clearly in all amounts]
```

#### F. Invoice & Documentation
```
Invoice Information:
- Invoice Number: [Text input] *Required
  Example: INV-2024-001

- Invoice Date: [Date picker] *Required
- Invoice Amount: [Number input] *Required
  Should match: Total before WHT

- Tax Invoice Received: [Radio: Yes | No | Pending] *Required

- Receipt Required: [Radio: Yes | No]

Upload Documents:
- Invoice (PDF): [File upload] *Required
  Accept: .pdf
  Max size: 5MB

- Tax Invoice (if separate): [File upload]
- Delivery Note/Packing List: [File upload]
- Purchase Order: [File upload]
- Other documents: [File upload - multiple]

Document Checklist:
[ ] Invoice matches quotation
[ ] Amounts correct
[ ] Tax ID verified
[ ] VAT breakdown shown
[ ] Payment terms stated
[ ] Authorized signature present
```

#### G. Payment Schedule & Terms
```
Payment Terms:
- Payment Due Date: [Date picker] *Required
  Help: "Date when payment must be made"

- Payment Method: [Dropdown] *Required
  Options:
  - Bank transfer
  - Cheque
  - Cash
  - Company credit card
  - Other

- Payment Terms: [Dropdown]
  Options:
  - Immediate
  - Net 7 days
  - Net 15 days
  - Net 30 days
  - 50% advance, 50% on delivery
  - Custom: [Text input]

If Milestone-Based Payment:
- Milestone: [Dropdown]
  Options from contract payment schedule:
  - Contract signing (50%)
  - Installation complete (50%)

- Milestone Status: [Radio]
  - Milestone achieved
  - Milestone in progress
  - Milestone pending

- Milestone Evidence: [File upload]
  Example: Signed installation acceptance form

Early Payment Discount:
- Discount Available: [Radio: Yes | No]
- If yes, discount %: [Number input]
- If yes, valid until: [Date picker]

Late Payment Penalty:
- Penalty Rate: [Display: 1.5% per month] (from contract)
- Grace Period: [Display: 5 days] (from contract)
```

#### H. Payment Tracking
```
Payment Status:
- Current Status: [Dropdown]
  Options:
  - Draft (being prepared)
  - Pending approval
  - Approved (ready to pay)
  - Payment scheduled
  - Payment in progress
  - Paid
  - Cancelled

Payment Execution (Finance team fills after approval):
- Paid By: [Text input]
  Example: "finance@company.com"

- Payment Date: [Date picker]
  Date when payment was made

- Payment Reference Number: [Text input]
  Bank transaction reference

- Payment Slip: [File upload]
  Upload bank transfer slip or payment proof

Confirmation:
- Vendor Acknowledged: [Radio: Yes | No | Pending]
- Acknowledgment Date: [Date picker]
- Receipt Received: [Radio: Yes | No | Pending]
- Receipt File: [File upload]
```

#### I. Approval Chain
```
Approval Workflow:
[Dynamic based on payment amount]

For payments < 50,000 THB:
1. Project Manager → [Pending/Approved/Rejected]
2. Finance Manager → [Pending/Approved/Rejected]

For payments 50,000-200,000 THB:
1. Project Manager → [Pending/Approved/Rejected]
2. Finance Manager → [Pending/Approved/Rejected]
3. Operations Director → [Pending/Approved/Rejected]

For payments > 200,000 THB:
1. Project Manager → [Pending/Approved/Rejected]
2. Finance Manager → [Pending/Approved/Rejected]
3. Operations Director → [Pending/Approved/Rejected]
4. Managing Director → [Pending/Approved/Rejected]

Approval History:
| Approver | Role | Status | Date | Comments |
|----------|------|--------|------|----------|
| john.doe@ | Project Mgr | Approved | 2024-01-22 10:00 | Equipment verified |
| jane.finance@ | Finance Mgr | Approved | 2024-01-23 11:30 | Budget available |
| director@ | Director | Pending | - | - |

Current Approver: [Display: director@company.com]
[Button: Send Reminder Email]

Approver Actions (visible only to current approver):
Comments: [Textarea]
[Button: Approve] [Button: Request Changes] [Button: Reject]
```

#### J. Budget Tracking
```
Budget Information:
- Project ID: [Display: prj001]
- Project Name: [Display: The Sukhumvit Residence]

Budget Allocation:
- Total Project Budget: [Display: 200,000.00 THB]
  From: Project request initial budget

- Total Committed: [Display: 120,000.00 THB]
  Sum of all approved payment requests

- This Payment: [Display: 32,749.60 THB]

- Remaining Budget: [Display: 47,250.40 THB]
  Formula: Total - Committed - This Payment

Budget Category:
[Dropdown]
- Equipment/Hardware
- Installation
- Network Services
- Maintenance
- Rental/Lease
- Other

Budget Status:
[Visual indicator]
- If remaining > 20%: ✓ Within budget (green)
- If remaining 10-20%: ⚠ Approaching limit (yellow)
- If remaining < 10%: ⚠ Budget critical (orange)
- If remaining < 0: ✖ Over budget (red)

If over budget:
[Alert: "This payment exceeds available project budget. Director approval required."]
```

#### K. Project Cost Update
```
Update Project Costs:
After payment is marked as "Paid", automatically update project.json:

Project Cost Categories Updated:
[ ] Signage Cost: +25,000.00 THB
[ ] Device Cost: +6,490.00 THB
[ ] Total Investment: +32,749.60 THB

Assets Linked to Project:
[ ] Signage IDs added to project: [sg001]
[ ] Device IDs added to project: [dev001, dev002]

Status Update:
- Project deployment status updated based on payment type
  Example: Equipment purchased → Status: "Equipment acquired"
```

#### L. Notes & Attachments
```
Internal Notes: [Textarea]
For finance and operations team
Example: "Urgent payment. Vendor requires payment before delivery. Equipment needed by Jan 25 for scheduled installation."

Vendor Communication Notes: [Textarea]
Communication with vendor
Example: "Vendor confirmed delivery 2 days after payment. Contact Mr. Somchai for delivery coordination."

Accounting Notes: [Textarea]
For accounting department
Example: "Charge to project account PRJ001. Asset depreciation over 5 years."

Attachments:
- Payment approval memo: [Upload]
- Director approval (if required): [Upload]
- Additional supporting docs: [Upload multiple]
```

#### M. Related Records
```
Links to Other Records:
- Parent Contract: [Link: req-cont-001]
- Related Quotation: [Link: req-quot-001]
- Related Installation: [Link: req-inst-001]

Assets Created from This Payment:
- Signages: [Link: sg001]
- Devices: [Link: dev001] [Link: dev002]

Project Impact:
- Project: [Link: prj001 - The Sukhumvit Residence]
- Project cost updated: ✓ Yes
- Assets added to project: ✓ Yes
```

#### N. Form Actions
```
Draft Stage:
- [Save Draft] - Save without submitting
- [Preview] - Preview payment summary
- [Cancel] - Discard payment request

Submission Stage:
- [Submit for Approval] - Start approval workflow
  Validation: Ensure all required fields filled, assets recorded (if equipment purchase)

Approval Stage (Approver only):
- [Approve] - Approve and pass to next approver
- [Request Changes] - Send back to requester with comments
- [Reject] - Reject payment request with reason

Finance Stage (After all approvals):
- [Schedule Payment] - Add to payment queue
- [Mark as Paid] - Record payment completion
  Required: Payment date, reference number, payment slip

Post-Payment:
- [Download Payment Summary] - PDF report
- [Download WHT Form] - For tax filing
- [Resend Receipt Request] - Email vendor for receipt
```

### Validation Rules
1. Payment amount must be > 0
2. At least one item must be in the purchase list
3. Invoice information required
4. For equipment purchases, all assets must be recorded before submission
5. Payment due date must be in valid range
6. Approval chain must be complete before marking as paid
7. Payment slip required before marking as paid

### After Submission
- Status workflow:
  - Draft → Submitted → Approval Level 1 → Approval Level 2 → ... → All Approved → Scheduled → Paid → Closed

- Email notifications:
  - To approvers when approval needed
  - To requester when approved/rejected
  - To finance when ready for payment
  - To vendor when payment made

- Data updates:
  - Assets (signage.json, device.json) created/updated
  - Project costs (project.json) updated
  - Project asset lists updated
  - Vendor payment history updated

- Documents generated:
  - Payment summary PDF
  - WHT (withholding tax) form
  - Asset registration certificates

---

## Summary: Complete Workflow

```
1. PROJECT REQUEST
   Created by: Sales/BD
   Outcome: Opportunity captured, project created
   ↓ Approved by Manager

2. QUOTATION REQUEST
   Created by: Sales
   Outcome: Formal quotation with costs
   ↓ Accepted by Client

3. CONTRACT REQUEST
   Created by: Sales/Legal
   Outcome: Binding agreement signed
   ↓ Fully Executed

4. PAYMENT REQUEST (Equipment)        4. INSTALLATION REQUEST
   Created by: Procurement                Created by: Operations
   Outcome: Equipment purchased           Outcome: Installation scheduled
   Assets recorded in system              ↓ Installed & Accepted
   ↓ Paid

5. PROJECT GOES LIVE
   Status: Active
   All assets deployed
   Cost tracking complete
```

---

## Form Design Principles

### UI/UX Best Practices:
1. **Progressive Disclosure**: Show basic fields first, advanced in collapsible sections
2. **Smart Defaults**: Pre-fill from parent requests when possible
3. **Real-time Validation**: Validate as user types, clear error messages
4. **Auto-save**: Draft auto-saves every 30 seconds
5. **Mobile Responsive**: Forms usable on tablets for site visits
6. **Keyboard Shortcuts**: Power users can navigate without mouse
7. **File Previews**: Show uploaded images inline
8. **Contextual Help**: Tooltips and help text for complex fields
9. **Progress Indicators**: Show completion % for long forms
10. **Confirmation Modals**: Prevent accidental deletions/cancellations

### Accessibility:
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Clear focus indicators
- Error announcements

### Performance:
- Lazy load heavy sections
- Debounce auto-save
- Compress uploaded images
- Pagination for long lists
- Cache dropdown options

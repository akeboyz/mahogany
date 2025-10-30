# CTA Pop-up Design Conversation

## Date: 2025-01-25

## Context
Discussion about implementing pop-ups for Condo Unit CTAs in product.html page.

## Current CTA Buttons in product.html
For condo units, we have identified 3 main CTAs:
1. **"Appoint Viewing"**
2. **"Contact Agent"**
3. **"View Floor Plan"**

## Proposed Pop-up Designs

### 1. "Appoint Viewing" Pop-up
```
📅 Schedule Unit Viewing

Unit: A108 - 4 Bedroom (90 sqm)
Building: A, Floor 12

Preferred Date & Time:
[Date Picker] [Time Dropdown]

Contact Information:
Full Name: [Text Input]
Phone: [Text Input]
Email: [Text Input]
Line ID: [Text Input] (optional)

Preferred Language:
○ Thai  ○ English

Special Requests:
[Text Area - "Any specific questions or requirements?"]

[Schedule Viewing] [Cancel]
```

### 2. "Contact Agent" Pop-up
```
👤 Contact Sales Agent

Unit: A108 - The Sukhumvit Residence
Price: ฿5,000,000

Agent: Sarah Wilson
📞 +66 2 xxx-xxxx
📧 sarah@company.com
💬 Line: @sarahproperty

Quick Contact Form:
Your Name: [Text Input]
Phone: [Text Input]
Message: [Text Area with placeholder: "I'm interested in unit A108..."]

Preferred Contact Method:
○ Phone Call  ○ WhatsApp  ○ Line  ○ Email

[Send Message] [Call Now] [Cancel]
```

### 3. "View Floor Plan" Pop-up
```
📐 Unit Floor Plan

Unit A108 - 4 Bedroom Layout
Floor 12, Building A

[Large Floor Plan Image with zoom controls]
[+ Zoom In] [- Zoom Out] [Reset View]

Room Details:
• Living Room: 25 sqm
• Master Bedroom: 18 sqm
• Bedroom 2: 12 sqm
• Bedroom 3: 12 sqm
• Bedroom 4: 10 sqm
• Kitchen: 8 sqm
• Bathrooms: 3 units

[Download PDF] [Print] [Share] [Close]
```

## Technical Implementation Notes
- Pop-ups should be modal overlays
- Mobile-responsive design
- Form validation for required fields
- Integration with existing project data structure
- Thai/English language support

## Related Files
- `public/product.html` - Main product page
- `public/project/ann/data/unit.json` - Unit data structure
- `public/project/ann/data/project.json` - Project information including logos

## Previous Fixes Applied
1. Fixed header to show condo name and logo for units
2. Added proper spacing to "Back to dining" button
3. Changed signage.html to index.html for Yodeck compatibility
4. Removed broken yodeck-restructured references
5. Fixed menu navigation from signage player

## Status
- Pop-up designs proposed ✅
- Implementation pending user approval
- Ready for development phase

---
*Generated: 2025-01-25*
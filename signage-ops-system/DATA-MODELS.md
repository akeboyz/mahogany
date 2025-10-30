# Digital Signage Operations System - Data Models

## Overview
Complete data models for managing digital signage operations in condominium projects, including audit trails and cost tracking.

---

## 1. PROJECT.JSON (Enhanced)

Combines existing project data with signage operations tracking.

```json
{
  "projects": [
    {
      // === EXISTING FIELDS (Keep all current fields) ===
      "project_id": "prj001",
      "project_name": "The Sukhumvit Residence",
      "project_logo": "medias/prj001_logo.png",
      "pm_id": "pm002",
      "background_color": "#0070b8",
      "project_address": "Sukhumvit 23, Bangkok, Thailand",
      "developer_name": "XYZ Developer Co., Ltd.",
      "completion_period": "Jan-2016",
      "facility_list": ["Swimming Pool", "Fitness", "Sauna", "24h Security", "Parking"],
      "total_units": 200,
      "total_building": 1,
      "total_floor": 25,
      "total_parking": 150,
      "map_url": "https://maps.app.goo.gl/F5ZhuVD2xkCDHT7P9",
      "map_embed_url": "...",
      "latitude": 13.738026,
      "longitude": 100.564151,
      "project_image": "medias/cover.png",
      "main_menu_video": "videos/main_menu.mp4",
      "juristic_update_video": "medias/juristic_update.mp4",
      "contact_person": {
        "name": "คุณสมชาย สมบูรณ์",
        "role": "Juristic Manager",
        "phone": "081-234-5678",
        "email": "somchai@juristic.com",
        "line": "@sukhumvitresidence"
      },
      "project_status": "active",
      "project_type": "condominium",
      "project_detail_json": "project/prj001.json",

      // === NEW SIGNAGE OPERATIONS FIELDS ===
      "signage_operations": {
        // Request tracking
        "project_request_id": "req-prj-001",
        "quotation_request_id": "req-quot-001",
        "contract_request_id": "req-cont-001",
        "installation_request_ids": ["req-inst-001", "req-inst-002"],
        "payment_request_ids": ["req-pay-001", "req-pay-002", "req-pay-003"],

        // Asset references
        "signage_ids": ["sg001", "sg002", "sg003"],
        "device_ids": ["dev001", "dev002", "dev003", "dev004", "dev005"],
        "network_ids": ["net001", "net002"],
        "installation_ids": ["inst001", "inst002"],

        // Cost tracking
        "costs": {
          "signage_cost": 75000.00,
          "device_cost": 25000.00,
          "network_cost_monthly": 1198.00,
          "network_cost_total": 14376.00,
          "installation_cost": 45000.00,
          "maintenance_cost_total": 5000.00,
          "other_costs": 10000.00,
          "total_investment": 174376.00,
          "currency": "THB"
        },

        // Contract details
        "contract": {
          "rental_fee_monthly": 5000.00,
          "rental_start_date": "2024-01-01",
          "rental_end_date": "2025-12-31",
          "contract_period_months": 24,
          "revenue_share_percentage": 0,
          "deposit_amount": 10000.00
        },

        // Status tracking
        "deployment_status": "active", // planning | quotation | contracted | installing | active | maintenance | inactive
        "go_live_date": "2024-02-01",
        "last_maintenance_date": "2024-09-15",
        "next_maintenance_date": "2025-03-15"
      },

      // === AUDIT FIELDS ===
      "created_by": "john.doe@company.com",
      "created_date": "2024-01-15T10:30:00Z",
      "updated_by": "jane.smith@company.com",
      "updated_date": "2024-10-18T14:45:00Z"
    }
  ]
}
```

---

## 2. SIGNAGE.JSON

Records of all digital signage hardware deployed.

```json
{
  "signages": [
    {
      "signage_id": "sg001",
      "project_id": "prj001",
      "payment_request_id": "req-pay-001",

      // Hardware specifications
      "screen_size_inch": 55,
      "resolution": "1920x1080",
      "orientation": "portrait",
      "brand": "Samsung",
      "model": "QM55B",
      "serial_number": "SN-SG001-123456",

      // Procurement details
      "vendor_name": "Digital Display Co., Ltd.",
      "vendor_contact": "02-123-4567",
      "acquired_date": "2024-01-20",
      "cost": 25000.00,
      "currency": "THB",
      "warranty_period_months": 24,
      "warranty_expiry": "2026-01-20",

      // Deployment details
      "installation_id": "inst001",
      "location_building": "Main Building",
      "location_floor": "Ground Floor",
      "location_zone": "Lobby",
      "location_details": "Near elevators",

      // Status
      "status": "active", // active | inactive | maintenance | faulty | retired
      "go_live_date": "2024-02-01",
      "last_health_check": "2024-10-18T08:00:00Z",

      // Associated devices
      "device_id": "dev001", // Primary device (Raspberry Pi)
      "network_id": "net001",

      // Notes
      "notes": "Main lobby signage, high traffic area",

      // Audit fields
      "created_by": "john.doe@company.com",
      "created_date": "2024-01-20T15:30:00Z",
      "updated_by": "tech.support@company.com",
      "updated_date": "2024-10-18T08:15:00Z"
    }
  ]
}
```

---

## 3. DEVICE.JSON

Records of supporting devices (Raspberry Pi, routers, pocket WiFi).

```json
{
  "devices": [
    {
      "device_id": "dev001",
      "project_id": "prj001",
      "signage_id": "sg001",
      "payment_request_id": "req-pay-001",

      // Device specifications
      "device_type": "raspberry_pi", // raspberry_pi | wifi_router | pocket_wifi | other
      "brand": "Raspberry Pi Foundation",
      "model": "Raspberry Pi 4 Model B",
      "specifications": {
        "ram": "4GB",
        "storage": "64GB MicroSD",
        "os": "Raspberry Pi OS Lite"
      },
      "serial_number": "RPI4B-123456789",
      "mac_address": "DC:A6:32:12:34:56",

      // Procurement details
      "vendor_name": "RaspberryPi Thailand",
      "vendor_contact": "02-234-5678",
      "acquired_date": "2024-01-20",
      "cost": 3500.00,
      "currency": "THB",
      "warranty_period_months": 12,
      "warranty_expiry": "2025-01-20",

      // Status
      "status": "active", // active | inactive | faulty | retired
      "installation_date": "2024-01-25",
      "last_update_date": "2024-10-10T12:00:00Z",

      // Notes
      "notes": "Primary media player for sg001",

      // Audit fields
      "created_by": "john.doe@company.com",
      "created_date": "2024-01-20T15:35:00Z",
      "updated_by": "tech.support@company.com",
      "updated_date": "2024-10-10T12:30:00Z"
    },
    {
      "device_id": "dev002",
      "project_id": "prj001",
      "signage_id": "sg001",
      "payment_request_id": "req-pay-002",

      "device_type": "pocket_wifi",
      "brand": "True",
      "model": "True 4G Pocket WiFi Pro",
      "specifications": {
        "4g_bands": "LTE Band 1/3/8",
        "max_speed": "150Mbps",
        "battery": "3000mAh"
      },
      "serial_number": "TRUE-PW-789456",
      "mac_address": "AA:BB:CC:DD:EE:01",

      "vendor_name": "True Shop",
      "vendor_contact": "02-345-6789",
      "acquired_date": "2024-01-22",
      "cost": 2990.00,
      "currency": "THB",
      "warranty_period_months": 12,
      "warranty_expiry": "2025-01-22",

      "status": "active",
      "installation_date": "2024-01-25",
      "last_update_date": "2024-10-15T10:00:00Z",

      "notes": "4G connection for sg001",

      "created_by": "john.doe@company.com",
      "created_date": "2024-01-22T11:20:00Z",
      "updated_by": "network.admin@company.com",
      "updated_date": "2024-10-15T10:15:00Z"
    }
  ]
}
```

---

## 4. NETWORK.JSON

Records of network connections and SIM cards.

```json
{
  "networks": [
    {
      "network_id": "net001",
      "project_id": "prj001",
      "signage_id": "sg001",
      "device_id": "dev002", // Pocket WiFi device

      // Provider details
      "provider": "True", // AIS | True | DTAC | other
      "provider_contact": "1331",
      "phone_number": "081-234-5678",
      "sim_serial": "89660123456789012345",

      // Plan details
      "plan_type": "postpaid", // postpaid | prepaid
      "plan_name": "True Business Unlimited 100Mbps",
      "speed_mbps": 100,
      "data_limit_gb": null, // null for unlimited
      "monthly_cost": 599.00,
      "currency": "THB",

      // Service period
      "start_date": "2024-01-25",
      "expiry_date": null, // null for postpaid
      "contract_period_months": 24,
      "contract_end_date": "2026-01-24",
      "auto_renew": true,

      // Status
      "status": "active", // active | expiring_soon | expired | suspended | cancelled
      "last_payment_date": "2024-10-01",
      "next_payment_date": "2024-11-01",

      // Usage tracking (optional)
      "usage_tracking": {
        "last_check_date": "2024-10-18",
        "data_used_gb": 45.2,
        "average_speed_mbps": 85
      },

      // Notes
      "notes": "Primary internet connection for sg001",

      // Audit fields
      "created_by": "network.admin@company.com",
      "created_date": "2024-01-25T09:00:00Z",
      "updated_by": "network.admin@company.com",
      "updated_date": "2024-10-18T08:00:00Z"
    }
  ]
}
```

---

## 5. INSTALLATION.JSON

Records of signage installation work.

```json
{
  "installations": [
    {
      "installation_id": "inst001",
      "project_id": "prj001",
      "signage_id": "sg001",
      "installation_request_id": "req-inst-001",

      // Vendor details
      "vendor_name": "Pro Install Co., Ltd.",
      "vendor_contact": "02-456-7890",
      "vendor_contact_person": "คุณสมศักดิ์ ช่างเทพ",
      "vendor_phone": "089-123-4567",

      // Schedule
      "scheduled_date": "2024-01-25",
      "scheduled_time_start": "09:00",
      "scheduled_time_end": "17:00",
      "actual_start_datetime": "2024-01-25T09:15:00Z",
      "actual_completion_datetime": "2024-01-25T16:30:00Z",

      // Installation details
      "installation_type": "new_installation", // new_installation | relocation | replacement | maintenance
      "location": {
        "building": "Main Building",
        "floor": "Ground Floor",
        "zone": "Lobby",
        "coordinates": "13.738026,100.564151"
      },

      // Items and costs
      "items_included": [
        {
          "item_id": "item001",
          "item_type": "labor",
          "description": "Installation labor (2 technicians)",
          "quantity": 1,
          "unit": "job",
          "unit_price": 8000.00,
          "total_price": 8000.00
        },
        {
          "item_id": "item002",
          "item_type": "material",
          "description": "Wall mount bracket (heavy duty)",
          "quantity": 1,
          "unit": "set",
          "unit_price": 3500.00,
          "total_price": 3500.00
        },
        {
          "item_id": "item003",
          "item_type": "material",
          "description": "Cable tray 50x50mm",
          "quantity": 10,
          "unit": "meters",
          "unit_price": 250.00,
          "total_price": 2500.00
        },
        {
          "item_id": "item004",
          "item_type": "material",
          "description": "Electric wire 2x2.5mm",
          "quantity": 15,
          "unit": "meters",
          "unit_price": 45.00,
          "total_price": 675.00
        },
        {
          "item_id": "item005",
          "item_type": "material",
          "description": "Power outlet with surge protector",
          "quantity": 1,
          "unit": "set",
          "unit_price": 800.00,
          "total_price": 800.00
        },
        {
          "item_id": "item006",
          "item_type": "material",
          "description": "HDMI cable 5m",
          "quantity": 1,
          "unit": "pcs",
          "unit_price": 350.00,
          "total_price": 350.00
        }
      ],

      // Cost summary
      "cost_summary": {
        "labor_cost": 8000.00,
        "material_cost": 7825.00,
        "subtotal": 15825.00,
        "vat_percentage": 7,
        "vat_amount": 1107.75,
        "total_cost": 16932.75,
        "currency": "THB"
      },

      // Warranty
      "warranty_period_months": 12,
      "warranty_start_date": "2024-01-25",
      "warranty_expiry_date": "2025-01-25",
      "warranty_coverage": "Material and workmanship defects",

      // Documentation
      "photos": [
        "installations/inst001/before_001.jpg",
        "installations/inst001/before_002.jpg",
        "installations/inst001/during_001.jpg",
        "installations/inst001/during_002.jpg",
        "installations/inst001/after_001.jpg",
        "installations/inst001/after_002.jpg"
      ],
      "documents": [
        "installations/inst001/work_order.pdf",
        "installations/inst001/completion_certificate.pdf",
        "installations/inst001/warranty_card.pdf"
      ],

      // Status
      "status": "completed", // scheduled | in_progress | completed | cancelled | on_hold
      "completion_notes": "Installation completed successfully. All systems tested and operational.",
      "juristic_approval": {
        "approved_by": "คุณสมชาย สมบูรณ์",
        "approved_date": "2024-01-25T16:45:00Z",
        "signature": "installations/inst001/approval_signature.jpg"
      },

      // Notes
      "notes": "Coordinated with juristic office. Building manager present during installation.",

      // Audit fields
      "created_by": "project.manager@company.com",
      "created_date": "2024-01-20T14:00:00Z",
      "updated_by": "installation.supervisor@company.com",
      "updated_date": "2024-01-25T17:00:00Z"
    }
  ]
}
```

---

## 6. REQUEST.JSON (All Request Types)

Central repository for all request types in the workflow.

```json
{
  "requests": [
    {
      // Common fields for all request types
      "request_id": "req-prj-001",
      "request_type": "project_request", // project_request | quotation_request | contract_request | installation_request | payment_request
      "project_id": "prj001",
      "status": "approved", // draft | submitted | under_review | approved | rejected | cancelled | completed
      "priority": "normal", // low | normal | high | urgent

      // Workflow tracking
      "submitted_by": "sales.team@company.com",
      "submitted_date": "2024-01-10T10:00:00Z",
      "reviewed_by": "manager@company.com",
      "reviewed_date": "2024-01-12T15:30:00Z",
      "approved_by": "director@company.com",
      "approved_date": "2024-01-15T11:00:00Z",

      // Request-specific data (varies by type)
      "request_data": {
        // See specific request types below
      },

      // Attachments
      "attachments": [
        "requests/req-prj-001/proposal.pdf",
        "requests/req-prj-001/site_photos.zip"
      ],

      // Comments/Notes
      "comments": [
        {
          "comment_id": "cmt001",
          "user": "manager@company.com",
          "date": "2024-01-12T15:30:00Z",
          "text": "Good opportunity. Please proceed with quotation."
        }
      ],

      // Audit fields
      "created_by": "sales.team@company.com",
      "created_date": "2024-01-10T09:00:00Z",
      "updated_by": "director@company.com",
      "updated_date": "2024-01-15T11:00:00Z"
    }
  ]
}
```

### Request Types Detailed Structure:

#### A. PROJECT REQUEST (req-prj-XXX)
```json
"request_data": {
  "project_name": "The Sukhumvit Residence",
  "project_type": "condominium",
  "project_address": "Sukhumvit 23, Bangkok, Thailand",
  "juristic_contact": {
    "name": "คุณสมชาย สมบูรณ์",
    "role": "Juristic Manager",
    "phone": "081-234-5678",
    "email": "somchai@juristic.com",
    "line": "@sukhumvitresidence"
  },
  "building_info": {
    "total_units": 200,
    "total_buildings": 1,
    "total_floors": 25,
    "completion_year": 2016
  },
  "signage_requirements": {
    "number_of_signages": 3,
    "preferred_locations": ["Lobby", "Elevator Hall Floor 15", "Co-working Space"],
    "purpose": "Property marketing and juristic announcements",
    "content_types": ["Property listings", "Facility bookings", "Juristic updates"]
  },
  "estimated_budget": 200000.00,
  "desired_go_live_date": "2024-03-01",
  "opportunity_source": "Cold call", // Cold call | Referral | Website inquiry | Event
  "notes": "Juristic manager very interested. Ready to proceed quickly."
}
```

#### B. QUOTATION REQUEST (req-quot-XXX)
```json
"request_data": {
  "parent_request_id": "req-prj-001",
  "quotation_number": "QUOT-2024-001",
  "valid_until": "2024-02-15",

  "space_rental": {
    "monthly_rental_fee": 5000.00,
    "rental_period_months": 24,
    "deposit_amount": 10000.00,
    "deposit_refundable": true,
    "revenue_share_percentage": 0,
    "payment_terms": "Monthly in advance via bank transfer"
  },

  "equipment_costs": {
    "signage_units": [
      {
        "description": "55-inch Samsung QM55B Portrait Display",
        "quantity": 3,
        "unit_price": 25000.00,
        "total_price": 75000.00
      }
    ],
    "devices": [
      {
        "description": "Raspberry Pi 4B 4GB Media Player Kit",
        "quantity": 3,
        "unit_price": 3500.00,
        "total_price": 10500.00
      },
      {
        "description": "True 4G Pocket WiFi with 24-month contract",
        "quantity": 2,
        "unit_price": 2990.00,
        "total_price": 5980.00
      }
    ],
    "installation": {
      "description": "Professional installation for 3 units",
      "quantity": 1,
      "unit_price": 45000.00,
      "total_price": 45000.00
    },
    "subtotal": 136480.00,
    "vat": 9553.60,
    "total": 146033.60
  },

  "recurring_costs": {
    "network_monthly": 1198.00,
    "content_management_monthly": 0,
    "maintenance_monthly": 0,
    "total_monthly": 6198.00
  },

  "terms_and_conditions": [
    "Quotation valid for 30 days",
    "Installation to be completed within 2 weeks after approval",
    "12-month warranty on equipment and installation",
    "Content updates provided by client",
    "Network service subject to provider terms"
  ],

  "payment_schedule": [
    {
      "milestone": "Contract signing",
      "percentage": 50,
      "amount": 73016.80,
      "due_date": "Upon contract signing"
    },
    {
      "milestone": "Installation completion",
      "percentage": 50,
      "amount": 73016.80,
      "due_date": "Upon installation completion and acceptance"
    }
  ],

  "notes": "Special discount applied for 3-unit package. Monthly rental includes 2 prominent locations."
}
```

#### C. CONTRACT REQUEST (req-cont-XXX)
```json
"request_data": {
  "parent_request_id": "req-quot-001",
  "contract_number": "CONT-2024-001",
  "contract_type": "Space Rental and Service Agreement",

  "parties": {
    "provider": {
      "company_name": "Your Digital Signage Company Ltd.",
      "registration_number": "0123456789012",
      "address": "123 Business St., Bangkok 10110",
      "representative": "Mr. John Doe",
      "position": "Managing Director"
    },
    "client": {
      "company_name": "The Sukhumvit Residence Juristic Person",
      "registration_number": "9876543210987",
      "address": "Sukhumvit 23, Bangkok, Thailand",
      "representative": "คุณสมชาย สมบูรณ์",
      "position": "Juristic Manager"
    }
  },

  "contract_terms": {
    "start_date": "2024-02-01",
    "end_date": "2026-01-31",
    "period_months": 24,
    "auto_renewal": false,
    "termination_notice_days": 60,

    "rental_terms": {
      "locations": [
        "Ground Floor Lobby - Main Wall",
        "Floor 15 Elevator Hall",
        "Floor 20 Co-working Space"
      ],
      "monthly_fee": 5000.00,
      "payment_due_date": "1st of each month",
      "deposit": 10000.00,
      "late_payment_penalty_percentage": 1.5
    },

    "responsibilities": {
      "provider": [
        "Install and maintain digital signage equipment",
        "Provide technical support during business hours (9am-6pm)",
        "Ensure content compliance with building regulations",
        "Repair or replace faulty equipment within 48 hours"
      ],
      "client": [
        "Provide electrical power supply",
        "Allow access for installation and maintenance",
        "Review and approve content as needed",
        "Notify provider of equipment issues promptly"
      ]
    },

    "content_policy": {
      "approval_required": true,
      "approval_turnaround_hours": 48,
      "prohibited_content": ["Political content", "Adult content", "Competitor advertising"],
      "juristic_content_priority": "Juristic announcements take priority over commercial content"
    },

    "insurance_liability": {
      "equipment_insured_by": "Provider",
      "liability_coverage": 1000000.00,
      "property_damage_liability": "Provider liable for damages caused during installation/maintenance"
    }
  },

  "signatures": {
    "provider_signed": true,
    "provider_signed_by": "John Doe",
    "provider_signed_date": "2024-01-25T10:00:00Z",
    "provider_signature_file": "contracts/cont-2024-001/provider_signature.pdf",

    "client_signed": true,
    "client_signed_by": "สมชาย สมบูรณ์",
    "client_signed_date": "2024-01-26T14:30:00Z",
    "client_signature_file": "contracts/cont-2024-001/client_signature.pdf"
  },

  "contract_documents": [
    "contracts/cont-2024-001/main_contract.pdf",
    "contracts/cont-2024-001/appendix_a_locations.pdf",
    "contracts/cont-2024-001/appendix_b_equipment_specs.pdf"
  ],

  "notes": "Contract negotiated and finalized. Both parties satisfied with terms."
}
```

#### D. INSTALLATION REQUEST (req-inst-XXX)
```json
"request_data": {
  "parent_request_id": "req-cont-001",
  "project_id": "prj001",
  "signage_ids": ["sg001", "sg002", "sg003"],

  "vendor_selection": {
    "vendor_name": "Pro Install Co., Ltd.",
    "vendor_contact": "02-456-7890",
    "vendor_contact_person": "คุณสมศักดิ์ ช่างเทพ",
    "vendor_email": "install@proinstall.co.th",
    "selection_reason": "Recommended by building management, experienced with similar projects"
  },

  "schedule": {
    "preferred_date": "2024-01-25",
    "preferred_time_start": "09:00",
    "preferred_time_end": "17:00",
    "alternative_dates": ["2024-01-26", "2024-01-27"],
    "coordination_required": true,
    "coordinator_name": "คุณสมชาย สมบูรณ์",
    "coordinator_phone": "081-234-5678"
  },

  "installation_details": [
    {
      "signage_id": "sg001",
      "location": "Ground Floor Lobby - Main Wall",
      "installation_type": "Wall mount",
      "power_source": "Existing outlet nearby",
      "network_type": "4G Pocket WiFi",
      "special_requirements": "Install after lobby cleaning (post 2pm)",
      "estimated_duration_hours": 3
    },
    {
      "signage_id": "sg002",
      "location": "Floor 15 Elevator Hall",
      "installation_type": "Wall mount",
      "power_source": "New outlet required",
      "network_type": "4G Pocket WiFi",
      "special_requirements": "Coordinate with residents, minimize noise",
      "estimated_duration_hours": 4
    },
    {
      "signage_id": "sg003",
      "location": "Floor 20 Co-working Space",
      "installation_type": "Floor stand",
      "power_source": "Existing outlet",
      "network_type": "Building WiFi",
      "special_requirements": "Install before co-working space opens (before 8am)",
      "estimated_duration_hours": 2
    }
  ],

  "materials_checklist": [
    "Wall mount brackets (heavy duty) x3",
    "Floor stand (1 unit)",
    "Cable trays and covers",
    "Power cables and outlets",
    "HDMI cables",
    "Network cables (if needed)",
    "Screws, anchors, cable ties"
  ],

  "coordination": {
    "building_management_notified": true,
    "notification_date": "2024-01-18",
    "elevator_reserved": true,
    "parking_arranged": true,
    "access_card_provided": true,
    "safety_briefing_completed": true
  },

  "estimated_cost": 45000.00,
  "actual_cost": null,

  "notes": "Building management very cooperative. All preparations completed. Ready to proceed."
}
```

#### E. PAYMENT REQUEST (req-pay-XXX)
```json
"request_data": {
  "parent_request_id": "req-cont-001",
  "payment_type": "equipment_purchase", // equipment_purchase | installation | rental_deposit | monthly_rental | maintenance
  "payment_purpose": "Purchase signage displays and devices for prj001",

  "vendor_payment_details": {
    "vendor_name": "Digital Display Co., Ltd.",
    "bank_name": "Bangkok Bank",
    "account_number": "123-4-56789-0",
    "account_name": "Digital Display Co., Ltd.",
    "tax_id": "0123456789012"
  },

  "items": [
    {
      "item_id": "sg001",
      "item_type": "signage",
      "description": "55-inch Samsung QM55B Portrait Display",
      "quantity": 1,
      "unit_price": 25000.00,
      "total_price": 25000.00,
      "vat_included": false,

      // Record signage details upon purchase
      "signage_details": {
        "signage_id": "sg001",
        "screen_size_inch": 55,
        "resolution": "1920x1080",
        "orientation": "portrait",
        "brand": "Samsung",
        "model": "QM55B",
        "serial_number": "SN-SG001-123456",
        "warranty_period_months": 24,
        "acquired_date": "2024-01-20"
      }
    },
    {
      "item_id": "dev001",
      "item_type": "device",
      "description": "Raspberry Pi 4B 4GB Kit",
      "quantity": 1,
      "unit_price": 3500.00,
      "total_price": 3500.00,
      "vat_included": false,

      // Record device details upon purchase
      "device_details": {
        "device_id": "dev001",
        "device_type": "raspberry_pi",
        "brand": "Raspberry Pi Foundation",
        "model": "Raspberry Pi 4 Model B",
        "serial_number": "RPI4B-123456789",
        "mac_address": "DC:A6:32:12:34:56",
        "warranty_period_months": 12,
        "acquired_date": "2024-01-20"
      }
    }
  ],

  "cost_summary": {
    "subtotal": 28500.00,
    "vat_percentage": 7,
    "vat_amount": 1995.00,
    "withholding_tax_percentage": 3,
    "withholding_tax_amount": 855.00,
    "total_amount": 29640.00,
    "currency": "THB"
  },

  "payment_schedule": {
    "due_date": "2024-01-25",
    "payment_method": "Bank transfer",
    "payment_terms": "Net 7 days",
    "early_payment_discount_percentage": 0
  },

  "payment_tracking": {
    "payment_status": "paid", // pending | approved | paid | cancelled
    "paid_by": "finance@company.com",
    "paid_date": "2024-01-24T15:30:00Z",
    "payment_reference": "BT-20240124-001",
    "payment_slip": "payments/req-pay-001/payment_slip.pdf"
  },

  "invoice_details": {
    "invoice_number": "INV-2024-001",
    "invoice_date": "2024-01-20",
    "invoice_file": "payments/req-pay-001/invoice.pdf",
    "tax_invoice_received": true,
    "receipt_received": true
  },

  "approval_chain": [
    {
      "approver": "project.manager@company.com",
      "role": "Project Manager",
      "approved_date": "2024-01-22T10:00:00Z",
      "status": "approved"
    },
    {
      "approver": "finance.manager@company.com",
      "role": "Finance Manager",
      "approved_date": "2024-01-23T11:30:00Z",
      "status": "approved"
    },
    {
      "approver": "director@company.com",
      "role": "Director",
      "approved_date": "2024-01-24T09:00:00Z",
      "status": "approved"
    }
  ],

  "asset_registration": {
    "signage_ids_created": ["sg001"],
    "device_ids_created": ["dev001"],
    "recorded_in_project": true,
    "project_cost_updated": true
  },

  "notes": "Payment completed on time. Equipment received and verified. Serial numbers recorded."
}
```

---

## 7. MAINTENANCE.JSON (Optional - Future Enhancement)

```json
{
  "maintenances": [
    {
      "maintenance_id": "maint001",
      "project_id": "prj001",
      "signage_id": "sg001",
      "device_id": "dev001",

      "maintenance_type": "preventive", // preventive | corrective | emergency
      "issue_reported": "Screen flickering intermittently",
      "issue_severity": "medium", // low | medium | high | critical

      "vendor_name": "Tech Support Co., Ltd.",
      "vendor_contact": "02-567-8901",
      "technician_name": "คุณเทคนิค มืออาชีพ",
      "technician_phone": "089-234-5678",

      "schedule": {
        "reported_date": "2024-09-10T10:00:00Z",
        "scheduled_date": "2024-09-15T14:00:00Z",
        "arrival_time": "2024-09-15T14:15:00Z",
        "completion_time": "2024-09-15T15:30:00Z"
      },

      "resolution": {
        "diagnosis": "Loose HDMI cable connection",
        "action_taken": "Replaced HDMI cable, secured connections",
        "parts_replaced": [
          {
            "part": "HDMI Cable 5m Premium",
            "quantity": 1,
            "cost": 500.00
          }
        ],
        "covered_by_warranty": false
      },

      "cost": {
        "labor_cost": 0,
        "parts_cost": 500.00,
        "travel_cost": 0,
        "total_cost": 500.00,
        "currency": "THB"
      },

      "status": "completed", // reported | scheduled | in_progress | completed | cancelled

      "follow_up": {
        "required": false,
        "next_checkup_date": null
      },

      "photos": [
        "maintenance/maint001/before.jpg",
        "maintenance/maint001/during.jpg",
        "maintenance/maint001/after.jpg"
      ],

      "satisfaction": {
        "rating": 5,
        "feedback": "Quick response and professional service"
      },

      "notes": "Issue resolved promptly. Signage back to normal operation.",

      "created_by": "support@company.com",
      "created_date": "2024-09-10T10:15:00Z",
      "updated_by": "technician@techsupport.co.th",
      "updated_date": "2024-09-15T15:45:00Z"
    }
  ]
}
```

---

## 8. VENDOR.JSON (Master Data)

```json
{
  "vendors": [
    {
      "vendor_id": "vend001",
      "vendor_name": "Digital Display Co., Ltd.",
      "vendor_type": ["hardware_supplier"], // hardware_supplier | installation | maintenance | network_provider

      "contact_info": {
        "address": "456 Tech Plaza, Bangkok 10110",
        "phone": "02-123-4567",
        "fax": "02-123-4568",
        "email": "sales@digitaldisplay.co.th",
        "website": "www.digitaldisplay.co.th",
        "line": "@digitaldisplay"
      },

      "primary_contact": {
        "name": "คุณจิตรา ดิจิตอล",
        "position": "Sales Manager",
        "phone": "089-123-4567",
        "email": "jitra@digitaldisplay.co.th"
      },

      "business_details": {
        "registration_number": "0123456789012",
        "tax_id": "0123456789012",
        "vat_registered": true
      },

      "payment_terms": {
        "payment_terms_days": 7,
        "payment_method": "Bank transfer",
        "bank_name": "Bangkok Bank",
        "account_number": "123-4-56789-0",
        "account_name": "Digital Display Co., Ltd.",
        "withholding_tax_applicable": true,
        "withholding_tax_percentage": 3
      },

      "products_services": [
        "Digital signage displays",
        "Commercial displays",
        "Touch screen displays",
        "Video walls"
      ],

      "rating": {
        "overall_rating": 4.5,
        "quality_rating": 5,
        "delivery_rating": 4,
        "service_rating": 4.5,
        "price_rating": 4
      },

      "status": "active", // active | inactive | blacklisted

      "notes": "Reliable supplier. Good after-sales support. Competitive pricing.",

      "created_by": "procurement@company.com",
      "created_date": "2024-01-10T10:00:00Z",
      "updated_by": "procurement@company.com",
      "updated_date": "2024-09-15T16:00:00Z"
    },
    {
      "vendor_id": "vend002",
      "vendor_name": "Pro Install Co., Ltd.",
      "vendor_type": ["installation", "maintenance"],

      "contact_info": {
        "address": "789 Service Road, Bangkok 10120",
        "phone": "02-456-7890",
        "email": "contact@proinstall.co.th",
        "website": "www.proinstall.co.th"
      },

      "primary_contact": {
        "name": "คุณสมศักดิ์ ช่างเทพ",
        "position": "Operations Manager",
        "phone": "089-123-4567",
        "email": "somsak@proinstall.co.th"
      },

      "business_details": {
        "registration_number": "9876543210987",
        "tax_id": "9876543210987",
        "vat_registered": true
      },

      "payment_terms": {
        "payment_terms_days": 30,
        "payment_method": "Bank transfer",
        "bank_name": "Kasikorn Bank",
        "account_number": "987-6-54321-0",
        "account_name": "Pro Install Co., Ltd.",
        "withholding_tax_applicable": true,
        "withholding_tax_percentage": 3
      },

      "products_services": [
        "Digital signage installation",
        "Electrical work",
        "Maintenance services",
        "Technical support"
      ],

      "certifications": [
        "Electrical contractor license",
        "Safety certification"
      ],

      "rating": {
        "overall_rating": 4.7,
        "quality_rating": 5,
        "timeliness_rating": 4.5,
        "professionalism_rating": 5,
        "price_rating": 4.5
      },

      "status": "active",

      "notes": "Excellent workmanship. Professional team. Highly recommended by building managements.",

      "created_by": "operations@company.com",
      "created_date": "2024-01-10T11:00:00Z",
      "updated_by": "operations@company.com",
      "updated_date": "2024-09-20T10:00:00Z"
    }
  ]
}
```

---

## Summary of Data Relationships

```
PROJECT (project.json)
  ├─> contains: signage_ids, device_ids, network_ids, installation_ids
  ├─> references: request_ids (all types)
  └─> tracks: accumulated costs, contract details, deployment status

REQUEST (request.json)
  ├─> Project Request → creates PROJECT record
  ├─> Quotation Request → defines costs and terms
  ├─> Contract Request → formalizes agreement
  ├─> Installation Request → triggers installation
  └─> Payment Request → creates SIGNAGE and DEVICE records

SIGNAGE (signage.json)
  ├─> belongs to: project_id
  ├─> created from: payment_request_id
  ├─> installed by: installation_id
  └─> uses: device_id, network_id

DEVICE (device.json)
  ├─> belongs to: project_id, signage_id
  ├─> created from: payment_request_id
  └─> powers: signage or provides connectivity

NETWORK (network.json)
  ├─> belongs to: project_id, signage_id
  └─> uses: device_id (pocket wifi/router)

INSTALLATION (installation.json)
  ├─> belongs to: project_id
  ├─> installs: signage_id
  └─> created from: installation_request_id

MAINTENANCE (maintenance.json)
  ├─> belongs to: project_id
  └─> services: signage_id, device_id

VENDOR (vendor.json)
  └─> referenced by: all other records for vendor_name
```

---

## Audit Trail Best Practices

All JSON files include these audit fields:
- `created_by`: Email of user who created the record
- `created_date`: ISO 8601 timestamp of creation
- `updated_by`: Email of user who last updated
- `updated_date`: ISO 8601 timestamp of last update

Additional tracking:
- All currency amounts in THB (Thai Baht)
- All dates in ISO 8601 format (YYYY-MM-DD or full timestamp)
- All IDs use prefixes: prj, sg, dev, net, inst, req, maint, vend
- Status fields use lowercase with underscores
- All costs include currency field for future expansion

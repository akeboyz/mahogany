# Data Architecture Strategy

## 🎯 Problem Analysis

Sharing JSON files directly creates:
- ID conflicts between shared/project data
- Schema mismatches
- Build complexity
- Maintenance nightmares

## ✅ Solution: Hierarchical Data Strategy

### **Option 1: Template + Override Pattern**

```
signage/
├── shared/
│   └── templates/                    # Templates only, no actual data
│       ├── restaurant-template.json  # Schema + example
│       ├── shop-template.json
│       ├── unit-template.json
│       └── project-template.json
│
└── projects/
    ├── mahogany/
    │   └── data/                     # All actual data here
    │       ├── restaurants.json     # Complete project data
    │       ├── shops.json
    │       ├── units.json
    │       └── config.json          # Inherits from template
    │
    └── riverside/
        └── data/                     # Independent data
            ├── restaurants.json
            ├── shops.json
            └── config.json
```

**Benefits:**
- ✅ No data duplication
- ✅ No ID conflicts
- ✅ Each project completely independent
- ✅ Templates provide consistency

### **Option 2: Namespace + Merge Strategy**

```json
// signage/shared/data/global-restaurants.json
{
  "global": {
    "rest_global_001": {"name": "McDonald's", "type": "global_chain"},
    "rest_global_002": {"name": "Starbucks", "type": "global_chain"}
  }
}

// signage/projects/mahogany/data/restaurants.json
{
  "project": {
    "rest_mahogany_001": {"name": "Local Cafe", "building": "A"},
    "rest_mahogany_002": {"name": "Thai Kitchen", "floor": 2}
  },
  "inherit": ["rest_global_001"],  // Reference global IDs to include
  "override": {
    "rest_global_001": {"location": "Building B, Floor 1"} // Override global data
  }
}
```

**Build Result:**
```json
// deployments/mahogany/data/restaurants.json (merged)
{
  "rest_global_001": {
    "name": "McDonald's",
    "type": "global_chain",
    "location": "Building B, Floor 1"  // Override applied
  },
  "rest_mahogany_001": {"name": "Local Cafe", "building": "A"},
  "rest_mahogany_002": {"name": "Thai Kitchen", "floor": 2"}
}
```

### **Option 3: API-Style Data References**

```json
// signage/projects/mahogany/data/restaurants.json
[
  {
    "id": "rest001",
    "name": "Pizza Palace Mahogany",
    "extends": "shared://restaurant-templates/italian-restaurant",
    "overrides": {
      "location": "Building A, Floor 2",
      "menu": "project://menus/pizza-palace-menu.json"
    }
  },
  {
    "id": "rest002",
    "name": "Local Cafe",
    "template": "shared://restaurant-templates/cafe",
    "project_only": true
  }
]
```

**Build Process:**
1. Resolve `shared://` references from templates
2. Resolve `project://` references from project data
3. Apply overrides
4. Generate final merged JSON

## 🏆 Recommended Solution: Option 1 (Template + Override)

### **Why This Works Best:**

```
signage/
├── shared/
│   ├── templates/                    # Schema definitions only
│   │   ├── restaurant.schema.json   # JSON schema for validation
│   │   ├── shop.schema.json
│   │   ├── unit.schema.json
│   │   └── examples/                # Example data for reference
│   │       ├── restaurant.example.json
│   │       └── shop.example.json
│   │
│   └── assets/                       # Truly shared assets only
│       ├── icons/
│       ├── placeholder.jpg
│       └── common-styles.css
│
└── projects/
    ├── mahogany/
    │   ├── data/                     # Complete, independent data
    │   │   ├── restaurants.json     # All restaurants for this project
    │   │   ├── shops.json           # All shops for this project
    │   │   ├── units.json           # All units for this project
    │   │   ├── playlists.json       # Project playlists
    │   │   └── project.json         # Project metadata
    │   │
    │   └── assets/                   # Project-specific assets
    │       ├── media/
    │       ├── themes/
    │       └── custom-logo.png
    │
    └── riverside/
        ├── data/                     # Completely separate data
        └── assets/
```

### **Data Flow:**

```bash
# Development
1. Developer uses templates/schemas for structure
2. Creates complete project data independently
3. Validates against schemas

# Build Process
1. Copy project data as-is (no merging needed)
2. Validate against schemas
3. Include only shared assets (icons, placeholders)
4. Deploy complete, self-contained package

# No Conflicts Possible!
- Each project has complete data independence
- No ID conflicts (each project owns its IDs)
- No merge complexity
- No circular dependencies
```

## 🛠️ Implementation Scripts

### **Data Validation**
```javascript
// scripts/validate-project.js
const projectData = loadProject('mahogany');
const schemas = loadSchemas();

validateData(projectData.restaurants, schemas.restaurant);
validateData(projectData.shops, schemas.shop);
// Fails build if validation errors found
```

### **Project Creation**
```javascript
// scripts/create-project.js mahogany
// 1. Copy template structure
// 2. Generate example data from schemas
// 3. Create project-specific config
// 4. Set up build configs
```

### **Build Process**
```javascript
// scripts/build-yodeck.js mahogany
// 1. Load project data (no merging)
// 2. Copy shared assets (icons, styles)
// 3. Generate HTML from templates + project data
// 4. Create ZIP with index.html entry point
```

## 📊 Benefits Summary

| Aspect | Current Issues | New Solution |
|--------|---------------|--------------|
| **Data Conflicts** | Same IDs in multiple files | Each project owns its IDs |
| **Build Complexity** | Complex merging logic | Simple copy operations |
| **Project Independence** | Changes affect all projects | Each project fully independent |
| **Maintenance** | Update shared breaks projects | Templates guide, don't constrain |
| **Validation** | No consistency checking | Schema validation built-in |
| **New Projects** | Manual duplication prone to errors | Automated scaffolding from templates |

## 🚀 Migration Strategy

1. **Create schemas** from existing data patterns
2. **Extract common assets** (truly shared items only)
3. **Consolidate project data** (each project gets complete dataset)
4. **Build validation tools**
5. **Test with one project** (Mahogany)
6. **Migrate remaining projects**
7. **Remove old shared JSON files**

This eliminates sharing conflicts while maintaining development efficiency!
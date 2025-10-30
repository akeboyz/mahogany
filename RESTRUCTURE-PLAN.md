# Project Restructure Plan

## 🎯 Deployment Targets Analysis

### 1. **Yodeck Platform Deployment**
- **Need**: `index.html` as entry point
- **Structure**: Flat ZIP with all assets
- **Data**: Relative paths from root
- **Entry**: `index.html` (from ann/signage.html)

### 2. **Company Website (Next.js)**
- **Need**: Next.js app with API routes
- **Structure**: `app/` directory structure
- **Data**: Firebase integration + local fallbacks
- **Entry**: Next.js routes

### 3. **Per-Project Netlify Signage**
- **Need**: Project-specific signage HTML
- **Structure**: Individual project folders
- **Data**: Project-specific JSON files
- **Entry**: `signage.html` per project

## 🏗️ Proposed New Structure

```
digital-signage/
├── README.md
├── package.json
├── CLAUDE.md
├── .env.local
├── .gitignore
│
├── website/                          # Company website (Next.js)
│   ├── app/
│   ├── lib/
│   ├── public/
│   ├── functions/
│   └── next.config.js
│
├── signage/                          # Digital signage system
│   ├── templates/                    # Reusable HTML templates
│   │   ├── base.html                # Base signage layout
│   │   ├── menu.html                # Menu template
│   │   ├── category.html            # Category template
│   │   ├── product.html             # Unified product template
│   │   └── components/              # Reusable components
│   │       ├── video-player.js
│   │       ├── navigation.js
│   │       └── cart-system.js
│   │
│   ├── shared/                      # Shared assets
│   │   ├── data/                    # Master data files
│   │   │   ├── projects.json
│   │   │   ├── restaurants.json
│   │   │   ├── shops.json
│   │   │   ├── units.json
│   │   │   └── playlists.json
│   │   ├── media/                   # Shared media assets
│   │   ├── styles/                  # CSS templates
│   │   └── scripts/                 # Shared JavaScript
│   │
│   └── projects/                    # Per-project signage
│       ├── mahogany/
│       │   ├── data/                # Project-specific data
│       │   ├── media/               # Project media
│       │   ├── signage.html         # Main signage entry
│       │   ├── config.json          # Project config
│       │   └── netlify.toml         # Netlify deployment config
│       │
│       ├── riverside/
│       ├── downtown/
│       └── [project-template]/      # Template for new projects
│
├── deployments/                     # Build outputs
│   ├── yodeck/                     # Yodeck packages
│   │   ├── mahogany-signage.zip
│   │   ├── riverside-signage.zip
│   │   └── universal-signage.zip
│   │
│   ├── netlify/                    # Netlify packages
│   │   ├── mahogany/
│   │   ├── riverside/
│   │   └── downtown/
│   │
│   └── website/                    # Next.js build output
│       └── .next/
│
├── scripts/                        # Build automation
│   ├── build-yodeck.js           # Yodeck package builder
│   ├── build-netlify.js          # Netlify site builder
│   ├── build-website.js          # Website builder
│   ├── sync-data.js              # Data synchronization
│   └── deploy-all.js             # Universal deployer
│
└── tools/                          # Development tools
    ├── data-validator.js          # JSON schema validation
    ├── project-generator.js       # New project scaffolding
    ├── media-optimizer.js         # Image/video optimization
    └── deployment-tester.js       # Test deployments locally
```

## 🔄 Deployment Workflows

### **Yodeck Deployment**
```bash
npm run build:yodeck mahogany
# Creates: deployments/yodeck/mahogany-signage.zip
# Entry: index.html (from signage/projects/mahogany/signage.html)
# Data: Merged from shared + project-specific
```

### **Netlify Deployment**
```bash
npm run build:netlify mahogany
# Creates: deployments/netlify/mahogany/
# Entry: signage.html
# Data: Project-specific only
# Deploy: Auto-deploy to mahogany.signage.company.com
```

### **Website Deployment**
```bash
npm run build:website
# Creates: deployments/website/.next/
# Entry: Next.js app routes
# Data: Firebase + local fallbacks
```

## 📊 Data Management Strategy

### **Shared Data** (`signage/shared/data/`)
- Master lists: projects, global settings
- Common templates: restaurant types, unit types
- Global media: logos, icons, placeholders

### **Project Data** (`signage/projects/{name}/data/`)
- Project-specific: restaurants, shops, units
- Custom playlists and media
- Branding and theming overrides

### **Build-Time Merging**
- Yodeck: Shared + Project data merged into single JSON files
- Netlify: Project data only, with shared as fallbacks
- Website: Firebase primary, local data as fallbacks

## 🛠️ Build Automation Features

### **Smart Path Resolution**
- Automatic path correction for different deployment contexts
- Asset optimization per deployment type
- Template variable substitution

### **Project Scaffolding**
```bash
npm run create-project riverside
# Creates: signage/projects/riverside/ with template structure
# Updates: Master project list
# Generates: Deployment configs
```

### **Data Validation**
```bash
npm run validate-data mahogany
# Checks: JSON schema compliance
# Validates: Asset references exist
# Reports: Missing or broken links
```

### **Multi-Target Deployment**
```bash
npm run deploy mahogany all
# Builds: Yodeck + Netlify + updates website data
# Tests: All deployments locally first
# Deploys: To respective platforms
```

## 🔧 Migration Benefits

### **Eliminated Redundancy**
- ❌ 15+ yodeck folders → ✅ 1 build system
- ❌ Duplicate HTML files → ✅ Template system
- ❌ Scattered JSON data → ✅ Centralized data management

### **Streamlined Workflows**
- ✅ One command per deployment type
- ✅ Automatic path/data resolution
- ✅ Built-in validation and testing
- ✅ Project template system

### **Clear Separation**
- ✅ Website code separate from signage
- ✅ Per-project isolation for signage
- ✅ Shared resources centralized
- ✅ Build outputs contained

## 📋 Migration Steps

1. **Create new structure** with empty folders
2. **Move Next.js app** to `website/` folder
3. **Extract signage templates** from existing HTML files
4. **Consolidate data files** into shared/project structure
5. **Build automation scripts** for all three targets
6. **Test deployments** with current projects
7. **Migrate projects** one by one to new structure
8. **Clean up** old folders and files

This structure supports:
- ✅ Easy Yodeck deployment (automated ZIP with index.html)
- ✅ Clean company website deployment (isolated Next.js)
- ✅ Per-project Netlify signage (individual builds)
- ✅ Shared code/data management
- ✅ Automated build processes
- ✅ Future project scaling
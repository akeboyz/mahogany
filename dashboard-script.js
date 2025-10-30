class SignageDashboard {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentProject = null;

        this.initElements();
        this.setupEventListeners();
        this.loadProjects();
    }

    initElements() {
        // Stats
        this.totalProjectsEl = document.getElementById('totalProjects');
        this.activeProjectsEl = document.getElementById('activeProjects');
        this.offlineProjectsEl = document.getElementById('offlineProjects');

        // Controls
        this.searchInput = document.getElementById('searchInput');
        this.statusFilter = document.getElementById('statusFilter');
        this.addProjectBtn = document.getElementById('addProjectBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        // Grid
        this.projectsGrid = document.getElementById('projectsGrid');

        // Modals
        this.addProjectModal = document.getElementById('addProjectModal');
        this.projectDetailModal = document.getElementById('projectDetailModal');

        // Modal elements
        this.modalClose = document.getElementById('modalClose');
        this.detailModalClose = document.getElementById('detailModalClose');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.saveProjectBtn = document.getElementById('saveProjectBtn');
        this.projectForm = document.getElementById('projectForm');

        // Detail modal elements
        this.detailProjectName = document.getElementById('detailProjectName');
        this.detailStatus = document.getElementById('detailStatus');
        this.detailType = document.getElementById('detailType');
        this.detailLocation = document.getElementById('detailLocation');
        this.detailCreated = document.getElementById('detailCreated');
        this.detailUpdated = document.getElementById('detailUpdated');
        this.detailDescription = document.getElementById('detailDescription');

        // Action buttons
        this.viewProjectBtn = document.getElementById('viewProjectBtn');
        this.editProjectBtn = document.getElementById('editProjectBtn');
        this.cloneProjectBtn = document.getElementById('cloneProjectBtn');
        this.deleteProjectBtn = document.getElementById('deleteProjectBtn');
    }

    setupEventListeners() {
        // Search and filter
        this.searchInput.addEventListener('input', () => this.filterProjects());
        this.statusFilter.addEventListener('change', () => this.filterProjects());

        // Buttons
        this.addProjectBtn.addEventListener('click', () => this.openAddProjectModal());
        this.refreshBtn.addEventListener('click', () => this.refreshProjects());

        // Modal controls
        this.modalClose.addEventListener('click', () => this.closeAddProjectModal());
        this.detailModalClose.addEventListener('click', () => this.closeDetailModal());
        this.cancelBtn.addEventListener('click', () => this.closeAddProjectModal());
        this.saveProjectBtn.addEventListener('click', () => this.saveProject());

        // Detail modal actions
        this.viewProjectBtn.addEventListener('click', () => this.viewProject());
        this.editProjectBtn.addEventListener('click', () => this.editProject());
        this.cloneProjectBtn.addEventListener('click', () => this.cloneProject());
        this.deleteProjectBtn.addEventListener('click', () => this.deleteProject());

        // Click outside modal to close
        this.addProjectModal.addEventListener('click', (e) => {
            if (e.target === this.addProjectModal) {
                this.closeAddProjectModal();
            }
        });

        this.projectDetailModal.addEventListener('click', (e) => {
            if (e.target === this.projectDetailModal) {
                this.closeDetailModal();
            }
        });

        // Form submission
        this.projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });
    }

    loadProjects() {
        // Load from localStorage or use sample data
        const savedProjects = localStorage.getItem('signageProjects');
        if (savedProjects) {
            this.projects = JSON.parse(savedProjects);
        } else {
            this.projects = this.getSampleProjects();
            this.saveProjectsToStorage();
        }

        this.filteredProjects = [...this.projects];
        this.renderProjects();
        this.updateStats();
    }

    getSampleProjects() {
        return [
            {
                id: 'proj_001',
                name: 'The Residences at Central Plaza',
                path: 'yodeck-signage-package/index.html',
                description: 'Premium condo lobby display featuring amenities showcase, available units, dining options, and exclusive resident services. Interactive 9:16 portrait signage.',
                location: 'Bangkok, Thailand',
                type: 'lobby',
                status: 'active',
                created: '2024-01-15',
                lastUpdated: '2024-01-20'
            },
            {
                id: 'proj_002',
                name: 'Sukhumvit Sky Tower Sales Gallery',
                path: 'sky-tower-sales/index.html',
                description: 'Interactive sales gallery display showcasing available units, floor plans, amenities, and pricing. Features virtual tour integration.',
                location: 'Bangkok, Thailand',
                type: 'sales-gallery',
                status: 'active',
                created: '2024-01-10',
                lastUpdated: '2024-01-18'
            },
            {
                id: 'proj_003',
                name: 'Riverside Gardens Amenities Center',
                path: 'riverside-amenities/index.html',
                description: 'Amenities booking system and information display for pool, gym, function rooms, and resident services.',
                location: 'Bangkok, Thailand',
                type: 'amenities',
                status: 'maintenance',
                created: '2024-01-05',
                lastUpdated: '2024-01-15'
            },
            {
                id: 'proj_004',
                name: 'Metro Heights Elevator Display',
                path: 'metro-elevator/index.html',
                description: 'Compact elevator display showing building announcements, weather, news, and resident services information.',
                location: 'Bangkok, Thailand',
                type: 'elevator',
                status: 'offline',
                created: '2023-12-28',
                lastUpdated: '2024-01-12'
            },
            {
                id: 'proj_005',
                name: 'Ocean View Reception Counter',
                path: 'ocean-reception/index.html',
                description: 'Reception area display for visitor management, resident directory, and concierge services information.',
                location: 'Pattaya, Thailand',
                type: 'reception',
                status: 'active',
                created: '2024-01-08',
                lastUpdated: '2024-01-19'
            },
            {
                id: 'proj_006',
                name: 'Park Avenue Parking Display',
                path: 'park-parking/index.html',
                description: 'Parking area information system showing available spots, visitor parking procedures, and emergency contacts.',
                location: 'Bangkok, Thailand',
                type: 'parking',
                status: 'active',
                created: '2024-01-12',
                lastUpdated: '2024-01-21'
            }
        ];
    }

    renderProjects() {
        this.projectsGrid.innerHTML = '';

        if (this.filteredProjects.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.filteredProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            this.projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectId = project.id;

        const statusClass = project.status;
        const typeColors = {
            lobby: '#3b82f6',
            'sales-gallery': '#10b981',
            amenities: '#f59e0b',
            elevator: '#8b5cf6',
            reception: '#06b6d4',
            parking: '#ef4444'
        };

        card.innerHTML = `
            <div class="project-header">
                <div class="project-status ${statusClass}"></div>
                <h3 class="project-name">${project.name}</h3>
                <div class="project-type" style="background: ${typeColors[project.type] || '#6b7280'}20; color: ${typeColors[project.type] || '#6b7280'}">
                    ${project.type}
                </div>
            </div>
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="meta-item">
                        <span class="meta-label">Location</span>
                        <span class="meta-value">${project.location}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Updated</span>
                        <span class="meta-value">${this.formatDate(project.lastUpdated)}</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="action-btn primary view-project" data-project-id="${project.id}">
                        <span class="btn-icon">👁️</span>
                        <span>View</span>
                    </button>
                    <button class="action-btn secondary project-details" data-project-id="${project.id}">
                        <span class="btn-icon">ℹ️</span>
                        <span>Details</span>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const viewBtn = card.querySelector('.view-project');
        const detailsBtn = card.querySelector('.project-details');

        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openProject(project.id);
        });

        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openProjectDetails(project.id);
        });

        card.addEventListener('click', () => {
            this.openProjectDetails(project.id);
        });

        return card;
    }

    renderEmptyState() {
        this.projectsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📺</div>
                <h3>No Projects Found</h3>
                <p>Create your first digital signage project to get started.</p>
            </div>
        `;
    }

    filterProjects() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const statusFilter = this.statusFilter.value;

        this.filteredProjects = this.projects.filter(project => {
            const matchesSearch = !searchTerm ||
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.location.toLowerCase().includes(searchTerm) ||
                project.type.toLowerCase().includes(searchTerm);

            const matchesStatus = !statusFilter || project.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        this.renderProjects();
        this.updateStats();
    }

    updateStats() {
        const total = this.projects.length;
        const active = this.projects.filter(p => p.status === 'active').length;
        const offline = this.projects.filter(p => p.status === 'offline').length;

        this.totalProjectsEl.textContent = total;
        this.activeProjectsEl.textContent = active;
        this.offlineProjectsEl.textContent = offline;
    }

    openAddProjectModal() {
        this.addProjectModal.classList.add('active');
        document.getElementById('projectName').focus();
    }

    closeAddProjectModal() {
        this.addProjectModal.classList.remove('active');
        this.projectForm.reset();
    }

    openProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;

        // Update detail modal content
        this.detailProjectName.textContent = project.name;
        this.detailStatus.textContent = project.status;
        this.detailType.textContent = project.type;
        this.detailLocation.textContent = project.location;
        this.detailCreated.textContent = this.formatDate(project.created);
        this.detailUpdated.textContent = this.formatDate(project.lastUpdated);
        this.detailDescription.textContent = project.description;

        // Update status styling
        this.detailStatus.className = `detail-value status-${project.status}`;

        this.projectDetailModal.classList.add('active');
    }

    closeDetailModal() {
        this.projectDetailModal.classList.remove('active');
        this.currentProject = null;
    }

    openProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Open project in new tab/window
        const projectUrl = project.path.startsWith('http') ?
            project.path :
            window.location.origin + '/' + project.path;

        window.open(projectUrl, '_blank');
    }

    viewProject() {
        if (this.currentProject) {
            this.openProject(this.currentProject.id);
            this.closeDetailModal();
        }
    }

    editProject() {
        if (!this.currentProject) return;

        // Populate form with current project data
        document.getElementById('projectName').value = this.currentProject.name;
        document.getElementById('projectPath').value = this.currentProject.path;
        document.getElementById('projectDescription').value = this.currentProject.description;
        document.getElementById('projectLocation').value = this.currentProject.location;
        document.getElementById('projectType').value = this.currentProject.type;

        this.closeDetailModal();
        this.openAddProjectModal();
    }

    cloneProject() {
        if (!this.currentProject) return;

        const clonedProject = {
            ...this.currentProject,
            id: 'proj_' + Date.now(),
            name: this.currentProject.name + ' (Copy)',
            created: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        this.projects.push(clonedProject);
        this.saveProjectsToStorage();
        this.filterProjects();
        this.closeDetailModal();

        // Show success message
        this.showNotification('Project cloned successfully!', 'success');
    }

    deleteProject() {
        if (!this.currentProject) return;

        const confirmed = confirm(`Are you sure you want to delete "${this.currentProject.name}"? This action cannot be undone.`);
        if (!confirmed) return;

        this.projects = this.projects.filter(p => p.id !== this.currentProject.id);
        this.saveProjectsToStorage();
        this.filterProjects();
        this.closeDetailModal();

        // Show success message
        this.showNotification('Project deleted successfully!', 'success');
    }

    saveProject() {
        const formData = new FormData(this.projectForm);
        const projectData = {
            name: formData.get('projectName') || document.getElementById('projectName').value,
            path: formData.get('projectPath') || document.getElementById('projectPath').value,
            description: formData.get('projectDescription') || document.getElementById('projectDescription').value,
            location: formData.get('projectLocation') || document.getElementById('projectLocation').value,
            type: formData.get('projectType') || document.getElementById('projectType').value
        };

        // Validation
        if (!projectData.name || !projectData.path) {
            alert('Project name and path are required!');
            return;
        }

        if (this.currentProject) {
            // Update existing project
            const projectIndex = this.projects.findIndex(p => p.id === this.currentProject.id);
            if (projectIndex !== -1) {
                this.projects[projectIndex] = {
                    ...this.projects[projectIndex],
                    ...projectData,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            }
            this.currentProject = null;
        } else {
            // Create new project
            const newProject = {
                id: 'proj_' + Date.now(),
                ...projectData,
                status: 'active',
                created: new Date().toISOString().split('T')[0],
                lastUpdated: new Date().toISOString().split('T')[0]
            };
            this.projects.push(newProject);
        }

        this.saveProjectsToStorage();
        this.filterProjects();
        this.closeAddProjectModal();

        // Show success message
        this.showNotification('Project saved successfully!', 'success');
    }

    refreshProjects() {
        // Add loading state
        this.refreshBtn.innerHTML = '<div class="loading-spinner"></div>';
        this.refreshBtn.disabled = true;

        // Simulate refresh delay
        setTimeout(() => {
            this.loadProjects();
            this.refreshBtn.innerHTML = '<span>🔄</span>';
            this.refreshBtn.disabled = false;
            this.showNotification('Projects refreshed!', 'info');
        }, 1000);
    }

    saveProjectsToStorage() {
        localStorage.setItem('signageProjects', JSON.stringify(this.projects));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: '#fff',
            borderRadius: '10px',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100px)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new SignageDashboard();
});
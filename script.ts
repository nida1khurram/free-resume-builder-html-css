// interface ResumeData {
//     name: string;
//     address: string;
//     email: string;
//     phone: string;
//     summary: string;
//     employment: Array<{
//         title: string;
//         date: string;
//         company: string;
//         description: string;
//     }>;
//     education: Array<{
//         degree: string;
//         school: string;
//         date: string;
//     }>;
//     skills: Array<{
//         name: string;
//         level: number;
//     }>;
//     languages: Array<{
//         name: string;
//         level: number;
//     }>;
//     hobbies: string[];
// }

// class ResumeBuilder {
//     private resume: HTMLElement;
//     private isEditing: boolean = false;

//     constructor() {
//         this.resume = document.getElementById('resume')!;
//         this.initializeEventListeners();
//     }

//     private initializeEventListeners(): void {
//         // Button listeners
//         document.getElementById('generateBtn')?.addEventListener('click', () => this.generateSample());
//         document.getElementById('editBtn')?.addEventListener('click', () => this.toggleEdit());
//         document.getElementById('printBtn')?.addEventListener('click', () => window.print());

//         // Image upload
//         document.getElementById('imageUpload')?.addEventListener('change', (e) => this.handleImageUpload(e));

//         // Add button listeners
//         document.querySelectorAll('.add-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => this.handleAdd(e));
//         });

//         // Delete button listeners
//         this.resume.addEventListener('click', (e) => {
//             if ((e.target as HTMLElement).classList.contains('delete-btn')) {
//                 (e.target as HTMLElement).closest('.item')?.remove();
//             }
//         });
//     }

//     private toggleEdit(): void {
//         this.isEditing = !this.isEditing;
//         this.resume.classList.toggle('editing');
        
//         const editables = this.resume.querySelectorAll('[contenteditable]');
//         editables.forEach(el => {
//             (el as HTMLElement).contentEditable = this.isEditing.toString();
//         });

//         const editBtn = document.getElementById('editBtn');
//         if (editBtn) {
//             editBtn.textContent = this.isEditing ? 'Save' : 'Edit';
//         }
//     }

//     private handleImageUpload(e: Event): void {
//         const input = e.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = document.getElementById('profileImg') as HTMLImageElement;
//                 if (e.target?.result) {
//                     img.src = e.target.result as string;
//                 }
//             };
//             reader.readAsDataURL(input.files[0]);
//         }
//     }

//     private handleAdd(e: Event): void {
//         const section = (e.target as HTMLElement).closest('.section');
//         if (!section) return;

//         const template = this.getTemplate(section.id);
//         if (template) {
//             const items = section.querySelector('.item')?.parentElement;
//             if (items) {
//                 items.insertAdjacentHTML('beforeend', template);
//             }
//         }
//     }

//     private getTemplate(sectionId: string): string {
//         switch (sectionId) {
//             case 'employment':
//                 return `
//                     <div class="item">
//                         <button class="delete-btn">Delete</button>
//                         <h3 contenteditable="${this.isEditing}">New Position</h3>
//                         <div class="date" contenteditable="${this.isEditing}">Date</div>
//                         <p contenteditable="${this.isEditing}">Company</p>
//                         <p contenteditable="${this.isEditing}">Description</p>
//                     </div>
//                 `;
//             case 'education':
//                 return `
//                     <div class="item">
//                         <button class="delete-btn">Delete</button>
//                         <h3 contenteditable="${this.isEditing}">Degree</h3>
//                         <p contenteditable="${this.isEditing}">School</p>
//                         <div class="date" contenteditable="${this.isEditing}">Date</div>
//                     </div>
//                 `;
//             case 'skills':
//             case 'languages':
//                 return `
//                     <div class="progress-container">
//                         <div class="progress-label">
//                             <span contenteditable="${this.isEditing}">New Skill</span>
//                             <span contenteditable="${this.isEditing}">50%</span>
//                         </div>
//                         <div class="progress-bar">
//                             <div class="progress" style="width: 50%"></div>
//                         </div>
//                     </div>
//                 `;
//             default:
//                 return '';
//         }
//     }

//     private generateSample(): void {
//         const sampleData: ResumeData = {
//             name: "John Doe",
//             address: "123 Main St, New York, NY 10001",
//             email: "john@example.com",
//             phone: "555-0123",
//             summary: "Experienced professional with a proven track record...",
//             employment: [{
//                 title: "Senior Developer",
//                 date: "2020 - Present",
//                 company: "Tech Corp",
//                 description: "Leading development team and managing projects"
//             }],
//             education: [{
//                 degree: "Master of Computer Science",
//                 school: "Tech University",
//                 date: "2018 - 2020"
//             }],
//             skills: [{
//                 name: "JavaScript",
//                 level: 90
//             }],
//             languages: [{
//                 name: "English",
//                 level: 100
//             }],
//             hobbies: ["Programming", "Reading", "Travel"]
//         };

//         this.populateResume(sampleData);
//     }

//     private populateResume(data: ResumeData): void {
//         // Populate basic info
//         const elements = {
//             name: this.resume.querySelector('h1'),
//             address: this.resume.querySelector('.contact-info div:nth-child(1)'),
//             email: this.resume.querySelector('.contact-info div:nth-child(2)'),
//             phone: this.resume.querySelector('.contact-info div:nth-child(3)'),
//             summary: this.resume.querySelector('.section:first-child p')
//         };

//         if (elements.name) elements.name.textContent = data.name;
//         if (elements.address) elements.address.textContent = data.address;
//         if (elements.email) elements.email.textContent = data.email;
//         if (elements.phone) elements.phone.textContent = data.phone;
//         if (elements.summary) elements.summary.textContent = data.summary;

//         // Clear and populate sections
//         this.clearSection('employment');
//         this.clearSection('education');
//         this.clearSection('skills');
//         this.clearSection('languages');

//         // Populate new data
//         data.employment.forEach(job => this.addEmployment(job));
//         data.education.forEach(edu => this.addEducation(edu));
//         data.skills.forEach(skill => this.addSkill(skill, 'skills'));
//         data.languages.forEach(lang => this.addSkill(lang, 'languages'));
//     }

//     private clearSection(sectionId: string): void {
//         const section = document.getElementById(sectionId);
//         const items = section?.querySelectorAll('.item, .progress-container');
//         items?.forEach(item => item.remove());
//     }

//     private addEmployment(job: { title: string; date: string; company: string; description: string }): void {
//         const template = `
//             <div class="item">
//                 <button class="delete-btn">Delete</button>
//                 <h3 contenteditable="${this.isEditing}">${job.title}</h3>
//                 <div class="date" contenteditable="${this.isEditing}">${job.date}</div>
//                 <p contenteditable="${this.isEditing}">${job.company}</p>
//                 <p contenteditable="${this.isEditing}">${job.description}</p>
//             </div>
//         `;
//         document.getElementById('employment')?.insertAdjacentHTML('beforeend', template);
//     }

//     private addEducation(edu: { degree: string; school: string; date: string }): void {
//         const template = `
//             <div class="item">
//                 <button class="delete-btn">Delete</button>
//                 <h3 contenteditable="${this.isEditing}">${edu.degree}</h3>
//                 <p contenteditable="${this.isEditing}">${edu.school}</p>
//                 <div class="date" contenteditable="${this.isEditing}">${edu.date}</div>
//             </div>
//         `;
//         document.getElementById('education')?.insertAdjacentHTML('beforeend', template);
//     }

//     private addSkill(skill: { name: string; level: number }, sectionId: string): void {
//         const template = `
//             <div class="progress-container">
//                 <div class="progress-label">
//                     <span contenteditable="${this.isEditing}">${skill.name}</span>
//                     <span contenteditable="${this.isEditing}">${skill.level}%</span>
//                 </div>
//                 <div class="progress-bar">
//                     <div class="progress" style="width: ${skill.level}%"></div>
//                 </div>
//             </div>
//         `;
//         document.getElementById(sectionId)?.insertAdjacentHTML('beforeend', template);
//     }
// }

// // Initialize the resume builder
// new ResumeBuilder();


// skill ad btn 2
// interface ResumeData {
//     name: string;
//     address: string;
//     email: string;
//     phone: string;
//     summary: string;
//     employment: Array<{
//         title: string;
//         date: string;
//         company: string;
//         description: string;
//     }>;
//     education: Array<{
//         degree: string;
//         school: string;
//         date: string;
//     }>;
//     skills: Array<{
//         name: string;
//         level: number;
//     }>;
//     languages: Array<{
//         name: string;
//         level: number;
//     }>;
//     hobbies: string[];
// }

// class ResumeBuilder {
//     private resume: HTMLElement;
//     private isEditing: boolean = false;

//     constructor() {
//         this.resume = document.getElementById('resume')!;
//         this.initializeEventListeners();
//     }

//     private initializeEventListeners(): void {
//         // Button listeners
//         document.getElementById('generateBtn')?.addEventListener('click', () => this.generateSample());
//         document.getElementById('editBtn')?.addEventListener('click', () => this.toggleEdit());
//         document.getElementById('printBtn')?.addEventListener('click', () => window.print());

//         // Image upload
//         document.getElementById('imageUpload')?.addEventListener('change', (e) => this.handleImageUpload(e));

//         // Add button listeners
//         document.querySelectorAll('.add-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => this.handleAdd(e));
//         });

//         // Delete button listeners
//         this.resume.addEventListener('click', (e) => {
//             if ((e.target as HTMLElement).classList.contains('delete-btn')) {
//                 (e.target as HTMLElement).closest('.item, .progress-container')?.remove();
//             }
//         });
//     }

//     private toggleEdit(): void {
//         this.isEditing = !this.isEditing;
//         this.resume.classList.toggle('editing');
        
//         const editables = this.resume.querySelectorAll('[contenteditable]');
//         editables.forEach(el => {
//             (el as HTMLElement).contentEditable = this.isEditing.toString();
//         });

//         const editBtn = document.getElementById('editBtn');
//         if (editBtn) {
//             editBtn.textContent = this.isEditing ? 'Save' : 'Edit';
//         }
//     }

//     private handleImageUpload(e: Event): void {
//         const input = e.target as HTMLInputElement;
//         if (input.files && input.files[0]) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = document.getElementById('profileImg') as HTMLImageElement;
//                 if (e.target?.result) {
//                     img.src = e.target.result as string;
//                 }
//             };
//             reader.readAsDataURL(input.files[0]);
//         }
//     }

//     private handleAdd(e: Event): void {
//         const section = (e.target as HTMLElement).closest('.section');
//         if (!section) return;

//         const template = this.getTemplate(section.id);
//         if (template) {
//             const items = section.querySelector('.item, .progress-container')?.parentElement;
//             if (items) {
//                 items.insertAdjacentHTML('beforeend', template);
//             }
//         }
//     }

//     private getTemplate(sectionId: string): string {
//         switch (sectionId) {
//             case 'employment':
//                 return `
//                     <div class="item">
//                         <button class="delete-btn">Delete</button>
//                         <h3 contenteditable="${this.isEditing}">New Position</h3>
//                         <div class="date" contenteditable="${this.isEditing}">Date</div>
//                         <p contenteditable="${this.isEditing}">Company</p>
//                         <p contenteditable="${this.isEditing}">Description</p>
//                     </div>
//                 `;
//             case 'education':
//                 return `
//                     <div class="item">
//                         <button class="delete-btn">Delete</button>
//                         <h3 contenteditable="${this.isEditing}">Degree</h3>
//                         <p contenteditable="${this.isEditing}">School</p>
//                         <div class="date" contenteditable="${this.isEditing}">Date</div>
//                     </div>
//                 `;
//             case 'skills':
//             case 'languages':
//                 return `
//                     <div class="progress-container">
//                         <button class="delete-btn">Delete</button>
//                         <div class="progress-label">
//                             <span contenteditable="${this.isEditing}">New Skill</span>
//                             <span contenteditable="${this.isEditing}">50%</span>
//                         </div>
//                         <div class="progress-bar">
//                             <div class="progress" style="width: 50%"></div>
//                         </div>
//                     </div>
//                 `;
//             default:
//                 return '';
//         }
//     }

//     private generateSample(): void {
//         const sampleData: ResumeData = {
//             name: "John Doe",
//             address: "123 Main St, New York, NY 10001",
//             email: "john@example.com",
//             phone: "555-0123",
//             summary: "Experienced professional with a proven track record...",
//             employment: [{
//                 title: "Senior Developer",
//                 date: "2020 - Present",
//                 company: "Tech Corp",
//                 description: "Leading development team and managing projects"
//             }],
//             education: [{
//                 degree: "Master of Computer Science",
//                 school: "Tech University",
//                 date: "2018 - 2020"
//             }],
//             skills: [{
//                 name: "JavaScript",
//                 level: 90
//             }],
//             languages: [{
//                 name: "English",
//                 level: 100
//             }],
//             hobbies: ["Programming", "Reading", "Travel"]
//         };

//         this.populateResume(sampleData);
//     }

//     private populateResume(data: ResumeData): void {
//         // Populate basic info
//         const elements = {
//             name: this.resume.querySelector('h1'),
//             address: this.resume.querySelector('.contact-info div:nth-child(1)'),
//             email: this.resume.querySelector('.contact-info div:nth-child(2)'),
//             phone: this.resume.querySelector('.contact-info div:nth-child(3)'),
//             summary: this.resume.querySelector('.section:first-child p')
//         };

//         if (elements.name) elements.name.textContent = data.name;
//         if (elements.address) elements.address.textContent = data.address;
//         if (elements.email) elements.email.textContent = data.email;
//         if (elements.phone) elements.phone.textContent = data.phone;
//         if (elements.summary) elements.summary.textContent = data.summary;

//         // Clear and populate sections
//         this.clearSection('employment');
//         this.clearSection('education');
//         this.clearSection('skills');
//         this.clearSection('languages');

//         // Populate new data
//         data.employment.forEach(job => this.addEmployment(job));
//         data.education.forEach(edu => this.addEducation(edu));
//         data.skills.forEach(skill => this.addSkill(skill, 'skills'));
//         data.languages.forEach(lang => this.addSkill(lang, 'languages'));
//     }

//     private clearSection(sectionId: string): void {
//         const section = document.getElementById(sectionId);
//         const items = section?.querySelectorAll('.item, .progress-container');
//         items?.forEach(item => item.remove());
//     }

//     private addEmployment(job: { title: string; date: string; company: string; description: string }): void {
//         const template = `
//             <div class="item">
//                 <button class="delete-btn">Delete</button>
//                 <h3 contenteditable="${this.isEditing}">${job.title}</h3>
//                 <div class="date" contenteditable="${this.isEditing}">${job.date}</div>
//                 <p contenteditable="${this.isEditing}">${job.company}</p>
//                 <p contenteditable="${this.isEditing}">${job.description}</p>
//             </div>
//         `;
//         document.getElementById('employment')?.insertAdjacentHTML('beforeend', template);
//     }

//     private addEducation(edu: { degree: string; school: string; date: string }): void {
//         const template = `
//             <div class="item">
//                 <button class="delete-btn">Delete</button>
//                 <h3 contenteditable="${this.isEditing}">${edu.degree}</h3>
//                 <p contenteditable="${this.isEditing}">${edu.school}</p>
//                 <div class="date" contenteditable="${this.isEditing}">${edu.date}</div>
//             </div>
//         `;
//         document.getElementById('education')?.insertAdjacentHTML('beforeend', template);
//     }

//     private addSkill(skill: { name: string; level: number }, sectionId: string): void {
//         const template = `
//             <div class="progress-container">
//                 <button class="delete-btn">Delete</button>
//                 <div class="progress-label">
//                     <span contenteditable="${this.isEditing}">${skill.name}</span>
//                     <span contenteditable="${this.isEditing}">${skill.level}%</span>
//                 </div>
//                 <div class="progress-bar">
//                     <div class="progress" style="width: ${skill.level}%"></div>
//                 </div>
//             </div>
//         `;
//         document.getElementById(sectionId)?.insertAdjacentHTML('beforeend', template);
//     }
// }

// // Initialize the resume builder
// new ResumeBuilder();


interface ResumeData {
    name: string;
    address: string;
    email: string;
    phone: string;
    summary: string;
    employment: Array<{
        title: string;
        date: string;
        company: string;
        description: string;
    }>;
    education: Array<{
        degree: string;
        school: string;
        date: string;
    }>;
    skills: Array<{
        name: string;
        level: number;
    }>;
    languages: Array<{
        name: string;
        level: number;
    }>;
    hobbies: string[];
}

class ResumeBuilder {
    private resume: HTMLElement;
    private isEditing: boolean = false;

    constructor() {
        this.resume = document.getElementById('resume')!;
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Button listeners
        document.getElementById('generateBtn')?.addEventListener('click', () => this.generateSample());
        document.getElementById('editBtn')?.addEventListener('click', () => this.toggleEdit());
        document.getElementById('printBtn')?.addEventListener('click', () => window.print());

        // Image upload
        document.getElementById('imageUpload')?.addEventListener('change', (e) => this.handleImageUpload(e));

        // Add button listeners
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAdd(e));
        });

        // Delete button listeners
        this.resume.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).classList.contains('delete-btn')) {
                (e.target as HTMLElement).closest('.item, .progress-container')?.remove();
            }
        });
    }

    private toggleEdit(): void {
        this.isEditing = !this.isEditing;
        this.resume.classList.toggle('editing');
        
        const editables = this.resume.querySelectorAll('[contenteditable]');
        editables.forEach(el => {
            (el as HTMLElement).contentEditable = this.isEditing.toString();
        });

        const editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.textContent = this.isEditing ? 'Save' : 'Edit';
        }
    }

    private handleImageUpload(e: Event): void {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.getElementById('profileImg') as HTMLImageElement;
                if (e.target?.result) {
                    img.src = e.target.result as string;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    private handleAdd(e: Event): void {
        const section = (e.target as HTMLElement).closest('.section');
        if (!section) return;

        const template = this.getTemplate(section.id);
        if (template) {
            const items = section.querySelector('.item, .progress-container')?.parentElement;
            if (items) {
                items.insertAdjacentHTML('beforeend', template);
            }
        }
    }

    private getTemplate(sectionId: string): string {
        switch (sectionId) {
            case 'employment':
                return `
                    <div class="item">
                        <button class="delete-btn">Delete</button>
                        <h3 contenteditable="${this.isEditing}">New Position</h3>
                        <div class="date" contenteditable="${this.isEditing}">Date</div>
                        <p contenteditable="${this.isEditing}">Company</p>
                        <p contenteditable="${this.isEditing}">Description</p>
                    </div>
                `;
            case 'education':
                return `
                    <div class="item">
                        <button class="delete-btn">Delete</button>
                        <h3 contenteditable="${this.isEditing}">Degree</h3>
                        <p contenteditable="${this.isEditing}">School</p>
                        <div class="date" contenteditable="${this.isEditing}">Date</div>
                    </div>
                `;
            case 'skills':
            case 'languages':
                return `
                    <div class="progress-container">
                        <button class="delete-btn">Delete</button>
                        <div class="progress-label">
                            <span contenteditable="${this.isEditing}">New Skill</span>
                            <span contenteditable="${this.isEditing}">50%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 50%"></div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    private generateSample(): void {
        const sampleData: ResumeData = {
            name: "John Doe",
            address: "123 Main St, New York, NY 10001",
            email: "john@example.com",
            phone: "555-0123",
            summary: "Experienced professional with a proven track record...",
            employment: [{
                title: "Senior Developer",
                date: "2020 - Present",
                company: "Tech Corp",
                description: "Leading development team and managing projects"
            }],
            education: [{
                degree: "Master of Computer Science",
                school: "Tech University",
                date: "2018 - 2020"
            }],
            skills: [{
                name: "JavaScript",
                level: 90
            }],
            languages: [{
                name: "English",
                level: 100
            }],
            hobbies: ["Programming", "Reading", "Travel"]
        };

        this.populateResume(sampleData);
    }

    private populateResume(data: ResumeData): void {
        // Populate basic info
        const elements = {
            name: this.resume.querySelector('h1'),
            address: this.resume.querySelector('.contact-info div:nth-child(1)'),
            email: this.resume.querySelector('.contact-info div:nth-child(2)'),
            phone: this.resume.querySelector('.contact-info div:nth-child(3)'),
            summary: this.resume.querySelector('.section:first-child p')
        };

        if (elements.name) elements.name.textContent = data.name;
        if (elements.address) elements.address.textContent = data.address;
        if (elements.email) elements.email.textContent = data.email;
        if (elements.phone) elements.phone.textContent = data.phone;
        if (elements.summary) elements.summary.textContent = data.summary;

        // Clear and populate sections
        this.clearSection('employment');
        this.clearSection('education');
        this.clearSection('skills');
        this.clearSection('languages');

        // Populate new data
        data.employment.forEach(job => this.addEmployment(job));
        data.education.forEach(edu => this.addEducation(edu));
        data.skills.forEach(skill => this.addSkill(skill, 'skills'));
        data.languages.forEach(lang => this.addSkill(lang, 'languages'));
    }

    private clearSection(sectionId: string): void {
        const section = document.getElementById(sectionId);
        const items = section?.querySelectorAll('.item, .progress-container');
        items?.forEach(item => item.remove());
    }

    private addEmployment(job: { title: string; date: string; company: string; description: string }): void {
        const template = `
            <div class="item">
                <button class="delete-btn">Delete</button>
                <h3 contenteditable="${this.isEditing}">${job.title}</h3>
                <div class="date" contenteditable="${this.isEditing}">${job.date}</div>
                <p contenteditable="${this.isEditing}">${job.company}</p>
                <p contenteditable="${this.isEditing}">${job.description}</p>
            </div>
        `;
        document.getElementById('employment')?.insertAdjacentHTML('beforeend', template);
    }

    private addEducation(edu: { degree: string; school: string; date: string }): void {
        const template = `
            <div class="item">
                <button class="delete-btn">Delete</button>
                <h3 contenteditable="${this.isEditing}">${edu.degree}</h3>
                <p contenteditable="${this.isEditing}">${edu.school}</p>
                <div class="date" contenteditable="${this.isEditing}">${edu.date}</div>
            </div>
        `;
        document.getElementById('education')?.insertAdjacentHTML('beforeend', template);
    }

    private addSkill(skill: { name: string; level: number }, sectionId: string): void {
        const template = `
            <div class="progress-container">
                <button class="delete-btn">Delete</button>
                <div class="progress-label">
                    <span contenteditable="${this.isEditing}">${skill.name}</span>
                    <span contenteditable="${this.isEditing}">${skill.level}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
        document.getElementById(sectionId)?.insertAdjacentHTML('beforeend', template);
    }
}

// Initialize the resume builder
new ResumeBuilder();

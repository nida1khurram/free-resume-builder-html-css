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
var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.isEditing = false;
        this.resume = document.getElementById('resume');
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        // Button listeners
        (_a = document.getElementById('generateBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.generateSample(); });
        (_b = document.getElementById('editBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.toggleEdit(); });
        (_c = document.getElementById('printBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return window.print(); });
        // Image upload
        (_d = document.getElementById('imageUpload')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function (e) { return _this.handleImageUpload(e); });
        // Add button listeners
        document.querySelectorAll('.add-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) { return _this.handleAdd(e); });
        });
        // Delete button listeners
        this.resume.addEventListener('click', function (e) {
            var _a;
            if (e.target.classList.contains('delete-btn')) {
                (_a = e.target.closest('.item, .progress-container')) === null || _a === void 0 ? void 0 : _a.remove();
            }
        });
    };
    ResumeBuilder.prototype.toggleEdit = function () {
        var _this = this;
        this.isEditing = !this.isEditing;
        this.resume.classList.toggle('editing');
        var editables = this.resume.querySelectorAll('[contenteditable]');
        editables.forEach(function (el) {
            el.contentEditable = _this.isEditing.toString();
        });
        var editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.textContent = this.isEditing ? 'Save' : 'Edit';
        }
    };
    ResumeBuilder.prototype.handleImageUpload = function (e) {
        var input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var img = document.getElementById('profileImg');
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };
    ResumeBuilder.prototype.handleAdd = function (e) {
        var _a;
        var section = e.target.closest('.section');
        if (!section)
            return;
        var template = this.getTemplate(section.id);
        if (template) {
            var items = (_a = section.querySelector('.item, .progress-container')) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (items) {
                items.insertAdjacentHTML('beforeend', template);
            }
        }
    };
    ResumeBuilder.prototype.getTemplate = function (sectionId) {
        switch (sectionId) {
            case 'employment':
                return "\n                    <div class=\"item\">\n                        <button class=\"delete-btn\">Delete</button>\n                        <h3 contenteditable=\"".concat(this.isEditing, "\">New Position</h3>\n                        <div class=\"date\" contenteditable=\"").concat(this.isEditing, "\">Date</div>\n                        <p contenteditable=\"").concat(this.isEditing, "\">Company</p>\n                        <p contenteditable=\"").concat(this.isEditing, "\">Description</p>\n                    </div>\n                ");
            case 'education':
                return "\n                    <div class=\"item\">\n                        <button class=\"delete-btn\">Delete</button>\n                        <h3 contenteditable=\"".concat(this.isEditing, "\">Degree</h3>\n                        <p contenteditable=\"").concat(this.isEditing, "\">School</p>\n                        <div class=\"date\" contenteditable=\"").concat(this.isEditing, "\">Date</div>\n                    </div>\n                ");
            case 'skills':
            case 'languages':
                return "\n                    <div class=\"progress-container\">\n                        <button class=\"delete-btn\">Delete</button>\n                        <div class=\"progress-label\">\n                            <span contenteditable=\"".concat(this.isEditing, "\">New Skill</span>\n                            <span contenteditable=\"").concat(this.isEditing, "\">50%</span>\n                        </div>\n                        <div class=\"progress-bar\">\n                            <div class=\"progress\" style=\"width: 50%\"></div>\n                        </div>\n                    </div>\n                ");
            default:
                return '';
        }
    };
    ResumeBuilder.prototype.generateSample = function () {
        var sampleData = {
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
    };
    ResumeBuilder.prototype.populateResume = function (data) {
        var _this = this;
        // Populate basic info
        var elements = {
            name: this.resume.querySelector('h1'),
            address: this.resume.querySelector('.contact-info div:nth-child(1)'),
            email: this.resume.querySelector('.contact-info div:nth-child(2)'),
            phone: this.resume.querySelector('.contact-info div:nth-child(3)'),
            summary: this.resume.querySelector('.section:first-child p')
        };
        if (elements.name)
            elements.name.textContent = data.name;
        if (elements.address)
            elements.address.textContent = data.address;
        if (elements.email)
            elements.email.textContent = data.email;
        if (elements.phone)
            elements.phone.textContent = data.phone;
        if (elements.summary)
            elements.summary.textContent = data.summary;
        // Clear and populate sections
        this.clearSection('employment');
        this.clearSection('education');
        this.clearSection('skills');
        this.clearSection('languages');
        // Populate new data
        data.employment.forEach(function (job) { return _this.addEmployment(job); });
        data.education.forEach(function (edu) { return _this.addEducation(edu); });
        data.skills.forEach(function (skill) { return _this.addSkill(skill, 'skills'); });
        data.languages.forEach(function (lang) { return _this.addSkill(lang, 'languages'); });
    };
    ResumeBuilder.prototype.clearSection = function (sectionId) {
        var section = document.getElementById(sectionId);
        var items = section === null || section === void 0 ? void 0 : section.querySelectorAll('.item, .progress-container');
        items === null || items === void 0 ? void 0 : items.forEach(function (item) { return item.remove(); });
    };
    ResumeBuilder.prototype.addEmployment = function (job) {
        var _a;
        var template = "\n            <div class=\"item\">\n                <button class=\"delete-btn\">Delete</button>\n                <h3 contenteditable=\"".concat(this.isEditing, "\">").concat(job.title, "</h3>\n                <div class=\"date\" contenteditable=\"").concat(this.isEditing, "\">").concat(job.date, "</div>\n                <p contenteditable=\"").concat(this.isEditing, "\">").concat(job.company, "</p>\n                <p contenteditable=\"").concat(this.isEditing, "\">").concat(job.description, "</p>\n            </div>\n        ");
        (_a = document.getElementById('employment')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', template);
    };
    ResumeBuilder.prototype.addEducation = function (edu) {
        var _a;
        var template = "\n            <div class=\"item\">\n                <button class=\"delete-btn\">Delete</button>\n                <h3 contenteditable=\"".concat(this.isEditing, "\">").concat(edu.degree, "</h3>\n                <p contenteditable=\"").concat(this.isEditing, "\">").concat(edu.school, "</p>\n                <div class=\"date\" contenteditable=\"").concat(this.isEditing, "\">").concat(edu.date, "</div>\n            </div>\n        ");
        (_a = document.getElementById('education')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', template);
    };
    ResumeBuilder.prototype.addSkill = function (skill, sectionId) {
        var _a;
        var template = "\n            <div class=\"progress-container\">\n                <button class=\"delete-btn\">Delete</button>\n                <div class=\"progress-label\">\n                    <span contenteditable=\"".concat(this.isEditing, "\">").concat(skill.name, "</span>\n                    <span contenteditable=\"").concat(this.isEditing, "\">").concat(skill.level, "%</span>\n                </div>\n                <div class=\"progress-bar\">\n                    <div class=\"progress\" style=\"width: ").concat(skill.level, "%\"></div>\n                </div>\n            </div>\n        ");
        (_a = document.getElementById(sectionId)) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', template);
    };
    return ResumeBuilder;
}());
// Initialize the resume builder
new ResumeBuilder();

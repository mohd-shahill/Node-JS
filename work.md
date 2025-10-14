# **Comprehensive Work Summary (June 2025 – October 2025)**

**Role:** Backend Developer

**Tech Stack:** Node.js, Express.js, MySQL, JWT, AWS S3, Nginx, PWA, Nodemailer, Quill, Dropzone

---

## **1. AKA CORP CMS — Core Backend & Dynamic Modules**

**Website:** akacorptech.com (Admin Dashboard & CMS)

**Objective:** Build a robust backend for content management, dynamic sections, and media uploads.

**Tasks & Achievements:**

- **Header & Footer Management**
    - Implemented dynamic header and footer menus for 13th Idea and AKA CORP CMS.
    - Created REST APIs for **add, edit, delete, and fetch** menu items dynamically.
    - Integrated reusable **image upload system** with Express & Multer for logos.
- **Contact Form Integration**
    - Implemented contact form backend to **store submissions in MySQL**.
    - Displayed submissions dynamically on the **admin dashboard**.
- **Services & Projects Modules**
    - Designed **services_list** and **services_detail_list** tables.
    - Created **project_list** and **project_detail_list** tables with full CRUD operations.
    - Integrated **Quill editors** for content fields and **Dropzone** for media uploads.
- **Career Management Module**
    - Built **career_list** and **career_detail_list** tables.
    - Integrated Quill editor for tech stack descriptions.
    - Developed CRUD APIs for career posts with frontend integration.
- **Blog & Lets Talk Modules**
    - Created **blog_list** and **blog_detail_list** tables.
    - Built APIs for dynamic blog management.
    - Integrated rich content and image upload with Quill & Dropzone.

**Key Skills Developed:** Dynamic CMS architecture, API design, content/media management, frontend-backend integration.

---

## **2. Crush Car Project — Multi-Step Vehicle Backend**

**Website:** crushcar.in

**Objective:** Build backend for vehicle scrap web app with multi-step workflows and media management.

**Tasks & Achievements:**

- **Multi-Step Form Workflow**
    - Vehicle Details → Condition → Owner Info → Document Upload → Media Upload → Pickup Confirmation.
    - Developed REST APIs to handle **multi-step form data**, validation, and storage in MySQL.
- **Document & Media Management**
    - Created dynamic folder structure for storing vehicle-related images/documents.
    - Integrated multiple file type uploads with preview and delete options.
    - Implemented AWS S3 storage (later optimized to local storage for testing).
- **Email Integration**
    - Integrated **Nodemailer with Gmail SMTP** to send form submission notifications.
- **Frontend-Backend Integration**
    - Connected backend APIs to frontend web forms for real-time submissions and display.
    - Ensured validation and error handling at both backend and frontend levels.
- **Deployment**
    - Deployed **crushcar.in** on **Ubuntu VPS**.
    - Configured **Nginx**, SSL certificates for HTTPS, and server optimization.

**Key Skills Developed:** Multi-step workflows, secure file handling, email notifications, deployment on VPS.

---

## **3. LDR Traders Web Apps — Admin & Employee Systems**

**Websites:**

- ldrtraders.com
- ldrtradersrvsf.com
- ldrtraderswebapp.com/admin
- ldrtraderswebapp.com/employee

**Objective:** Build backend and dashboards for employee and admin management, vehicle workflow, and PWA conversion.

**Tasks & Achievements:**

- **Backend Architecture**
    - Designed **scalable Node.js backend** for multiple modules: Employee, Vehicles, Documents, Dashboard Stats.
    - Improved folder structure, naming conventions, and API consistency.
- **Employee Management**
    - Implemented **JWT-based authentication** and role-based access control.
    - CRUD operations for employees with profile photo uploads.
    - Activity tracking: logged employee actions for accountability.
- **Vehicle & Form Management**
    - Integrated multi-step workflows similar to Crush Car project.
    - APIs for adding, editing, viewing, and deleting vehicle records.
    - Document and media management integrated with AWS S3/local storage.
- **Admin Dashboard**
    - APIs for dashboard statistics, recent entries, and user activity.
    - Connected frontend admin dashboard to backend APIs.
- **PWA Conversion**
    - Converted **ldrtraderswebapp.com/employee** and **admin dashboard** into **Progressive Web Apps (PWA)** for offline use and faster load.
- **Deployment**
    - Deployed **ldrtraders.com**, **ldrtradersrvsf.com**, **ldrtraderswebapp.com/admin**, and **ldrtraderswebapp.com/employee** on **Ubuntu VPS**.
    - Configured **Nginx** for web server routing and reverse proxy.
    - Secured all sites with **SSL certificates** for HTTPS.
    - Setup proper server permissions, optimized Node.js apps, and ensured smooth deployment.

**Key Skills Developed:** Role-based access control, dashboard statistics, PWA conversion, deployment, and server setup with HTTPS.

---

## **4. Blog Generator App**

**Objective:** Automate blog creation for multiple websites: Crush Car, AKA CORP, 13th Idea.

**Tasks & Achievements:**

- Built a **Node.js app** to generate blog HTML files dynamically.
- Integrated backend logic for adding, editing, deleting, and listing blog posts.
- Connected blog generator with **existing CMS APIs** for content synchronization.
- Enabled consistent blog management across **multiple websites**.

**Key Skills Developed:** Automation, dynamic content management, multi-website API integration.

---

## **5. Frontend-Backend Integration**

- Integrated backend REST APIs with frontend forms, dashboards, and dynamic content sections for all projects.
- Ensured **real-time updates**, validation, and error handling.
- Worked with **Quill & Dropzone** editors and ensured content & media upload flow is seamless.
- Developed **repeatable form sections** and dynamic sections in CMS.

---

### 6. Deployment & Server Management

**VPS Deployments on Ubuntu OS:**

I deployed multiple full-stack web applications on Ubuntu VPS, ensuring they were production-ready, secure, and optimized for performance. The websites deployed include:

- **crushcar.in**
- **ldrtraders.com**
- **ldrtradersrvsf.com**
- **ldrtraderswebapp.com/admin**
- **ldrtraderswebapp.com/employee**

**Server Setup with Nginx:**

- Configured Nginx server blocks (virtual hosts) for each website to handle both frontend and backend routing efficiently.
- Implemented reverse proxy configurations to route HTTP requests from Nginx to Node.js backend processes.
- Set up process managers (like PM2) to ensure Node.js applications run continuously and restart automatically if they fail.
- Configured Nginx caching, compression, and logging to optimize performance and reduce server load.

**SSL & HTTPS Implementation:**

- Obtained and installed SSL certificates for all deployed websites to ensure secure HTTPS connections.
- Configured automatic SSL renewal processes using Certbot to maintain uninterrupted secure connections.
- Ensured all HTTP traffic is redirected to HTTPS to maintain security compliance.

**Server Optimization & Security:**

- Applied appropriate file and folder permissions to restrict unauthorized access while allowing the applications to run properly.
- Configured firewall rules (UFW) to allow only necessary ports and block unauthorized traffic.
- Optimized server performance, including tuning Node.js memory limits, Nginx worker processes, and database connection pooling.
- Set up monitoring and logs for server health, errors, and access for quick debugging and maintenance.

**Additional Deployment Tasks & QA:**

- Debugged post-deployment issues, including broken routes, CORS issues, and frontend-backend integration bugs.
- Applied QA feedback to ensure all pages, forms, and dashboards functioned correctly in production.
- Implemented secure access controls for admin and employee dashboards to prevent unauthorized access.
- Tested cross-browser functionality, responsive layouts, and offline capabilities for Progressive Web Apps (PWA).
- Integrated backend APIs with deployed frontend applications and verified data consistency.

**Outcome:**

Successfully deployed five production-grade web applications with full backend integration, secure access, HTTPS, optimized performance, and offline PWA support. All deployments are stable, scalable, and maintainable.

---

## **7. Overall Skills & Competencies Developed**

- **Backend & API Design:** Node.js (Express.js & core HTTP), MySQL database design and optimization.
- **Authentication & Security:** JWT, OAuth 2.0, role-based access control.
- **File & Media Management:** Dynamic uploads, AWS S3 integration, previews, deletions.
- **Frontend-Backend Integration:** Dynamic CMS, multi-step forms, Quill & Dropzone integration.
- **PWA Development:** Converted web apps into offline-capable PWAs.
- **Deployment & Server Management:** Ubuntu VPS, Nginx, SSL/HTTPS setup, server optimization.
- **Automation & CMS Tools:** Blog generator app for multiple websites.

---

## **Key Achievements**

- Built **fully dynamic CMS systems** for AKA CORP, 13th Idea, and LDR Traders.
- Developed **multi-step backend workflows** for Crush Car & LDR Traders employee portals.
- Successfully **converted web apps into PWAs**.
- Integrated **backend APIs with frontend dashboards and forms** across all projects.
- Deployed multiple websites on **Ubuntu VPS with Nginx**, HTTPS, and full server configuration.
- Built **reusable backend modules** for content management, media upload, and employee workflows.
- Developed **blog generator app** for multiple website integration.
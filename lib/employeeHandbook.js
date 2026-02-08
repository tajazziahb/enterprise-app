function buildProfile(formData) {
    return {
        documentType: formData.type || "employeeHandbook",
        businessName: formData.businessName || "Your Business",
        size: formData.size || "1-10",
        industry: formData.industry || "professionalServices",
        location: formData.location || "USA",
    }
};

function getIndustryName(industry) {
    const map = {
        "professionalServices": "Professional Services (Consulting, Legal, Accounting)",
        "retail": "Retail",
        "restaurant": "Restaurant / Food Service",
        "healthcare": "Healthcare / Wellness",
        "construction": "Construction / Trades",
        "hospitality": "Hospitality (Hotels, Events, Venues)",
        "entertainment": "Media / Music / Entertainment",
        "childcare": "Childcare / Education",
        "technology": "Technology / SaaS",
    }
    return map[industry] || industry || "General"
}

function generateEmployeeHandbook(profile) {
    const { businessName, size, industry, location } = profile;

    let handbook = ""

    handbook += `EMPLOYEE HANDBOOK\n`;
    handbook += `${businessName}\n\n`;
    handbook += `This Employee Handbook outline the policies, procedures, and expectations for employees of ${businessName}.`;
    handbook += `This handbook applies to all employess and is designed to support a positive and productive workplace.\n\n`;
    handbook += `Last Updated: ${new Date().toLocaleDateString()}\n\n`;

    handbook += `1. Company Overview\n`;
    handbook += `${getIndustryName(industry)} operates in the ${industry} industry and is based in ${location}.`;
    handbook += `Our company currently supports a team of ${size} employees. \n\n`;

    handbook += `2. Employment Status\n`;
    handbook += `Employment with ${businessName} is at-will, meaning either the employee or the company may terminate employment at any time, with or without cause or notice, subject to applicable law.\n\n`;

    handbook += `3. Code of Conduct\n`;
    handbook += `Employees are expected to conduct themselves professionally, respectfully, and ethically at all times. `;
    handbook += `Harassment, discrimination, or inappropriate behavior will not be tolerated.\n\n`;

    handbook += `4. Work Hours and Attendance\n`;
    handbook += `Work schedules may vary depending on role and business needs. Employees are expected to be punctual and communicate absences in advance whenever possible.\n\n`;

    handbook += getIndustryAddOns(profile);

    handbook += `5. Acknowledgment\n`;
    handbook += `This handbook is not a contract of employment. Policies may be updated at any time. Employees are responsible for reviewing and understanding all policies.\n\n`;

    handbook += `Employee Signature: ______________________    Date: ____________\n`;

    return handbook;
}

function getIndustryAddOns(profile) {
    const industryKey = profile.industry;
    const industryLabel = getIndustryName(industryKey);

    const addOnsByIndustry = {
        professionalServices: [
            `• Client Confidentiality: Protect client information and follow confidentiality expectations for client work.`,
            `• Professional Communication: Use clear, respectful communication in meetings, email, and written deliverables.`,
            `• Conflict of Interest: Disclose situations where personal interests may impact professional judgment.`,
        ],

        retail: [
            `• Customer Service: Provide respectful service and escalate customer conflicts to a manager when needed.`,
            `• Cash Handling: Follow register procedures and report discrepancies or suspicious activity immediately.`,
            `• Loss Prevention: Follow store procedures and do not physically confront suspected theft.`,
        ],

        restaurant: [
            `• Food Safety & Hygiene: Follow handwashing, sanitation, and safe food handling procedures at all times.`,
            `• Shift Coverage: Follow scheduling rules for swaps and communicate late arrivals early.`,
            `• Guest Interaction: Maintain professionalism with guests and escalate issues to a manager.`,
        ],

        healthcare: [
            `• Privacy Expectations: Protect sensitive information and only access it when needed for your job.`,
            `• Safety & Cleanliness: Follow sanitation, PPE, and incident reporting procedures as required.`,
            `• Professional Boundaries: Maintain appropriate boundaries with clients/patients and report concerns.`,
        ],

        construction: [
            `• Job Site Safety: Follow PPE requirements, equipment procedures, and site safety rules.`,
            `• Hazard Reporting: Report hazards, near-misses, and injuries immediately.`,
            `• Substance-Free Work: Working under the influence is prohibited for safety reasons.`,
        ],

        hospitality: [
            `• Guest Experience: Maintain professionalism, resolve issues politely, and escalate when needed.`,
            `• Shift Standards: Follow checklists for opening/closing duties and incident reporting.`,
            `• Safety: Follow security procedures and report unsafe situations immediately.`,
        ],

        entertainment: [
            `• Events & Call Times: Be punctual for call times and follow run-of-show instructions.`,
            `• Backstage Conduct: Restricted areas are for authorized staff only; maintain professional behavior.`,
            `• Media & Posting: Do not share unreleased content, client details, or backstage footage without approval.`,
        ],

        childcare: [
            `• Child Safety: Follow supervision rules and safety procedures at all times.`,
            `• Appropriate Conduct: Maintain professional boundaries and report any concerns immediately.`,
            `• Authorized Pickups: Release children only to approved guardians per procedure.`,
        ],

        technology: [
            `• Security: Use strong passwords, protect access, and report suspicious activity immediately.`,
            `• Data Handling: Follow approved processes for storing, sharing, and deleting customer/company data.`,
            `• Acceptable Use: Company systems are for business use unless otherwise approved.`,
        ],

        logistics: [
            `• Driver/Operator Safety: Follow safe operation standards and do not work impaired or fatigued.`,
            `• Inventory & Chain of Custody: Follow procedures for handling, scanning, and reporting discrepancies.`,
            `• Incident Reporting: Report accidents, delays, or damage as soon as possible.`,
        ],
    };

    const lines = addOnsByIndustry[industryKey];
    if (!lines) return "";

    return (
        `\n6. Industry-Specific Guidelines (${industryLabel})\n` +
        lines.map((line) => `${line}\n`).join("") +
        `\n`
    );
}

function generateContractorAgreement(profile) {
    const { businessName, industry, location } = profile;

    const today = new Date().toLocaleDateString("en-US");
    const industryLabel = getIndustryName(industry);

    let agreement = "";

    agreement += `INDEPENDENT CONTRACTOR AGREEMENT\n`;
    agreement += `${businessName}\n`;
    agreement += `Date: ${today}\n\n`;

    agreement += `This Independent Contractor Agreement ("Agreement") is entered into by and between ${businessName} ("Company") and ______________________ ("Contractor"). `;
    agreement += `The Company operates in the ${industryLabel} industry and is based in ${location}.\n\n`;

    agreement += `1. Services\n`;
    agreement += `Contractor will provide the following services: ________________________________________________.\n\n`;

    agreement += `2. Term\n`;
    agreement += `This Agreement begins on ____________ and continues until ____________, unless terminated earlier under this Agreement.\n\n`;

    agreement += `3. Compensation\n`;
    agreement += `Company will pay Contractor $__________ per ____________ (hour/project/retainer) on a ____________ schedule, upon invoice or as otherwise agreed.\n\n`;

    agreement += `4. Independent Contractor Relationship\n`;
    agreement += `Contractor is an independent contractor and not an employee of the Company. Contractor is responsible for all taxes, insurance, permits, and licenses related to the services.\n\n`;

    agreement += `5. Confidentiality\n`;
    agreement += `Contractor agrees to keep confidential any non-public Company or client information learned while performing services and will not disclose such information without authorization.\n\n`;

    agreement += `6. Ownership of Work Product\n`;
    agreement += `Unless otherwise agreed in writing, all deliverables and work product created under this Agreement will be owned by the Company upon full payment.\n\n`;

    agreement += `7. Termination\n`;
    agreement += `Either party may terminate this Agreement with ______ days written notice. Company will pay for services performed up to the termination date.\n\n`;

    agreement += `8. Governing Law\n`;
    agreement += `This Agreement is governed by the laws applicable in ${location}, without regard to conflict of law rules.\n\n`;

    agreement += `Company Representative: ______________________    Date: ____________\n`;
    agreement += `Contractor: ________________________________    Date: ____________\n`;

    return agreement;
}

module.exports = {
    buildProfile,
    generateEmployeeHandbook,
    generateContractorAgreement,   
};
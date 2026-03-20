export const SITE_NAME = "Enkisys";
export const SITE_URL = "https://enkisys.agency";
export const CONTACT_EMAIL = "ricardo@enkisys.net";

export const CONTACT_SUBJECTS = {
  workflowReview: "Workflow Review",
  revisionDeFlujo: "Revision de flujo",
  computerVision: "Workflow Review - Computer Vision",
  documentIntelligence: "Workflow Review - Document Intelligence",
  customModeling: "Workflow Review - Custom Modeling",
  predictiveAnalytics: "Workflow Review - Predictive Analytics",
} as const;

export function createMailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

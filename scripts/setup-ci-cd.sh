#!/bin/bash

# Setup CI/CD for Enkisys - GitHub Actions to Cloud Run
# This script configures Workload Identity Federation for secure GitHub Actions deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="enkisys-agency"
REGION="us-central1"
SERVICE_NAME="ml-agency"
SERVICE_ACCOUNT_NAME="github-actions-deployer"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
WORKLOAD_IDENTITY_POOL="github-actions-pool"
WORKLOAD_IDENTITY_PROVIDER="github-provider"
GITHUB_REPO="RicardoReyes-DS/ml-agency"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Enkisys CI/CD Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ gcloud CLI found${NC}"
echo ""

# Set project
echo -e "${YELLOW}📋 Setting project to ${PROJECT_ID}...${NC}"
gcloud config set project ${PROJECT_ID}
echo ""

# Enable required APIs
echo -e "${YELLOW}🔧 Enabling required APIs...${NC}"
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com
echo -e "${GREEN}✓ APIs enabled${NC}"
echo ""

# Create Service Account
echo -e "${YELLOW}👤 Creating Service Account...${NC}"
if gcloud iam service-accounts describe ${SERVICE_ACCOUNT_EMAIL} &> /dev/null; then
    echo -e "${BLUE}ℹ Service Account already exists${NC}"
else
    gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} \
      --display-name="GitHub Actions Deployer" \
      --description="Service Account for deploying to Cloud Run from GitHub Actions"
    echo -e "${GREEN}✓ Service Account created${NC}"
fi
echo ""

# Grant necessary roles to Service Account
echo -e "${YELLOW}🔐 Granting IAM roles to Service Account...${NC}"
ROLES=(
    "roles/run.admin"
    "roles/iam.serviceAccountUser"
    "roles/artifactregistry.writer"
    "roles/storage.admin"
)

for ROLE in "${ROLES[@]}"; do
    echo -e "  Granting ${ROLE}..."
    gcloud projects add-iam-policy-binding ${PROJECT_ID} \
      --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
      --role="${ROLE}" \
      --condition=None \
      --quiet > /dev/null
done
echo -e "${GREEN}✓ IAM roles granted${NC}"
echo ""

# Create Workload Identity Pool
echo -e "${YELLOW}🌐 Creating Workload Identity Pool...${NC}"
if gcloud iam workload-identity-pools describe ${WORKLOAD_IDENTITY_POOL} \
    --location="global" &> /dev/null; then
    echo -e "${BLUE}ℹ Workload Identity Pool already exists${NC}"
else
    gcloud iam workload-identity-pools create ${WORKLOAD_IDENTITY_POOL} \
      --location="global" \
      --display-name="GitHub Actions Pool" \
      --description="Pool for GitHub Actions workflows"
    echo -e "${GREEN}✓ Workload Identity Pool created${NC}"
fi
echo ""

# Create Workload Identity Provider
echo -e "${YELLOW}🔗 Creating Workload Identity Provider...${NC}"
if gcloud iam workload-identity-pools providers describe ${WORKLOAD_IDENTITY_PROVIDER} \
    --workload-identity-pool=${WORKLOAD_IDENTITY_POOL} \
    --location="global" &> /dev/null; then
    echo -e "${BLUE}ℹ Workload Identity Provider already exists${NC}"
else
    gcloud iam workload-identity-pools providers create-oidc ${WORKLOAD_IDENTITY_PROVIDER} \
      --workload-identity-pool=${WORKLOAD_IDENTITY_POOL} \
      --location="global" \
      --issuer-uri="https://token.actions.githubusercontent.com" \
      --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
      --attribute-condition="assertion.repository_owner == '${GITHUB_REPO%%/*}'"
    echo -e "${GREEN}✓ Workload Identity Provider created${NC}"
fi
echo ""

# Bind Service Account to Workload Identity
echo -e "${YELLOW}🔗 Binding Service Account to Workload Identity...${NC}"
gcloud iam service-accounts add-iam-policy-binding ${SERVICE_ACCOUNT_EMAIL} \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')/locations/global/workloadIdentityPools/${WORKLOAD_IDENTITY_POOL}/attribute.repository/${GITHUB_REPO}" \
  --quiet > /dev/null
echo -e "${GREEN}✓ Binding created${NC}"
echo ""

# Get values for GitHub Secrets
PROJECT_NUMBER=$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')
WIF_PROVIDER="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WORKLOAD_IDENTITY_POOL}/providers/${WORKLOAD_IDENTITY_PROVIDER}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo ""
echo -e "${BLUE}1. Go to your GitHub repository settings:${NC}"
echo -e "   https://github.com/${GITHUB_REPO}/settings/secrets/actions"
echo ""
echo -e "${BLUE}2. Add the following secrets:${NC}"
echo ""
echo -e "${YELLOW}   Secret Name:${NC} WIF_PROVIDER"
echo -e "${YELLOW}   Secret Value:${NC}"
echo -e "${GREEN}   ${WIF_PROVIDER}${NC}"
echo ""
echo -e "${YELLOW}   Secret Name:${NC} WIF_SERVICE_ACCOUNT"
echo -e "${YELLOW}   Secret Value:${NC}"
echo -e "${GREEN}   ${SERVICE_ACCOUNT_EMAIL}${NC}"
echo ""
echo -e "${BLUE}3. Push your code to trigger the workflow:${NC}"
echo -e "   git push origin main"
echo ""
echo -e "${GREEN}Done! Your CI/CD pipeline is ready! 🚀${NC}"
echo ""

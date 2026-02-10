# 🚀 CI/CD Setup Guide - ML Agency

Esta guía te ayudará a configurar el pipeline de CI/CD completo para deployment automático a Cloud Run usando GitHub Actions.

## 📋 Tabla de Contenidos

- [Prerequisitos](#prerequisitos)
- [Arquitectura](#arquitectura)
- [Configuración Rápida](#configuración-rápida)
- [Configuración Manual](#configuración-manual)
- [Verificación](#verificación)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisitos

Antes de empezar, asegúrate de tener:

- ✅ Cuenta de Google Cloud con permisos de Owner o Editor en el proyecto `enkisys-agency`
- ✅ gcloud CLI instalado y autenticado
- ✅ Acceso de Admin al repositorio GitHub `RicardoReyes-DS/ml-agency`

---

## 🏗️ Arquitectura

El pipeline funciona así:

```
┌─────────────┐      ┌──────────────────┐      ┌─────────────┐
│   GitHub    │─────▶│ GitHub Actions   │─────▶│  Cloud Run  │
│  (git push) │      │ (Build & Deploy) │      │ (Production)│
└─────────────┘      └──────────────────┘      └─────────────┘
                              │
                              │ autenticación segura
                              ▼
                     ┌─────────────────┐
                     │ Workload Identity│
                     │   Federation     │
                     └─────────────────┘
```

**Ventajas:**
- ✅ **Sin Service Account Keys** (más seguro)
- ✅ **Deploy automático** en cada push a `main`
- ✅ **Build optimizado** con Docker multi-stage
- ✅ **Zero downtime** deployment

---

## 🚀 Configuración Rápida (RECOMENDADO)

### Opción 1: Script Automatizado

Ejecuta este script desde la raíz del proyecto:

```bash
./scripts/setup-ci-cd.sh
```

El script hará:
1. ✅ Habilitar APIs necesarias en GCP
2. ✅ Crear Service Account con permisos adecuados
3. ✅ Configurar Workload Identity Federation
4. ✅ Mostrar los valores de los secrets para GitHub

### Paso 2: Configurar GitHub Secrets

El script te dará dos valores. Ve a:

**GitHub Repository → Settings → Secrets and variables → Actions → New repository secret**

URL directa: `https://github.com/RicardoReyes-DS/ml-agency/settings/secrets/actions`

Agrega estos dos secrets:

| Secret Name | Description |
|-------------|-------------|
| `WIF_PROVIDER` | Workload Identity Provider ID (lo da el script) |
| `WIF_SERVICE_ACCOUNT` | Service Account email (lo da el script) |

### Paso 3: Push y Deploy! 🎉

```bash
git add .
git commit -m "feat: Add CI/CD pipeline"
git push origin main
```

¡Listo! Ve a la pestaña "Actions" en GitHub para ver el deployment en tiempo real.

---

## 🔧 Configuración Manual

Si prefieres hacerlo paso a paso manualmente:

### 1. Habilitar APIs

```bash
gcloud services enable \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  --project=enkisys-agency
```

### 2. Crear Service Account

```bash
gcloud iam service-accounts create github-actions-deployer \
  --display-name="GitHub Actions Deployer" \
  --project=enkisys-agency
```

### 3. Asignar Roles

```bash
PROJECT_ID="enkisys-agency"
SA_EMAIL="github-actions-deployer@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.admin"
```

### 4. Crear Workload Identity Pool

```bash
gcloud iam workload-identity-pools create github-actions-pool \
  --location="global" \
  --display-name="GitHub Actions Pool" \
  --project=enkisys-agency
```

### 5. Crear Workload Identity Provider

```bash
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --workload-identity-pool=github-actions-pool \
  --location="global" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner == 'RicardoReyes-DS'" \
  --project=enkisys-agency
```

### 6. Bind Service Account

```bash
PROJECT_NUMBER=$(gcloud projects describe enkisys-agency --format='value(projectNumber)')

gcloud iam service-accounts add-iam-policy-binding \
  github-actions-deployer@enkisys-agency.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/RicardoReyes-DS/ml-agency" \
  --project=enkisys-agency
```

### 7. Obtener valores para GitHub Secrets

```bash
PROJECT_NUMBER=$(gcloud projects describe enkisys-agency --format='value(projectNumber)')

echo "WIF_PROVIDER:"
echo "projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-actions-pool/providers/github-provider"

echo ""
echo "WIF_SERVICE_ACCOUNT:"
echo "github-actions-deployer@enkisys-agency.iam.gserviceaccount.com"
```

Copia estos valores y agrégalos como secrets en GitHub.

---

## ✅ Verificación

### 1. Verificar que el workflow existe

```bash
ls -la .github/workflows/deploy.yml
```

### 2. Hacer un push de prueba

```bash
git add .
git commit -m "test: Trigger CI/CD pipeline"
git push origin main
```

### 3. Ver el deployment en GitHub

Ve a: `https://github.com/RicardoReyes-DS/ml-agency/actions`

Deberías ver un workflow ejecutándose.

### 4. Verificar el servicio deployed

Una vez completado el workflow:

```bash
gcloud run services describe ml-agency \
  --region=us-central1 \
  --project=enkisys-agency \
  --format='value(status.url)'
```

Abre la URL en tu navegador para verificar que todo funciona.

---

## 🐛 Troubleshooting

### Error: "Permission denied"

**Causa:** El Service Account no tiene los permisos necesarios.

**Solución:** Ejecuta de nuevo el script o verifica que los roles estén asignados:

```bash
gcloud projects get-iam-policy enkisys-agency \
  --flatten="bindings[].members" \
  --format="table(bindings.role)" \
  --filter="bindings.members:github-actions-deployer@enkisys-agency.iam.gserviceaccount.com"
```

### Error: "Workload Identity Pool not found"

**Causa:** El Workload Identity Pool no fue creado correctamente.

**Solución:**

```bash
gcloud iam workload-identity-pools list --location=global --project=enkisys-agency
```

Si no existe, créalo de nuevo con el script.

### El workflow no se ejecuta automáticamente

**Causa:** El archivo `.github/workflows/deploy.yml` no está en la rama `main`.

**Solución:**

```bash
git checkout main
git pull origin main
ls -la .github/workflows/
```

Asegúrate de que el archivo existe y está committed en `main`.

### El build falla con errores de Docker

**Causa:** Problemas con las dependencias o el Dockerfile.

**Solución:** Prueba el build localmente:

```bash
docker build -t test-ml-agency .
docker run -p 8080:8080 test-ml-agency
```

---

## 📚 Referencias

- [GitHub Actions - Google Cloud Auth](https://github.com/google-github-actions/auth)
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)

---

## 🎉 ¡Todo listo!

Ahora cada vez que hagas push a `main`, tu aplicación se deployará automáticamente a Cloud Run.

**Happy deploying! 🚀**

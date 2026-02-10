# 🔐 GitHub Secrets Configuration

Para que el CI/CD funcione, necesitas configurar estos secrets en GitHub.

## 📍 Dónde configurarlos

Ve a: **Settings → Secrets and variables → Actions → New repository secret**

URL directa: https://github.com/RicardoReyes-DS/ml-agency/settings/secrets/actions

---

## 🔑 Secrets Requeridos

Después de ejecutar `./scripts/setup-ci-cd.sh`, el script te dará estos valores:

### 1. WIF_PROVIDER

**Nombre del secret:** `WIF_PROVIDER`

**Valor:** El script te dará algo como:
```
projects/123456789/locations/global/workloadIdentityPools/github-actions-pool/providers/github-provider
```

### 2. WIF_SERVICE_ACCOUNT

**Nombre del secret:** `WIF_SERVICE_ACCOUNT`

**Valor:** El script te dará:
```
github-actions-deployer@enkisys-agency.iam.gserviceaccount.com
```

---

## ✅ Verificación

Una vez configurados, puedes verificar que existen en:

https://github.com/RicardoReyes-DS/ml-agency/settings/secrets/actions

Deberías ver:
- ✅ WIF_PROVIDER
- ✅ WIF_SERVICE_ACCOUNT

---

## 🚀 Siguiente Paso

Una vez configurados los secrets, haz push a `main`:

```bash
git push origin main
```

Y ve el deployment en: https://github.com/RicardoReyes-DS/ml-agency/actions

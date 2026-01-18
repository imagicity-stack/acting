# Lumina Casting UI

Premium UI for a casting marketplace with director + actor modes.

## Getting started

```bash
npm install
npm run dev
```

## Routes

### Public
- `/` – Landing page
- `/auth/login` – Login UI
- `/auth/signup` – Signup UI (role selection)

### Director mode
- `/director/dashboard`
- `/director/roles`
- `/director/roles/new`
- `/director/applications`

### Actor mode
- `/actor/dashboard`
- `/actor/roles`
- `/actor/roles/[id]`
- `/actor/profile`
- `/actor/notifications`

## Notes
- Uses mock data only; store persists to localStorage.
- Zustand is used for lightweight state that can later swap to API calls.
- Forms are validated with Zod + React Hook Form.

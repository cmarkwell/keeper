# Keeper

An offline password manager Chrome extension

### Installation

1. Install Keeper's dependencies using your preferred node package manager:

```bash
npm install
```

2. Build Keeper:

```bash
npm run build
```

3. Load the built directory (dist) into Chrome as an unpacked extension

### Usage

Begin by defining an encryption key

### Todo

- Convert to TypeScript
- Add password generator
- Add branding
- Explore multiple accounts / key verification
    - If decryption fails, show that the account was encrypted with another key
- Add ability to export and import secrets
    - If none can be decrypred, shout about it
- Remove list skeleton thing
    - Log in should load while loading secrets
    - Encrypt should load while reloading secrets
- Add better login flow explanation
- Add toasts maybe to explain import failures

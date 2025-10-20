# Keeper

An offline password manager Chrome extension

## Installation

1. Install Keeper's dependencies using your preferred node package manager:

```bash
npm install
```

2. Build Keeper:

```bash
npm run build
```

3. Load the build directory (dist) into Chrome as an unpacked extension

## Usage

1. Sign in to Keeper with a master password. **Remember this password, all accounts created during the session will be encrypted with it and saved to local storage.**
2. Add new accounts with usernames, emails, and passwords
3. Search for and view the details of created accounts
4. Export and import encrypted account information

## Todo

- Convert to TypeScript
- Add better login flow explanation to app
- Add password generator
- Explore multiple accounts / key verification
    - If decryption fails, show that there are accounts encrypted with another key

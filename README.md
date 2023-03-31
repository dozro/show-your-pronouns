# pronouns.page.js



## To clone this repository

```bash
# go to the directory you want to clone this repository to
# the repository will be cloned to pronouns.page.js
# you might get asked for credentials
git clone https://git.thejulian.uk/julian/pronouns.page.js.git
```

### tea cli

if you use [tea cli](https://gitea.com/gitea/tea) you can clone this repository with it

tea can be installed with 

```bash
# nix (third party maintained)
nix-env -i tea
```
```bash
# brew (gitea maintained)
brew tap gitea/tap https://gitea.com/gitea/homebrew-gitea
brew install tea
```
```bash
# alpine linux (third party maintained)
apk add tea
```
```bash
# arch linux (third party maintained)
pacman -S gitea-tea-git
```

## privacy notice

please note that like any git repository, the repository will not be stored encrypted and is not a good place to store
secrets or personal information.
There are plugins that will encrypt your git repository:

- [git-crypt](https://www.agwa.name/projects/git-crypt/): enables transparent encryption and decryption of files in a git repository. Files **which you choose** to protect are encrypted when committed, and decrypted when checked out. git-crypt lets you **freely share a repository containing a mix of public and private content**. git-crypt gracefully degrades, so developers without the secret key can still clone and commit to a repository with encrypted files. This lets you store your secret material (such as keys or passwords) in the same repository as your code, without requiring you to lock down your entire repository.
- [git-remote-gcrypt](https://spwhitton.name/tech/code/git-remote-gcrypt/): encrypts the whole repository, note that this will make any web interface functions pretty much useless

## This file

This file is safe to be replaced, deleted, or modified.

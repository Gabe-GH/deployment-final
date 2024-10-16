# Steps to walk through project

1. run `npm i` to install project dependencies

2. if you take a look at your environment secrets, they are all encrypted. this is how they are able to securely be pushed to github without worry.
    - to decrypt and re-encrypt these secrets you will need the private secret key that is provided in the frontera discord. remind me to post it because i will forget. 💀
    - you can run `npm run encrypt` or `npm run decrypt`, these scripts have been provided and you can refer to them in your `package.json`
    - IMPORTANT: always make sure to encrypt your secrets before pushing your code back to github if you have decrypted them.

3. run the app using `npm run dev` and look around, see how it works
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To Do
- [x] Create Axios instance to connect to Auth service
- [ ] Create service gateway for microservice (BE)
- [x] Integrate Login auth
- [x] Construct Register UI
- [ ] Create custom router for defining destination and payload
- [ ] Custom router to automatically redirect between public, main, and auth
- [x] Create global modal to display error
- [ ] Integrate [quicktype](https://blog.postman.com/turn-your-postman-collection-into-models-with-quicktype-io/)
- [ ] Create global package for microservice (BE)
- [ ] JWT with [RSA encryption](https://connect2id.com/products/nimbus-jose-jwt/examples/jwt-with-rsa-encryption) (FE + BE)
- [ ] OAuth2 with [nextAuthJS](https://next-auth.js.org/configuration/providers/oauth) (FE + BE) *After all outstanding finished

## When to use Interface vs Type
https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c

## Style conventions
I find that we cannot use a module className to another component outside our module when those component having it's own style module.
So to overcome this issue, I came up with some idea:
- A component should not having it's own style module, instead we have to using css-in-js style, example:
```typescript
type ButtonType = "link" | "regular";
type style = {
  [key in ButtonType]: CSSProperties;
};
const styles: style = {
  link: {},
  regular: {
    padding: "0.3rem",
  },
};
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost', // or '0.0.0.0' to allow LAN access
//     port: 5174,        // change to any port you like
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/PC-Eval/',  // <-- IMPORTANT: repo name goes here
  server: {
    host: 'localhost',
    port: 5174,
  }
})

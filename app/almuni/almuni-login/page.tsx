import { redirect } from 'next/navigation';

// /login and /almuni/almuni-login were merged into one component (see
// app/login/page.tsx) so the blue panel could use a real CSS transition
// between the two sign-in modes instead of a cross-page animation.
// This route stays in place purely so existing links/bookmarks still land
// on the right experience.
export default function AlmuniLoginRedirect() {
  redirect('/login?as=alumni');
}
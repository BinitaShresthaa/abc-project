import { redirect } from 'next/navigation';

// The registration wizard was merged into app/login/page.tsx (alongside
// staff and alumni sign-in) so the blue panel could keep sliding via a real
// CSS transition all the way from staff login through to registration,
// instead of stopping at a page boundary. This route stays in place purely
// so existing links/bookmarks still land on the right experience.
export default function AlmuniRegisterRedirect() {
  redirect('/login?as=alumni-register');
}
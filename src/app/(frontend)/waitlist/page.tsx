// This route is deprecated. Users should go to /wishlist instead.
// This file exists only to redirect.

import { redirect } from 'next/navigation'

export default function WaitlistRedirect() {
    redirect('/wishlist')
}

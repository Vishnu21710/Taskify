import { clerkMiddleware, authMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { url } from "inspector";
import { NextResponse } from "next/server";

// export default authMiddleware({
//   publicRoutes: ['/']
// });

const isProtected = createRouteMatcher(['/protected(.*)', '/organization(.*)', '/select-org', '/board(.*)', '/api/cards(.*)'])

export default clerkMiddleware((auth, req)=>{
  if(auth().userId && !isProtected(req)){
    let path = '/select-org'
    if(auth().orgId){
      path = `/organization/${auth().orgId}`
    }
    const orgSelection = new URL(path, req.url)
    // console.log(orgSelection, 'orgselect');
    
    return NextResponse.redirect(orgSelection)
  }

  if(!auth().userId && isProtected(req)){
    console.log('Not auth');
    
    return auth().redirectToSignIn({
      returnBackUrl: req.url
    })
  }

  if(auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org"){
    console.log('last check');
    
    const orgSelection = new URL('/select-org', req.url)
    return NextResponse.redirect(orgSelection)
  }

  
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};

// import { clerkMiddleware, authMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtected = createRouteMatcher(['/protected(.*)', '/organization(.*)'])

// export default clerkMiddleware((auth, req) => {
//   const userId = auth().userId;
//   const orgId = auth().orgId;
//   const isAuth = Boolean(userId);
//   const isOrg = Boolean(orgId);
//   const pathname = req.nextUrl.pathname;

//   // Redirect authenticated users without an organization to /select-org
//   if (isAuth && !isOrg && pathname !== '/select-org') {
//     return NextResponse.redirect(new URL('/select-org', req.url));
//   }

//   // Redirect authenticated users with an organization to their organization page from non-protected routes
//   if (isAuth && isOrg && !isProtected(req)) {
//     return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
//   }

//   // Redirect unauthenticated users trying to access protected routes to the sign-in page
//   if (!isAuth && isProtected(req)) {
//     return auth().redirectToSignIn({
//       returnBackUrl: req.url
//     });
//   }

//   // Allow other requests to proceed
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
